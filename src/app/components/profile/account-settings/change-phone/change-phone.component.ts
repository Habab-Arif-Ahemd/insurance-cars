import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.css']
})
export class ChangePhoneComponent implements OnInit {
   @Output() closePhones = new EventEmitter<string>();

   changePhoneForm :FormGroup;
   showEditPhone:boolean=false;
   isLoading:boolean=false;
   isubmited:boolean=false;
   userPhone:any;

     /* Alert */
  errorMessage;
  successMessage;
  isErrorAlertVisible;
  isSuccessAlertVisible;
  validationErrors: string[];
  fieldTextType: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private ProfileService:ProfileService, 
    private authService: AuthService
  ) { }
   /* -------------------------------------------------------------------------- */
  /*                               INITIALIZATION                               */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void { 
     this.initform()
     this.watchLoginState
  }


  private watchLoginState(): void {
   this.authService.getIsLoggedIn().subscribe(isLoggedIn => {
    
         // Get user data from access token
         this.userPhone=this.authService.getTokenUserPhoneNum();

      
   });
}
  initform(){
      // change phone Form
      
  this.changePhoneForm = this.formBuilder.group({
   newPhoneNumber:['', Validators.compose([Validators.required, Validators.minLength(9)])],
   password: ['',Validators.required],
   verificationCode:['', Validators.required]
  });
  }
  changphone(){

   this.isLoading = true;
   delete this.changePhoneForm.value.verificationCode;
    this.changePhoneForm.value.userId = this.authService.getTokenUserId();
    console.log("new Phone Number",this.changePhoneForm.value.newPhoneNumber)
    this.ProfileService.changePhone(this.changePhoneForm.value).subscribe(
       
      (res: ApiResponse) => {
         console.log(res.statusCode);
         // Stop the loader
         console.log("new Phone Number",this.changePhoneForm.value.newPhoneNumber)

         if (res.isSuccess || res.statusCode == StatusCodes.EmailNotSent) {
           this.isubmited=true;
           this.isLoading = false;

         } else {
            this.displayAlert('ErrorAlert', res);

         }
      },
      (err) => {
         console.log("errrooore",err.statusCode);
         // Close modal on server error
         if (err.status == 0 || err.status == 500)
          console.log(err) /* this.closeModal.emit(); */
         // Stop the loader
         this.isLoading = false;
        
         // Display error alert
         this.displayAlert('ErrorAlert', err.error);
      }
   );
  }
  get changePhonenumberForm(): any {
   return this.changePhoneForm.controls;
 }
confirmchangephone(){
   this.isLoading = true;
  this.changePhoneForm.value.userId=this.authService.getTokenUserId();
  console.log( "ss",this.changePhoneForm.value.newPhoneNumber);

   this.ProfileService.changePhone(this.changePhoneForm.value).subscribe(
      (res: ApiResponse) => {
         console.log(res.statusCode);
           // send phone number for index page
         this.closePhones.emit(this.changePhoneForm.value.newPhoneNumber);
         // save the number in local storage
         localStorage.setItem('phoneNumber',this.changePhoneForm.value.newPhoneNumber );

         // Stop the loader
         if (res.isSuccess || res.statusCode == StatusCodes.EmailNotSent) {
            this.isLoading = false;

         } else {

         }
      },
      (err) => {
         console.log(err.statusCode);
         // Close modal on server error
         if (err.status == 0 || err.status == 500)
          console.log(err) /* this.closeModal.emit(); */
         // Stop the loader
         // Display error alert
         this.isLoading = false;

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
    * @memberof ChangePhoneComponent
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

toggleFieldTextType(): void {
   this.fieldTextType = !this.fieldTextType;
}  
}
