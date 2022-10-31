import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPasswordValidator, PasswordStrengthValidator } from 'src/app/helpers/validators/ConfirmPasswordValidator';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { PasswordResetReq } from 'src/app/payload/requests/user/PasswordResetReq';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['../auth.component.css','./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
@Output() closeModal = new EventEmitter();
@Output() showVerficationRestpassword = new EventEmitter();
@Output() showLogin = new EventEmitter();
/* Forms */
passwordResetFormGroup: FormGroup;
isLoading: boolean;
isSubmitting: boolean;

/* Alert */
errorMessage;
successMessage;
isErrorAlertVisible;
isSuccessAlertVisible;
validationErrors: string[];
    
  constructor(private formBuilder: FormBuilder, private activedRoute: ActivatedRoute , private authService:AuthService) {
      
  }

  ngOnInit(): void {
    this.initForms();
  }

   /* -------------------------------------------------------------------------- */
   /*                               INITIALIZATION                               */
   /* -------------------------------------------------------------------------- */

   /**
    * Initializes form groups and the controls validations
    * @memberof ForgetPasswordComponent
    */
   initForms(): void {
        /* Password reset form initialization */
      this.passwordResetFormGroup = this.formBuilder.group({
         email: ["", Validators.compose([
           Validators.required,
           Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
        ])],
        lastPhoneDigits: ["", Validators.compose([
           Validators.required,
           Validators.pattern(/^[0-9]*$/),
           Validators.maxLength(4),
           Validators.minLength(4),
        ])],
     });
   }

   
   /**
    * Returns the password reset form group controls
    * @readonly
    * @type {*}
    * @memberof ForgetPasswordComponent
    */
   get passwordResetForm(): any {
    return this.passwordResetFormGroup.controls;
 }

 

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
  /* -------------------------------------------------------------------------- */
  /*--------------------------------API / SUBMIT--------------------------------*/
  /* --------------- ----------------  ---------------------------------------- */

/* --------------------------------- submit --------------------------------- */

sendPasswordReset(){
   // display loading 

/* this.isSubmitting = true;
 */    this.isLoading = true;
  
  
 this.isLoading = true;
    // Set submission state to true (used for form validation)
    this.isSubmitting = true;
    // Validate form
    if (this.passwordResetFormGroup.invalid) {
      this.isLoading = false;
      return;
    }
    
   console.log(this.passwordResetFormGroup.value);
   // save verfication data in localStorage
   localStorage.setItem(LocallyStoredItemsKeys.VerificationUserEmail,this.passwordResetFormGroup.value.email)
   localStorage.setItem(LocallyStoredItemsKeys.VerificationlastPhoneDigits,
      this.passwordResetFormGroup.value.lastPhoneDigits)
   // send reauest to service 
     this.authService.PasswordResetRequest(this.passwordResetFormGroup.value).subscribe(
      (res: ApiResponse) => {
         this.isLoading = false;
         this.showVerficationRestpassword.emit();
         this.authService.setAuthModalActive("verficationRestpassword");

      },
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
backToLogin(){
   console.log("login back")

 /*   this.showLogin.emit(); */
 this.authService.setAuthModalActive("login");

}
 


}
