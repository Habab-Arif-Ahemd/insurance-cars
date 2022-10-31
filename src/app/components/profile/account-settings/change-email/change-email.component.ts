import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import {Output,EventEmitter} from '@angular/core';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

   @Output() closeEmails = new EventEmitter();

   changeEmailForm :FormGroup;
   showEditEmail: boolean = false;
   isLoading: boolean;
   isubmited:boolean=false;
   isLoggedIn:boolean; 
   userEmail:any;
      /* Alert */
 errorMessage;
 successMessage;
 isErrorAlertVisible;
 isSuccessAlertVisible;
 validationErrors: string[];

  constructor(
   private formBuilder: FormBuilder,
   private ProfileService:ProfileService, 
   private authService: AuthService
     ) { }

  ngOnInit(): void {
     this.initform();
     this.watchLoginState();
  }

  
  private watchLoginState(): void {
   this.authService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
         // Get user data from access token
         this.userEmail = this.authService.getDecodedToken().sub;
      }
   });
}

  initform(){
   // change Email Form
  this.changeEmailForm = this.formBuilder.group({
   userName: 
   [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
      ]),
    ],
    password:['',Validators.required],
    verificationCode:['',Validators.required]
  });
}
   changEmail(){
      this.isLoading = true;
      console.log(this.changeEmailForm.value);
    this.changeEmailForm.value.userId = this.authService.getTokenUserId();
    delete this.changeEmailForm.value.verificationCode ;
    this.ProfileService.changeEmail(this.changeEmailForm.value).subscribe(
      (res: ApiResponse) => {
         console.log(res.statusCode);
         // Stop the loader
         localStorage.setItem('userEmail',this.changeEmailForm.value.userName);

         this.isLoading = false;
         //this.showVerfication.emit();
         if (res.isSuccess ) {
            // Show verification form
            this.isubmited = true;
            // this.showVerfication.emit();
            // this.saveVerificationData(res);
            // this.registrationFormGroup.reset();
         } else {
             //Show error message
           this.displayAlert('ErrorAlert', res);
         }
      },
      (err) => {
/*          console.log(err.statusCode);
 */         // Close modal on server error
         /* if (err.status == 0 || err.status == 500) console.log(err) */
          /* this.closeModal.emit(); */
         // Stop the loader
/*          this.isLoading = false;
 */         // Display error alert
         // this.displayAlert('ErrorAlert', err.error);
         
        // Close modal on server error
        if (err.status == 0 || err.status == 500) 

        if (err.statusCode == StatusCodes.EmailNotSent) {
            console.log(err.status);
          // save verfication data
 
        // Get error response message
        const errMsg = err.error.responseMessage;

        // Stop the loader
        this.isLoading = false;

        // Display error alert
        this.displayAlert('ErrorAlert', err.error);
      }});
  
   }
   confirmEmail(){
      this.isLoading = true;
      this.changeEmailForm.value.userId = this.authService.getTokenUserId();
      delete  this.changeEmailForm.value.password;
      this.ProfileService.confirmEmailchange(this.changeEmailForm.value).subscribe(
         (res: ApiResponse) => {
            console.log(res.statusCode);
            // Stop the loader
            this.isLoading = false;
            if (res.isSuccess || res.statusCode == StatusCodes.EmailNotSent) {
               this.isubmited = true;
            } else {

            }
         },
         (err) => {
            console.log(err.statusCode);
            if (err.status == 0 || err.status == 500) console.log(err) /* this.closeModal.emit(); */
            // Stop the loader
            this.isLoading = false;
            // Display error alert
            // this.displayAlert('ErrorAlert', err.error);
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
