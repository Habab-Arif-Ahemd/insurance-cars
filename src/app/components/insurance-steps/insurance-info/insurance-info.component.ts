import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgFormsManager } from '@ngneat/forms-manager';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import AppUtils from "src/app/helpers/utils/AppUtils";
import { NationalIdValidator } from 'src/app/helpers/validators/NationalIdValidator';
import { ManagedForms, ManagedFormsTypes } from 'src/app/models/insurance-steps/ManagedFormsTypes';
import { CaptchaValues } from 'src/app/models/landing/CaptchaValues';
import FAQs from 'src/app/models/landing/FAQs';
import { VehicleIdTypes } from 'src/app/models/master-table/VehicleIdTypeId';
import { AppService } from 'src/app/services/app/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InsuranceStepsApiService } from 'src/app/services/insurance-steps/insurance-steps-api.service';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';
import { filter } from 'rxjs/operators'
@Component({
  selector: 'app-insurance-info',
  templateUrl: './insurance-info.component.html',
  styleUrls: ['./insurance-info.component.css'],
  
  
})
export class InsuranceInfoComponent implements OnInit {
 
  private canvasContext: CanvasRenderingContext2D;
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
  previousQuotationData = this.insuranceSteps.getSelectIdentity().value;
  previousQuotationDatavehicles = this.insuranceSteps.getSelectVehicle().value;

/*   Disabled: boolean= this.previousQuotationDat    a ? false : null  ;
 */
  Disabled: boolean= Object.entries(this.previousQuotationData).length === 0 ? null : true  ;
  DisabledForm:boolean= Object.entries(this.previousQuotationDatavehicles).length === 0 ? null : true ;


  /* UI */
  isLoading = false;
  isFormValid = false;    
  errorMessage: string;
  isAgree = false;
  showSequenceNo = true;
  lang: string;
  isLoggedIn: boolean;

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
    private insuranceSteps: InsuranceStepsService,
  ){}
  refresh(){

    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects 
      ) { 
         // here your code when page is refresh
         this.Disabled =Boolean(localStorage.getItem('Disabled')) 
 /*         localStorage.getItem('QuoteFromProfile'.toLowerCase());
  */     }
    })
     
   }
  ngOnInit(): void {
    this.initForm();
    this.getStepData();
    this.setMinDate();
    this.setMaxDate();
    this.watchLoginState();
    this.getPreviousQuotationData();
  
console.log( "hababababababababababababababab", this.previousQuotationData )

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
      isVehicleOwnerTransfer: [true],
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
      ],
      policyEffectiveDate: [null, [Validators.required]],
      vehicleIdTypeId: [null, [Validators.required]],
      vehicleOwnerIdentityNumber: [null],
      vehicleModelYear: [null],
      insuredIdentityTypeId: [null],
    });

    // Add the form to the managed forms
    this.formsManager.upsert(ManagedForms.LandingForm, this.landingFormGroup, {persistState: true});
    // this.handleFormChanges();
  }


  get landingForm() {
    return this.landingFormGroup.controls;
  }

  
/*    <a data-toggle="tooltip" title="<img src='http://getbootstrap.com/apple-touch-icon.png' />">
        <i class="icon-shopping-cart"></i>
    </a> */

  /* -------------------------------------------------------------------------- */
  /*                                     UI                                     */
  /* -------------------------------------------------------------------------- */

  
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
    this.landingForm.vehicleOwnerIdentityNumber.reset();
    this.isVehicleTrasfer = !this.isVehicleTrasfer;

    if (this.isVehicleTrasfer) this.selectedVehicleIdTypes = 1;

    if (this.isVehicleTrasfer) {
      this.landingForm.vehicleOwnerIdentityNumber.setValidators(Validators.compose([Validators.required, Validators.minLength(10)]));
    } else {
      this.landingForm.vehicleOwnerIdentityNumber.clearValidators();
    }

    this.landingForm.vehicleOwnerIdentityNumber.updateValueAndValidity();
  }
  private watchLoginState(): void {
    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
 }
  /* -------------------------------------------------------------------------- */
  /*                                API / SUBMIT                                */
  /* -------------------------------------------------------------------------- */
  getPreviousQuotationData() {
    localStorage.setItem('Disabled',  JSON.stringify(this.Disabled));

        let previousQuotationData = this.insuranceSteps.getSelectIdentity().value;
        let previousQuotationDatavehicles = this.insuranceSteps.getSelectVehicle().value;
        console.log("ssshbaabhhhh1",this.previousQuotationData  )


        if(JSON.stringify(this.previousQuotationDatavehicles.vehicles)  === "{}"  || this.previousQuotationDatavehicles.vehicles  === undefined ){
          this.DisabledForm=null;
        }
        if (Object.keys(previousQuotationData).length > 0 ) {
          this.Disabled=true;
          /* let vehicleId=String(previousQuotationDatavehicles.vehicles.vehicleId);
          let vehicleModelYear=String(previousQuotationDatavehicles.vehicles.vehicleModelYear); */
          if(previousQuotationDatavehicles.vehicles.isVehicleOwnerTransfer === true || previousQuotationDatavehicles.vehicles.isVehicleOwnerTransfer === false ){
            this.landingForm.isVehicleOwnerTransfer.setValue(previousQuotationData.vehicles.isVehicleOwnerTransfer);

          }
          else  this.landingForm.isVehicleOwnerTransfer.setValue(false)
          this.landingForm.insuredIdentityNumber.setValue(previousQuotationData.identities.identityNumber);
          this.landingForm.vehicleIdTypeId.setValue(previousQuotationDatavehicles.vehicles.vehicleIdTypeId);
          this.landingForm.vehicleId.setValue(previousQuotationDatavehicles.vehicles.vehicleId)
          this.landingForm.vehicleModelYear.setValue(previousQuotationDatavehicles.vehicles.vehicleModelYear)       

          /* for Disabled the form  */
        
        }
    
      }

  /* -------------------------------------------------------------------------- */
  /*                              rest forms                                   */
  /* -------------------------------------------------------------------------- */
  private clearForm(): void {
    this.landingFormGroup.reset();
    this.landingForm.vehicleIdTypeId.setValue(1);
    this.landingForm.isVehicleOwnerTransfer.setValue(false);
  }

    ngOnDestroy() {
    // ...
  }
}
