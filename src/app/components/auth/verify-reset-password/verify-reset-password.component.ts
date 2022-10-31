import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator, ConfirmPasswordValidator } from 'src/app/helpers/validators/ConfirmPasswordValidator';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PasswordReset } from 'src/app/payload/requests/auth/Resetpassword';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { PasswordResetRequest } from 'src/app/payload/requests/auth/PasswordResetRequest';
@Component({
  selector: 'app-verify-reset-password',
  templateUrl: './verify-reset-password.component.html',
  styleUrls: ['./verify-reset-password.component.css']
})
export class VerifyResetPasswordComponent implements OnInit {
  constructor(private authService: AuthService,private formBuilder:FormBuilder) { }

  /* Forms */
   confirmResetPasswordFormGroup: FormGroup;
   isLoading: boolean;
   isLoadingResend: boolean;
   isSubmitting: boolean;
   fieldTextType: boolean;
   fieldTextTypeCompar: boolean;
   /* Alert */
 errorMessage;
 successMessage;
 isErrorAlertVisible;
 isSuccessAlertVisible;
 validationErrors: string[];
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
    this.confirmResetPasswordFormGroup = this.formBuilder.group(
      {
       code: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
       
        passwordCtrl: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            PasswordStrengthValidator,
          ]),
        ],
        confirmPasswordCtrl: ['', Validators.required],
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
  }
 
  /**
    * Returns the registration form group controls
    * @readonly
    * @type {*}
    * @memberof VerifyResetPasswordComponent
    */
 get confirmResetPasswordForm(): any {
  return this.confirmResetPasswordFormGroup.controls;
 }
 
 /* ------------- * Toggles the password fields type and eye icon ------------ */
 
 toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
 }  
 toggleFieldTextTypeCompar(): void 
 {
   this. fieldTextTypeCompar = !this. fieldTextTypeCompar;
 }
 
 /* -------------------------------------------------------------------------- */
 /*                                 API / SUBMIT                                 */
 /* -------------------------------------------------------------------------- */
 
 /* ------------- * Submit confrimation to change Password ------------ */
 SendConfirmation(){
    // start loading
    this.isLoading=true;
    this.isSubmitting=true;
   // Construct user passwordReset payload object
   console.log("ssssss"+this.confirmResetPasswordFormGroup.get('code').value)
   const passwordReset: PasswordReset = {
    email:localStorage.getItem(LocallyStoredItemsKeys.VerificationUserEmail),
    code: this.confirmResetPasswordFormGroup.get('code').value,
    newPassword: this.confirmResetPasswordFormGroup.get('passwordCtrl').value,
  };
  this.authService.resetpassword(passwordReset).subscribe(
    (res: ApiResponse) => {
      if (res.isSuccess) {
         // To login
         this.displayAlert('SuccessAlert', res);

         this.authService.setAuthModalActive("login");

         // Show success message (on login subpage)
         // Hide password reset subpage
         // Reset all spinners and validations
         this.isSubmitting = false;
         this.isLoading = false;
      } else {
         this.displayAlert('ErrorAlert', res);
      }    },
    (err) => {
       console.log(err.statusCode);
       if (err.status == 0 || err.status == 500) 
       console.log(err) /* this.closeModal.emit(); */
       // Stop the loader
       this.isLoading = false;
       // Display error alert
       this.displayAlert('ErrorAlert', err.error);
    }
 );

 }
 
 /* ------------------------- Resend verfication code ------------------------ */
 resendcode(){
     // Stop the loader
     this.isLoadingResend=true;
      // Construct user Resend payload object
       const resendCode: PasswordResetRequest = {
       email:localStorage.getItem(LocallyStoredItemsKeys.VerificationUserEmail),
       lastPhoneDigits: localStorage.getItem(LocallyStoredItemsKeys.VerificationlastPhoneDigits),
     };
    //  send request to service resend 
    this.authService.PasswordResetRequest(resendCode).subscribe(
       (res: ApiResponse) => {
           // Stop the loader
          this.isLoadingResend = false;
       },
       (err) => {
          console.log(err.statusCode);
          if (err.status == 0 || err.status == 500) 
          console.log(err) /* this.closeModal.emit(); */
          // Stop the loader
          this.isLoadingResend = false;
          // Display error alert
          this.displayAlert('ErrorAlert', err.error);
       }
    );
    
    }
   //  despaly alert function 
   /**
     * Displays an alert with the retreived message(s) from an API response
     * 
     * @private
     * @param {('ErrorAlert' | 'SuccessAlert')} alertType Specifies the alert type of Success or Error
     * @param {string} message The message to be displayed on the alert
     * @memberof ForgetPasswordComponent
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
      
    }
 
 