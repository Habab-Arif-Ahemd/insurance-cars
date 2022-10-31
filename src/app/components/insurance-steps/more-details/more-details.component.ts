import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NgFormsManager } from "@ngneat/forms-manager";
import { FormBuilder, FormGroup } from "@ngneat/reactive-forms";
import AppUtils from "src/app/helpers/utils/AppUtils";
import DropDownValues from "src/app/helpers/utils/DropDownValues";
import { ManagedForms, ManagedFormsTypes } from "src/app/models/insurance-steps/ManagedFormsTypes";
import { AppService } from "src/app/services/app/app.service";
import { InsuranceStepsService } from "src/app/services/insurance-steps/insurance-steps.service";

@Component({
   changeDetection: ChangeDetectionStrategy.Default,
   selector: "app-more-details",
   templateUrl: "./more-details.component.html",
   styleUrls: [
      "./more-details.component.css",
   ],
/*    providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
 */})

export class MoreDetailsComponent implements OnInit {
   /* DATA */
   medicalConditions: string = '';
   violations: string = '';
   driverLicense: any = [];
   stepsData;
   licenseslist = [];
   noOfYears = DropDownValues.fromZeroToTen;
   /* UI */
   showDriverLicense = false;
   showDriverViolation = false;
   showDriverMedical = false;
   driverLicenseFormSubmitted: boolean;
   lang: any;
   /* For CheckBoxes Validations */
   isMedicalCheckboxEmpty: boolean;
   isViolationCheckboxEmpty: boolean;
   isVehicleSpecificationEmpty: boolean;
 
   /* Form */
   driverMoreDetailsFormGroup: FormGroup<ManagedFormsTypes['DriversMoreDetails']>;
   driverLicenseForm: FormGroup;

  constructor(
    private insuranceSteps: InsuranceStepsService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private formsManager: NgFormsManager<ManagedFormsTypes>,
  ) { }

  ngOnInit() {
    this.initForm();
    this.appService.getAppLang().subscribe((language) => {
      this.lang = language;
    });
    this.getStepData();
  }

  initForm() {
    this.driverMoreDetailsFormGroup = this.formBuilder.group({
      TypeId: [1],
      MedicalConditions: [this.medicalConditions],
      DriverViolations: [this.violations],
      DriverLicenses: [this.driverLicense],
    });
    // Add the form to the managed forms
    this.formsManager.upsert(ManagedForms.DriversMoreDetails,this.driverMoreDetailsFormGroup, { persistState: true });

    // Handle form changes
    this.formsManager.valueChanges(ManagedForms.DriversMoreDetails);
  }

  get f() {
    return this.driverMoreDetailsFormGroup.controls;
  }

  get df() {
    return this.driverLicenseForm.controls;
  }

  getStepData() {
    this.insuranceSteps.getInsuranceStepsData().subscribe((stepsData) => {
      this.stepsData = stepsData;
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                             CheckBoxes Changes                             */
  /* -------------------------------------------------------------------------- */
  addViolation(id: number) {
    this.isViolationCheckboxEmpty = false;
    this.violations = AppUtils.addQuoteCheckBoxs(id, this.violations);
    this.f.DriverViolations.setValue(this.violations);
  }

  addMedicalCondition(id: number) {
    this.isMedicalCheckboxEmpty = false;
    // this.driverMoreDetailsFormGroup.get("medicalConditions").setErrors(null);
    console.log(id);
    this.medicalConditions = AppUtils.addQuoteCheckBoxs(id, this.medicalConditions);
    this.f.MedicalConditions.setValue(this.medicalConditions);
  }


  showMedicalConditions() {
    this.showDriverMedical = !this.showDriverMedical;
    /* if user closed show medical condtion quottion remove all saved values */
    if(!this.showDriverMedical) {
      this.f.MedicalConditions.setValue('');
    }
    this.isMedicalCheckboxEmpty = false;
  }

  showViolations() {
    this.showDriverViolation = !this.showDriverViolation;
    if(!this.showDriverViolation) {
      this.f.DriverViolations.setValue('');
    }
    this.isViolationCheckboxEmpty = false;
  }
}
