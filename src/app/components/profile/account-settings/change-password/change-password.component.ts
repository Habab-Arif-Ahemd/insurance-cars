import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../../services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ConfirmPasswordValidator, PasswordStrengthValidator } from 'src/app/helpers/validators/ConfirmPasswordValidator';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { PasswordChangeRequest } from 'src/app/payload/requests/user/PasswordChangeReq';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
   @Output() closePasswords = new EventEmitter();
   isLoading: boolean;
   isSubmittingshowEditPassword
   showEditPassword :boolean;
   changePasswordForm :FormGroup;
   isubmited :boolean=false;
  constructor(
       private formBuilder: FormBuilder,
       private ProfileService:ProfileService,
        private authService: AuthService
   ) { }
   initForms(): void {
this.changePasswordForm = this.formBuilder.group(
         {
            oldPassword: [
             '',
             Validators.compose([
               Validators.required,
               Validators.minLength(8),
               PasswordStrengthValidator,
             ]),
           ],
           newPassword: ['', Validators.compose([
            Validators.required,
            Validators.minLength(8),
            PasswordStrengthValidator,
          ])],
          confirmNewPassword: ['', Validators.required],
          verificationCode:['', Validators.required]
         },
         // { validator: ConfirmPasswordValidator.MatchPassword }
       );
   }
   changePassword(){
      this.isLoading = true;
      delete this.changePasswordForm.value.verificationCode;
      this.changePasswordForm.value.userId = this.authService.getTokenUserId();
      console.log( this.changePasswordForm.value);
       this.ProfileService.changePassword(this.changePasswordForm.value).subscribe(
         (res: ApiResponse) => {
            console.log(res.statusCode);
           
            if (res.isSuccess || res.statusCode == StatusCodes.EmailNotSent) {
              
               this.isLoading = false;
               this.isubmited=true;
            } else {
               // Show error message
              // this.displayAlert('ErrorAlert', res);
            }
         },
         (err) => {
            console.log(err.statusCode);
            // Close modal on server error
            if (err.status == 0 || err.status == 500) console.log(err) /* this.closeModal.emit(); */
            // Stop the loader
            this.isLoading = false;
            // Display error alert
            // this.displayAlert('ErrorAlert', err.error);
         }
      );
      }
  ngOnInit(): void {
   this.initForms();
  }
  ConfirmchangePassword(){
   this.isLoading = true;
   this.changePasswordForm.value.userId = this.authService.getTokenUserId();
   delete this.changePasswordForm.value.oldPassword;
   delete this.changePasswordForm.value.confirmNewPassword;
   console.log( this.changePasswordForm.value);
    this.ProfileService.confirmchangePassword(this.changePasswordForm.value).subscribe(
      (res: ApiResponse) => {
         console.log(res.statusCode);
        
         if (res.isSuccess || res.statusCode == StatusCodes.EmailNotSent) {
           
            this.isLoading = false;

         } else {
            // Show error message
           // this.displayAlert('ErrorAlert', res);
         }
      },
      (err) => {
         console.log(err.statusCode);
         // Close modal on server error
         if (err.status == 0 || err.status == 500) console.log(err) /* this.closeModal.emit(); */
         // Stop the loader
         this.isLoading = false;
         // Display error alert
         // this.displayAlert('ErrorAlert', err.error);
      }
   );
  }

}
