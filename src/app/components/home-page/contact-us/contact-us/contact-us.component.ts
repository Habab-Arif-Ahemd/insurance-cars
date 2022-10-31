import {  FormBuilder,FormGroup } from '@ngneat/reactive-forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CaptchaValues } from 'src/app/models/landing/CaptchaValues';
import { Validators } from '@angular/forms';
import { NgFormsManager } from '@ngneat/forms-manager';
import { ManagedForms, ManagedFormsTypes } from 'src/app/models/insurance-steps/ManagedFormsTypes';
import{ContactusFormGroup}from 'src/app/models/insurance-steps/ManagedFormsTypes'
import { InsuranceStepsApiService } from 'src/app/services/insurance-steps/insurance-steps-api.service';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  /* Captcha */
  @ViewChild('captchacanvas', { static: true }) captchaCanvas: ElementRef;
  captchaCode = "";
  private canvasContext: CanvasRenderingContext2D;
  captchaValues: CaptchaValues = { generatedValue: '', enteredValue: '' };
  /* form */
  ContactusFormGroup:FormGroup<ManagedFormsTypes['ContactusFormGroup']>;
  
  /* UI */
  isLoading = false;
  isFormValid = false;
  isSubmitting: boolean;
    /* Alert */
    errorMessage;
    successMessage;
    isErrorAlertVisible;
    isSuccessAlertVisible;
    validationErrors: string[];
  
 /* Api */
 Contactus:any
  constructor(   
   private fb: FormBuilder,
   private formsManager: NgFormsManager<ManagedFormsTypes>,
   private countactUsService:InsuranceStepsApiService

    ) { }

  ngOnInit(): void {
    this.initForm();
    this.initCaptcha();
  }
  initForm(): void {
this.ContactusFormGroup=this.fb.group({
  name:[null, [Validators.required]],
  phoneNumber:[null, [Validators.required]],
  email:[ '',Validators.compose([Validators.required,Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),]), ],
  message:[null, [Validators.required]],
})   
 this.formsManager.upsert(ManagedForms.ContactusFormGroup, this.ContactusFormGroup, {persistState: true});
 this.clearForm();

  }

  get ContactusForm() {
    return this.ContactusFormGroup.controls;
  }
  private clearForm(): void {
    this.ContactusFormGroup.reset();
  }
  

  /* -------------------------------------------------------------------------- */
  /*                                   Captcha                                  */
  /* -------------------------------------------------------------------------- */

  private async initCaptcha() {
    this.initCaptchaContent();
    /*  await AppUtils.delay(500); */
    this.initCaptchaContent();
  }

  initCaptchaContent(): void {
    const charsArray = '0123456789';
    const lengthOtp = 6;
    const captcha = [];
    const canv = this.captchaCanvas.nativeElement;
    this.canvasContext = (canv as HTMLCanvasElement).getContext('2d');

    // Clear canvas
    this.canvasContext.clearRect(
      0,
      0,
      this.canvasContext.canvas.width,
      this.canvasContext.canvas.height
    );

    for (let i = 0; i < lengthOtp; i++) {
      const index = Math.floor(Math.random() * charsArray.length + 1);
      if (captcha.indexOf(charsArray[index]) === -1) {
        captcha.push(charsArray[index]);
      } else {
        i--;
      }
    }

    // this.captchaValues.generatedValue = captcha.join('');
    this.captchaCode = captcha.join("");

    this.canvasContext.font = '16px Comfortaa';
    this.canvasContext.textBaseline = 'middle';
    this.canvasContext.textAlign = 'center';
    const x = (canv as HTMLCanvasElement).width / 2;
    const y = (canv as HTMLCanvasElement).height / 2;
    this.canvasContext.strokeText(this.captchaCode, x, y);
    // this.canvasContext.strokeText(this.captchaValues.generatedValue, x, y);

    // Revalidate form with new captcha
    this.validateOrderForm();
  }

   isCaptchaValid(): boolean {
    return this.ContactusFormGroup.get("captcha").value === this.captchaCode;
  }

 /* -------------------------------------------------------------------------- */
  /*                                     UI                                     */
  /* -------------------------------------------------------------------------- */

  validateOrderForm(): void {
    if (
      this.isCaptchaValid() &&
      this.ContactusForm.name.valid &&
      this.ContactusForm.phoneNumber.valid
    ) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }
 submit(){
  this.isLoading = true;
  this.isSubmitting = true;
  // Construct user registration payload object
  const contactus: ContactusFormGroup = {
    name:this.ContactusFormGroup.get("name").value,
    phoneNumber: this.ContactusFormGroup.get("phoneNumber").value,
     email: this.ContactusFormGroup.get("email").value,
     message: this.ContactusFormGroup.get("message").value,
  };
  
this.countactUsService.contactUs(contactus).subscribe((res: any) => {
     // Stop the loader
     this.Contactus = res;
    console.log("contactUs 1",this.Contactus )
     this.isLoading = false;
     
    
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


}
