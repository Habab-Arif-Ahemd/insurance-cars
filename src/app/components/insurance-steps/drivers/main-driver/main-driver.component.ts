import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgFormsManager } from '@ngneat/forms-manager';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { filter } from 'rxjs/operators';
import AppUtils from 'src/app/helpers/utils/AppUtils';
import DropDownValues from 'src/app/helpers/utils/DropDownValues';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import {
  ManagedForms,
  ManagedFormsTypes
} from 'src/app/models/insurance-steps/ManagedFormsTypes';
import { AppService } from 'src/app/services/app/app.service';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';

@Component({
  selector: 'app-main-driver',
  templateUrl: './main-driver.component.html',
  styleUrls: ['./main-driver.component.css'],
})
export class MainDriverComponent implements OnInit {
  /* Form */
  landingFormGroup: FormGroup<ManagedFormsTypes['LandingForm']>;

  mainDriverFormGroup: FormGroup<ManagedFormsTypes['MainDriverInsuranceForm']>;
  /* DATA  */
  inputrequestFromProfile: any = false;



  requestFromProfile: any = false;
  quoteFromProfile: any;
  showHijriDate: boolean = false;
  showgregoianDate: boolean = false;
  showValidation:boolean=false
  stepsData: any;
  fromZeroToTen: any[] = DropDownValues.fromZeroToTen;
  IdentityNumber: number;
  policyEffectiveDate:number;
  /* UI */
  termSearchFn = AppUtils.searchItemTerm;
  submitted;
  lang: string;
  isLoadingQuotes: boolean;

  constructor(
    private formsManager: NgFormsManager<ManagedFormsTypes>,
    private fb: FormBuilder,
    private appService: AppService,
    private insuranceSteps: InsuranceStepsService,
    private router: Router,
    private cd:ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.getDriverId();
    this.initForm();
    this.changeInputFromProfile();
    this.appService.getAppLang().subscribe((lang) => (this.lang = lang));
    this.watchIdentityNoToshowDate();
    this.setBirthDateToLocalStorage()
    this.getPreviousBirthDate();
    this.getPreviousQuotationData();

  }
  ngOnChanges() {
    this.cd.detectChanges();
    this.setBirthDateToLocalStorage()

    this.getPreviousBirthDate();

  }

  /* -------------------------------------------------------------------------- */
  /*                                  init Form                                 */
  /* -------------------------------------------------------------------------- */
  initForm() {
    this.mainDriverFormGroup = this.fb.group({
      typeId: [1],
      identityNumber: [null],
      // if showGorgian is true set birthdate to birtDateG
      birthDateG: [null],
      birthDateH: [null],
      educationLevelId: [3, [Validators.required]],
      drivingPercentageId: [25, [Validators.required]],
      childrenUnder16Years: [0],
      occupationId: [null, [Validators.required]],
    });

    //! TODO: Remove persisState from each form
    // Add the form to the managed forms
    this.formsManager.upsert(
      ManagedForms.MainDriverInsuranceForm,
      this.mainDriverFormGroup,
      { persistState: true }
    );
    this.getStepData();

  }
  private clearForm(): void {
    this.mainDriverFormGroup.reset();
  }
  /* -------------------------------------------------------------------------- */
  /*                               init Datepicker                              */
  /* -------------------------------------------------------------------------- */

  setBirthDateValue(date: any) {
    if (this.showgregoianDate)
      this.f.birthDateG.setValue(AppUtils.formatDate(date));
    if (this.showHijriDate)
      this.f.birthDateH.setValue(AppUtils.formatDate(date));
  }
  setBirthDateToLocalStorage(){

    let previousQuotationData = this.insuranceSteps.getSelectIdentity().value;

    if (this.f.identityNumber.toString().startsWith('2')) {


      return localStorage.setItem("birthDate",previousQuotationData.identities.birthDate);

    } else {


      return localStorage.setItem("birthDateH",previousQuotationData.identities.birthDateH);

    } }
    getPreviousBirthDate():string {

      this.quoteFromProfile = localStorage.getItem('QuoteFromProfile')
  
  
  
      if(this.quoteFromProfile){
  
      if (this.f.identityNumber.toString().startsWith('2')) {
  
        this.showgregoianDate = true;
        this.showHijriDate = false;

        return localStorage.getItem("birthDate");
  
      } else {
  
        this.showHijriDate = true;
        this.showgregoianDate = false;

        return localStorage.getItem("birthDateH");
  
      }
  
    } else {
  
      localStorage.removeItem("birthDateH")
  
    }
  
  
  
    }
  get f() {
    return this.mainDriverFormGroup.controls;
  }

  getStepData() {
    this.insuranceSteps.getInsuranceStepsData().subscribe((stepsData) => {
      this.stepsData = stepsData;
    });
  }

  showVehicleForm() {
    let formsData = JSON.parse( localStorage.getItem(LocallyStoredItemsKeys.FormManager));
    let policyEffectiveDatee: string= formsData.LandingForm.value.policyEffectiveDate;
    if(policyEffectiveDatee ){
      this.isLoadingQuotes = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigateByUrl('request/vehicle-info');
    }
    else(
      this.showValidation=true
    )
  }

  hasChildren(socialStatus) {
    if (socialStatus.id !== 1) {
      this.f.childrenUnder16Years.setValidators(Validators.required);
      this.f.childrenUnder16Years.updateValueAndValidity();
    } else {
      this.f.childrenUnder16Years.setValidators(null);
      this.f.childrenUnder16Years.updateValueAndValidity();
    }
  }
  // get main driver from localStorage
  getDriverId() {
    this.IdentityNumber = parseInt(
      JSON.parse(localStorage.getItem('ngFormsManager')).LandingForm.value
        .insuredIdentityNumber
    );
  }



  watchIdentityNoToshowDate() {
    
    let formsData = JSON.parse(
      localStorage.getItem(LocallyStoredItemsKeys.FormManager)
    );
   
      let insuredIdentityNumber: number = parseInt(formsData.LandingForm.value.insuredIdentityNumber);
      if (insuredIdentityNumber) {
  
        this.f.identityNumber.setValue(insuredIdentityNumber);
      }
      if (insuredIdentityNumber.toString().startsWith('2')) {
        this.showgregoianDate = true;
        this.showHijriDate = false;

        this.f.birthDateG.setValidators([Validators.required]);
        this.f.birthDateG.updateValueAndValidity();
      } else {
        this.showHijriDate = true;
        this.showgregoianDate = false;

        this.f.birthDateH.setValidators([Validators.required]);
        this.f.birthDateH.updateValueAndValidity();
      }
   


  
  }

  changeInputFromProfile() {
    this.quoteFromProfile = localStorage.getItem('QuoteFromProfile')
    if (this.quoteFromProfile) this.quoteFromProfile.toLowerCase();




    
  }

  /* for landing form */
  getPreviousQuotationData() {
/*     this.clearForm();
 */
    let previousQuotationData = this.insuranceSteps.getSelectIdentity().value;
    console.log("akram",previousQuotationData)
    if (Object.keys(previousQuotationData).length > 0) {
      this.f.identityNumber.setValue(previousQuotationData.identities.identityNumber);
      this.f.educationLevelId.setValue(previousQuotationData.identities.educationLevelId);
      this.f.occupationId.setValue(previousQuotationData.identities.occupationId);
      this.f.childrenUnder16Years.setValue(previousQuotationData.identities.childrenUnder16Years)
      console.log("previousQuotationData.identities.birthDate",previousQuotationData.identities.birthDateH)



    }

  }
  
}
