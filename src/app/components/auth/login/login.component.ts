import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { UserLogin } from 'src/app/payload/requests/auth/UserLogin';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { LoginResponse } from 'src/app/payload/responses/auth/LoginResponse';
import { RegistrationResponse } from 'src/app/payload/responses/auth/RegistrationResponse';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css','./login.component.css'],
})
export class LoginComponent implements OnInit {
          
  displayForm = {
    login: false,
    signup: false,
    forgetPassword: true,
    verfication: false,
    verficationRestpassword: false,
  };
 
  /* Forms */
  loginFormGroup: FormGroup;
  isLoading: boolean= false;
  isSubmitting: boolean = false;
  ForgetPassword:boolean=false;
  /* Alert */
  errorMessage;
  successMessage;
  isErrorAlertVisible;
  isSuccessAlertVisible;
  validationErrors: string[];
  fieldTextType: boolean=false;

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
   * @memberof LoginComponent
   */
  initForms(): void {
    /* Login form initialization */
    this.loginFormGroup = this.formBuilder.group({
      emailCtrl: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
        ]),
      ],
      passwordCtrl: ['', Validators.required],
      rememberMeCtrl: [''],
    });
  }

  /**
   * Returns the login form group controls
   * @readonly
   * @type {*}
   * @memberof LoginComponent
   */
  get loginForm(): any {
    return this.loginFormGroup.controls;
  }

  /* -------------------------------------------------------------------------- */
  /*                                API / SUBMIT                                */
  /* -------------------------------------------------------------------------- */

  /**
   * Authenticates user
   *
   * @memberof AuthenticationPageComponent
   */
  
  login(): void {

    // Show the loader on button
    this.isLoading = true;
    // Set submission state to true (used for form validation)
    this.isSubmitting = true;
    // Validate form
    if (this.loginFormGroup.invalid) {
      this.isLoading = false;

      
      return;
    }
    
    // Construct user login payload object
    
    const loginData: UserLogin = {
      userName: this.loginFormGroup.get('emailCtrl').value,
      password: this.loginFormGroup.get('passwordCtrl').value,
      
    //   rememberMe: this.isRememberMeChecked,
    };

    // Send request
    this.authService.login(loginData).subscribe(
      (res: LoginResponse) => {
        // Stop the loader
        this.isLoading = false;   

      
        if (res.isSuccess) {
          if (this.authService.getIsAuthModalShown().value) {
            this.authService.setIsAuthModalShown(false);
            this.loginFormGroup.reset();
         } else {
            this.router.navigate([AppRoutes.profile.newPolicy]);
         }
        } else {
          // Display error alert
          this.displayAlert('ErrorAlert', res);
        }
      },
      (err) => {
        // Close modal on server error
        if (err.status == 0 || err.status == 500) 

        if (err.status == StatusCodes.UnVerifiedAccount) {
            console.log(err.status);
          // save verfication data
          let phoneNumber = err.error.phoneNumber;
          let userId = err.error.userId;

          // Construct resend request data
          let userVerficationData: RegistrationResponse = {
            phoneNumber: phoneNumber,
            userId: userId,
          };
          console.log(userVerficationData);
       
          this.saveVerificationData(userVerficationData);
        }
        // Get error response message
        const errMsg = err.error.responseMessage;

        // Stop the loader
        this.isLoading = false;

        // Display error alert
        this.displayAlert('ErrorAlert', err.error);
      }
    );
   

  }

   /**
    * Displays an alert with the retreived message(s) from an API response
    *
    * @private
    * @param {('ErrorAlert' | 'SuccessAlert')} alertType Specifies the alert type of Success or Error
    * @param {string} message The message to be displayed on the alert
    * @memberof AuthenticationPageComponent
    */
   private displayAlert(alertType: 'ErrorAlert' | 'SuccessAlert', apiResponse: ApiResponse): void {
    switch (alertType) {
       case 'ErrorAlert':

          // Set error message
          this.errorMessage = apiResponse.responseMessage;

          // Set validation errors
          if (apiResponse.validationErrors && apiResponse.validationErrors.length > 0) {

             // Init empty array
             let errorsArr: string[] = [];

             // Push the errors into the array
             apiResponse.validationErrors.forEach(err => errorsArr.push(err.description));

             // Set the validation errors
             this.validationErrors = errorsArr;

          } else {
             this.validationErrors = null;
          }

          // Display alert
          this.isErrorAlertVisible = true;

          // Hide after timeout
          setTimeout(() => this.isErrorAlertVisible = false, 10000);

       break;
       case 'SuccessAlert':

          // Set the success message
          this.successMessage = apiResponse.responseMessage;

          // Display alert
          this.isSuccessAlertVisible = true;

          // Hide after timeout
          setTimeout(() => this.isSuccessAlertVisible = false, 10000);

       break;
       default: break;
    }
 }
   
 /* watch Active Form */

  

displayForgetPassward(){
this.authService.setAuthModalActive("forgetPassword");

} 

displaySignUp(){
  this.authService.setAuthModalActive("signup");
  
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


 clearVerificationData(): void {
    // Remove phone number
    localStorage.removeItem(LocallyStoredItemsKeys.VerificationPhoneNumber);
    // Remove user ID
    localStorage.removeItem(LocallyStoredItemsKeys.VerificationUserId);
 }
 toggleFieldTextType(): void {
  this.fieldTextType = !this.fieldTextType;
}  

}
