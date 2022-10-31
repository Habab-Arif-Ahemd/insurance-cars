import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFormsManager } from '@ngneat/forms-manager';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import AppUtils from "src/app/helpers/utils/AppUtils";
import { NationalIdValidator } from 'src/app/helpers/validators/NationalIdValidator';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { ManagedForms, ManagedFormsTypes } from 'src/app/models/insurance-steps/ManagedFormsTypes';
import { CaptchaValues } from 'src/app/models/landing/CaptchaValues';
import FAQs from 'src/app/models/landing/FAQs';
import { VehicleIdTypes } from 'src/app/models/master-table/VehicleIdTypeId';
import { AppService } from 'src/app/services/app/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InsuranceStepsApiService } from 'src/app/services/insurance-steps/insurance-steps-api.service';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  providers: [
/*     { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
 */  ]
})
export class BannerComponent implements OnInit {
  /* Captcha */
  @ViewChild('captchacanvas', { static: true }) captchaCanvas: ElementRef;
  captchaCode = "";

  private canvasContext: CanvasRenderingContext2D;
  captchaValues: CaptchaValues = { generatedValue: '', enteredValue: '' };
  /* Form */
  landingFormGroup: FormGroup<ManagedFormsTypes['LandingForm']>;
  /* Data */
  frequentQuestions: FAQs = FAQs.QAs;
  vehicleIdTypes: VehicleIdTypes[] = [];
  selectedVehicleIdTypes: number = 1;
  isVehicleTrasfer: boolean = false;
  minPolicyDate;
  maxPolicyDate;
  model;
  submitted: boolean = false;

  /* UI */
  isLoading = false;
  isFormValid = false;
  errorMessage: string;
  isAgree = false;
  isAgreeInTrial = false;
  showSequenceNo = true;
  lang: string;
  isLoggedIn: boolean;
  license: '../../../../assets/img/Icon-png/message-question.png';
  /* Date Pickers */
 
  now = new Date();
  minDate;
  maxDate;

  constructor(
    private fb: FormBuilder,
    private insuranceStepsApi: InsuranceStepsApiService,
    private insuranceStepsService: InsuranceStepsService,
    private appService: AppService,
    private formsManager: NgFormsManager<ManagedFormsTypes>,
    private router: Router,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.initCaptcha();

    this.initForm();
    this.getStepData();
    this.setMinDate();
    this.setMaxDate();
    this.watchLoginState();

  }
  // initeDate(){
  //  this.minDate = new Date();
  //  this.maxDate = new Date();
  //  this.maxDate = new Date(this.maxDate.setDate(this.maxDate.getDate() + 14));
  //  this.minDate = new Date(this.minDate.setDate(this.minDate.getDate() + 1));
  // }
  setMinDate() {
    let minDate = AppUtils.addDays(this.now, 1);
    this.minDate = {
       year: minDate.getFullYear(),
       month: minDate.getMonth() + 1,
       day: minDate.getDate(),
    };
 }

 setMaxDate() {
  let maxDate = AppUtils.addDays(this.now, 14);
  this.maxDate = {
     year: maxDate.getFullYear(),
     month: maxDate.getMonth() + 1,
     day: maxDate.getDate(),
  };
}
  


  getStepData() {
    this.insuranceStepsApi.getStepsData();
    this.insuranceStepsService
      .getInsuranceStepsData()
      .subscribe((stepsData) => {
        this.isLoading = false;
        this.vehicleIdTypes = stepsData.VehicleIdTypes;
      });
    /* get master table data */
    /* TODO: Move master table request from quotation request page to landing page */
    this.appService.getAppLang().subscribe((language) => {
    this.lang = language;
    }); 
  }

  /**
   * Constructs and initializes the landing form, its values, and its listeners.
   *
   * @memberof BannerComponent
   */
  initForm(): void {
    // Construct form
    this.landingFormGroup = this.fb.group({
      isVehicleOwnerTransfer: [false],
      insuredIdentityNumber: [
        null,
         Validators.compose([
            Validators.required,
            NationalIdValidator,
            Validators.minLength(10),
         ]),
      ],
      vehicleId: [
        null,
         Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
         ]),
      ],
      policyEffectiveDate: [null, [Validators.required]],
      vehicleIdTypeId: [null, [Validators.required]],
      vehicleOwnerIdentityNumber: [null],
      vehicleModelYear: [null],
      insuredIdentityTypeId: [null],
      captcha: ["", [Validators.required]],
    });
    // Add the form to the managed forms
    this.formsManager.upsert(ManagedForms.LandingForm, this.landingFormGroup, {persistState: true});
    // this.handleFormChanges();
    this.clearForm();
  }


  get landingForm() {

    return this.landingFormGroup.controls;
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
    const lengthOtp = 4;
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
    return this.landingFormGroup.get("captcha").value === this.captchaCode;
  }

  /* -------------------------------------------------------------------------- */
  /*                                     UI                                     */
  /* -------------------------------------------------------------------------- */

  validateOrderForm(): void {
    if (
      this.isCaptchaValid() &&
      this.landingForm.insuredIdentityNumber.valid &&
      this.landingForm.vehicleId.valid
    ) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }
  
  /* TODO: fix vehcile model year validation message  */
  selectVehicleType(e) {
    this.selectedVehicleIdTypes = e.id;

    if (this.selectedVehicleIdTypes == 2) {
      this.landingForm.vehicleModelYear.setValidators(Validators.required);
      
    } else {
      this.landingForm.vehicleModelYear.clearValidators();
    }

    this.landingForm.vehicleModelYear.updateValueAndValidity();
  }

  isVehicleTransfer() {

/*     this.landingForm.vehicleOwnerIdentityNumber.reset();
 */
    this.isVehicleTrasfer = !this.isVehicleTrasfer;
    localStorage.setItem('isVehicleTrasfer', 'true');

    if (this.isVehicleTrasfer) {

       this.selectedVehicleIdTypes = 1;

    }

    if (this.isVehicleTrasfer) {
       this.landingForm.vehicleOwnerIdentityNumber
          .setValidators(
             Validators.compose([
                Validators.required,
                NationalIdValidator,
                Validators.minLength(10), ])   );  this.landingForm.vehicleOwnerIdentityNumber.updateValueAndValidity(); } else {
   this.landingForm.vehicleOwnerIdentityNumber.clearValidators();
 }

    this.landingForm.vehicleOwnerIdentityNumber.updateValueAndValidity();
    /*  */
    /* this.landingForm.vehicleOwnerIdentityNumber.reset();
    this.landingForm.vehicleIdTypeId.reset();
    this.isVehicleTrasfer = !this.isVehicleTrasfer;

    if (this.isVehicleTrasfer) this.selectedVehicleIdTypes = 1;

    if (this.isVehicleTrasfer) {
      this.landingForm.vehicleOwnerIdentityNumber.setValidators(Validators.compose([Validators.required, Validators.minLength(10)]));
    } else {
      this.landingForm.vehicleOwnerIdentityNumber.clearValidators();
    }

    this.landingForm.vehicleOwnerIdentityNumber.updateValueAndValidity(); */
  }
  private watchLoginState(): void {
    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
 }
  /* -------------------------------------------------------------------------- */
  /*                                API / SUBMIT                                */
  /* -------------------------------------------------------------------------- */

  /**
   * Inquire user data to check if their is previous quotation
   *
   * @memberof BannerComponent
   */

  inquire(): void {
    this.submitted = true;
    // Check if authenticated
    if (this.authService.getIsLoggedIn().value) {
    this.isLoading = true;
    
    setTimeout(() => {
      this.clearLocallyStoredItemsKeys();
      this.navigateUser();
    }, 2000);

    } else {
      // Display login modal if not authenticated
      this.authService.setIsAuthModalShown(true);
      this.authService.getIsAuthModalShown().subscribe((isModalDisplayed) => {
        if (!isModalDisplayed) this.inquire();
      });
    }

    localStorage.removeItem('QuoteFromProfile');
    localStorage.removeItem('QuoteFromProfileFill');

  }

  /* -------------------------------------------------------------------------- */
  /*                              rest forms                                   */
  /* -------------------------------------------------------------------------- */
  private clearForm(): void {
    this.landingFormGroup.reset();
    this.landingForm.vehicleIdTypeId.setValue(1);
    this.landingForm.isVehicleOwnerTransfer.setValue(false);
  }
  

  /**
   * Deletes previous quotation request data from local storage
   *
   * @memberof InquireService
   */
   private clearLocallyStoredItemsKeys() {

    if (localStorage.getItem(LocallyStoredItemsKeys.FormManager)) {

      this.formsManager.clear(ManagedForms.MainDriverInsuranceForm);
      this.formsManager.clear(ManagedForms.VehicleInsuranceForm);
      this.formsManager.clear(ManagedForms.DriversMoreDetails);
    }
    if (localStorage.getItem(LocallyStoredItemsKeys.UserAdditionalDrivers)) localStorage.removeItem(LocallyStoredItemsKeys.UserAdditionalDrivers);
    if (localStorage.getItem(LocallyStoredItemsKeys.UserQuoteResponse)) localStorage.removeItem(LocallyStoredItemsKeys.UserQuoteResponse);
    if (localStorage.getItem(LocallyStoredItemsKeys.PreviewQuoteResponse)) localStorage.removeItem(LocallyStoredItemsKeys.PreviewQuoteResponse);

  }


  private navigateUser() {
    this.router.navigate([AppRoutes.MotorRoutes.request + '/' + AppRoutes.MotorRoutes.insuredInfo]);
  }
}
