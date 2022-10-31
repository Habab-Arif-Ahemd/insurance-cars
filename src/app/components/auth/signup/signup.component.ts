import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator, PasswordStrengthValidator } from 'src/app/helpers/validators/ConfirmPasswordValidator';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { UserRegistration } from 'src/app/payload/requests/auth/UserRegistration';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { RegistrationResponse } from 'src/app/payload/responses/auth/RegistrationResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.css','./signup.component.css'],
})
export class SignupComponent implements OnInit {

  /* Forms */
  registrationFormGroup: FormGroup;
  isLoading: boolean;
  isSubmitting: boolean;
  fieldTextType: boolean;
  fieldTextTypeCompar: boolean;

  termsAndConditions =AppRoutes.termandconditions;
  privacyPolicy = AppRoutes.privacyPolicy;

  /* Alert */
  errorMessage;
  successMessage;
  isErrorAlertVisible;
  isSuccessAlertVisible;
  validationErrors: string[];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
  }
  /* -------------------------------------------------------------------------- */
  /*                               INITIALIZATION                               */
  /* -------------------------------------------------------------------------- */

  /**
   * Initializes form groups and the controls validations
   * @memberof SignupComponent
   */
  initForms(): void {
    /* Registration form initialization */
    this.registrationFormGroup = this.formBuilder.group(
      {
        phoneNumberCtrl: [
          '',
          Validators.compose([Validators.required, Validators.minLength(9)]),
        ],
        emailCtrl: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
          ]),
        ],
        passwordCtrl: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            
          
          ]),
        ],
        confirmPasswordCtrl: ['', Validators.required],
      },
      { validator: ConfirmPasswordValidator.MatchPassword,
        validators: CustomValidators.passwordMatchValidator
      
      }
    );
  }

  /**
   * Returns the registration form group controls
   * @readonly
   * @type {*}
   * @memberof SignupComponent
   */
  get registrationForm(): any {
    return this.registrationFormGroup.controls;
  }

   /* -------------------------------------------------------------------------- */
   /*                                API / SUBMIT                                */
   /* -------------------------------------------------------------------------- */
   
   /**
    * Sends a registration request with the entered registration data
    * @memberof AuthenticationPageComponent
    */
   register(): void {
    // Show the loader on button
    this.isLoading = true;

    // Set submission state to true (used for form validation)
    this.isSubmitting = true;

    // Validate form
    if (this.registrationFormGroup.invalid) {
       this.isLoading = false;
       return;
    }

    // Construct user registration payload object
    const registrationData: UserRegistration = {
       phoneNumber:
            this.registrationFormGroup.get("phoneNumberCtrl").value,
       email: this.registrationFormGroup.get("emailCtrl").value,
       password: this.registrationFormGroup.get("passwordCtrl").value,
       confirmPassword: this.registrationFormGroup.get("confirmPasswordCtrl")
          .value,
    };

    this.authService.register(registrationData).subscribe(
       (res: RegistrationResponse) => {
          // Stop the loader
          this.isLoading = false;
          
          if (res.isSuccess || res.statusCode == StatusCodes.EmailNotSent) {
             // Show verification form
             this.saveVerificationData(res);
             this.registrationFormGroup.reset();
             this.authService.setAuthModalActive("verfication");

             this.displayVerificationForm();
             
          } else {
             // Show error message
             this.displayAlert('ErrorAlert', res);
          }
       },
       (err) => {
          // Close modal on server error
          if (err.status == 0 || err.status == 500) console.log(err) /* this.closeModal.emit(); */
          // Stop the loader
          this.isLoading = false;
          // Display error alert
          this.displayAlert('ErrorAlert', err.error);
       }
    );
 }


 /*display  Verification Form  */

 displayVerificationForm(){
  this.authService.setAuthModalActive("verfication");
  
  }
 /*-------------------------------------------------------------------------- */
   /*                                MISCELLANEOUS                               */
   /* -------------------------------------------------------------------------- */

   saveVerificationData(res: RegistrationResponse): void {
    // Store phone number
    localStorage.setItem(LocallyStoredItemsKeys.VerificationPhoneNumber, res.phoneNumber);
    // Store user ID
    localStorage.setItem(LocallyStoredItemsKeys.VerificationUserId, res.userId);
 }
  /**
   * Displays an alert with the retreived message(s) from an API response
   *
   * @private
   * @param {('ErrorAlert' | 'SuccessAlert')} alertType Specifies the alert type of Success or Error
   * @param {string} message The message to be displayed on the alert
   * @memberof SignupComponent
   */
  private displayAlert(alertType: 'ErrorAlert' | 'SuccessAlert', apiResponse: ApiResponse): void {
    switch (alertType) {
      case 'ErrorAlert':
        // Set error message
        this.errorMessage = apiResponse.responseMessage;

        // Set validation errors
        if (
          apiResponse.validationErrors &&
          apiResponse.validationErrors.length > 0
        ) {
          // Init empty array
          let errorsArr: string[] = [];

          // Push the errors into the array
          apiResponse.validationErrors.forEach((err) =>
            errorsArr.push(err.description)
          );

          // Set the validation errors
          this.validationErrors = errorsArr;
        } else {
          this.validationErrors = null;
        }

        // Display alert
        this.isErrorAlertVisible = true;

        // Hide after timeout
        setTimeout(() => (this.isErrorAlertVisible = false), 10000);

        break;
      case 'SuccessAlert':
        // Set the success message
        this.successMessage = apiResponse.responseMessage;

        // Display alert
        this.isSuccessAlertVisible = true;

        // Hide after timeout
        setTimeout(() => (this.isSuccessAlertVisible = false), 10000);

        break;
       default:
        break;
    }
  }

   /**
    * Toggles the password fields type and eye icon
    * @memberof AuthenticationPageComponent
    */
   toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
 }  
 toggleFieldTextTypeCompar(): void 
 {
   this. fieldTextTypeCompar = !this. fieldTextTypeCompar;
 }

 displayLogin(){
  this.authService.setAuthModalActive("login");
  
  }
}
