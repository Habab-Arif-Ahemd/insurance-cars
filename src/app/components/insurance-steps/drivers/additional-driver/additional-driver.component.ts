import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AppUtils from 'src/app/helpers/utils/AppUtils';
import DropDownValues from 'src/app/helpers/utils/DropDownValues';
import { NationalIdValidator } from 'src/app/helpers/validators/NationalIdValidator';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { Driver } from 'src/app/models/insurance-steps/Driver';
import { DriverPage } from 'src/app/models/insurance-steps/DriverPage';
import { AppService } from 'src/app/services/app/app.service';
import { DriversService } from 'src/app/services/insurance-steps/drivers.service';
import { InsuranceStepsApiService } from 'src/app/services/insurance-steps/insurance-steps-api.service';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';

@Component({
  selector: 'app-additional-driver',
  templateUrl: './additional-driver.component.html',
  styleUrls: ['./additional-driver.component.css'],
})
export class AdditionalDriverComponent implements OnInit {
  /* FORM */
  additionalDriverInfoForm: FormGroup;
  /* UI */
  showAdditionalDriverForm: boolean = false;
  termSearchFn = AppUtils.searchItemTerm;
  isErrorAlertVisible: boolean = false;
  isDrivingPercentageComplete: boolean;
  showgregoianDate: boolean = false;
  showHijriDate: boolean = false;
  isSavingDriver: boolean = false;
  hasChildren = false;
  lang: string;
  showDriverMedical: boolean = false;

  /* DATA */
  fromZeroToTen = DropDownValues.fromZeroToTen;
  additionalDriverInfoFormSubmitted: boolean;
  driverToEdit: Driver = <Driver>{};
  medicalConditions: string = '';
  errorMessage: string = '';
  violations: string = '';
  stepsData: any;
  //   to know what form doing (update or add)
  isEditingDriverInfo: boolean = false;

  constructor(
      private fb: FormBuilder,
      private insuranceSteps: InsuranceStepsService,
      private insuranceStepsApiService: InsuranceStepsApiService,
      private appService: AppService,
      private driversService: DriversService
  ) { }

  ngOnInit() {
      this.getStepData();
      // checkout if user in edit or adding new driver mode open the form and initialize it 
      if(this.driversService.getDriverPage().value === DriverPage.additonalDriverOpend) {
          this.showAdditionalDriversForm();
          // check if user is editing driver info
          this.driverToEdit = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.DriverToEdit));
          if(this.driverToEdit)  {
              this.isEditingDriverInfo = true;
              this.setPreviousValuesToEditDriver(this.driverToEdit);
          }
      }
      //Get language 
      this.appService.getAppLang().subscribe((language) => {
          this.lang = language;
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                               Initializations   && Listers                 */
  /* -------------------------------------------------------------------------- */

  initForm() {
    this.additionalDriverInfoForm = this.fb.group({
    typeId: [2],
    identityNumber: [
      "",
      Validators.compose([
        Validators.required,
        NationalIdValidator,
        Validators.minLength(10),
      ]),
    ],
    birthDateG: [null],
    birthDateH: [null],
    educationLevelId: [null, [Validators.required]],
    drivingPercentageId: [null, [Validators.required]],
    relationId: [null, [Validators.required]],
    childrenUnder16Years: [null, [Validators.required]],
    isSameInsuredAddress: [true],
    occupationId: [null],
    medicalConditions: [this.medicalConditions],
    driverViolations: [this.violations],
    driverLicenses: [''],
    /* send null */
    genderId: [null],
    firstName: [null],
    middleName: [null],
    thirdName: [null],
    lastName: [null],
    firstNameAr: [null],
    middleNameAr: [null],
    thirdNameAr: [null],
    lastNameAr: [null],
    identityIssuePlaceId: [null],
    identityNumberExpiry: [null],
    // nationalityId: [null], 
    // socialStatusId:[null]
    
   });

      this.watchIdentityNoToShowDate();
      this.watchDrivingPercentage();
      this.validateIdentityNo();
  }

  /* set in form  Value To Edit Driver*/
  setPreviousValuesToEditDriver(driverToEdit: Driver) {
      this.additionalDriverInfoForm.patchValue(driverToEdit);
  }

  // convenience getter for easy access to form fields f stand for additional driver form and df for drive license form
  get f() {
      return this.additionalDriverInfoForm.controls;
  }

  getStepData() {
      this.stepsData = this.insuranceSteps.getInsuranceStepsData().value;
  }

  private watchDrivingPercentage(): void {
      this.additionalDriverInfoForm.controls.drivingPercentageId.valueChanges.subscribe(percentage => {
        let currentDriversPercentage = this.driversService.getDriversPercentage();
        currentDriversPercentage += percentage;
        if(currentDriversPercentage > 100) {
          this.additionalDriverInfoForm.controls.drivingPercentageId.setErrors({drivingPercentageComplete: true});
        } else {
          this.additionalDriverInfoForm.controls.drivingPercentageId.setErrors(null);
        }
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Toggles                                  */
  /* -------------------------------------------------------------------------- */

  showAdditionalDriversForm() {
      this.showAdditionalDriverForm = !this.showAdditionalDriverForm;
      if (this.showAdditionalDriverForm) this.initForm();
      this.additionalDriverInfoFormSubmitted = false;
      // element.scrollIntoView();
  }

  showMedicalCondition() {
      this.showDriverMedical = !this.showDriverMedical;
      /* if user closed show medical condtion quottion remove all saved values */
      if(!this.showDriverMedical) {
        this.f.MedicalConditions.setValue('');
      }
  }

  showViolations() {
      // this.isViolationCheckboxEmpty = false;
  }

  cancelAddingDriver() {
      /* clear the arrays */
      this.violations = '';
      this.medicalConditions = '';
      /* close the toggle */
      this.showAdditionalDriverForm = !this.showAdditionalDriverForm;
  }

  submitForm() {
      console.log('submitted');
      this.additionalDriverInfoFormSubmitted = true;
      if (this.additionalDriverInfoForm.invalid) {
          this.additionalDriverInfoForm.markAllAsTouched();
          return;
      }
      this.isSavingDriver = true;
      // this.additionalDriverInfoForm.value.driverSaved = true;
      // Get driver
      let driverInfo: Driver = this.additionalDriverInfoForm.value;
      driverInfo.identityNumber = parseInt(
          this.additionalDriverInfoForm.value.identityNumber
      );
      const tempDrivers: Driver[] = [];
      tempDrivers.push(driverInfo);
      this.insuranceStepsApiService.setUserQuoteReqDrivers(tempDrivers).subscribe((res: any) => {
         
          let tempDrivers: Driver[] = [];
          tempDrivers.push(res.driver);
          this.driversService.saveAdditionalDriver(tempDrivers);
          // remove old driver inforamation before edit
          if(this.isEditingDriverInfo) {
              localStorage.removeItem(LocallyStoredItemsKeys.DriverToEdit);
              this.driversService.removeUserQuoteReqDrivers(this.driverToEdit);
          }
       }, (err)=> {

           this.isErrorAlertVisible = true;
          this.isSavingDriver = false;
          this.errorMessage = err.error.responseMessage;
 
       }, () => {
          // this.isSavingDriver = false;
          // after complete saving iniqured driver show driver list page
          this.driversService.setDriverPage(DriverPage.additonalDriverList);


       });
       
      this.clearAdditionalDriverForm();
      this.additionalDriverInfoFormSubmitted = false;
  } 

  addViolation(id: number) {
      // this.isViolationCheckboxEmpty = false;
      this.violations = AppUtils.addQuoteCheckBoxs(id, this.violations);
  }

  addMedicalCondition(id: number) {
      // this.isMedicalCheckboxEmpty = false;
      this.medicalConditions = AppUtils.addQuoteCheckBoxs(id, this.medicalConditions);
  }

  hasChil(socialStatus) {
    if (socialStatus.id !== 1) {
      this.f.childrenUnder16Years.setValidators(Validators.required);
      this.f.childrenUnder16Years.updateValueAndValidity();
    } else {
      this.f.childrenUnder16Years.setValidators(null);
      this.f.childrenUnder16Years.updateValueAndValidity();
    }
  }


  validateIdentityNo() {
      this.f.identityNumber.valueChanges.subscribe((identityNumber) => {
          if (identityNumber.length == 10) {
              identityNumber = parseInt(identityNumber);
              let currentDrivers: Driver[] = this.driversService.getUserQuoteReqDrivers().value;
              // if (currentDrivers == null) { currentDrivers = [] }
              for (var i = 0; i < currentDrivers.length; i++) {
                  if (identityNumber == currentDrivers[i].identityNumber
                      && identityNumber !== this.driverToEdit.identityNumber) {
                      /* return { duplicateNationalId: true }; */
                      this.f.identityNumber.setErrors({ duplicateNationalId: true });
                  }
              }
              return null;
          }
      });
  }

  watchIdentityNoToShowDate() {
      this.f.identityNumber.valueChanges.subscribe((identityNumber) => {
              if (
                  identityNumber.toString().startsWith('2') &&
                  identityNumber.length > 9
              ) {
                  // showing meladi date picker
                  this.showgregoianDate = true;
                  this.showHijriDate = false;
              } else if (
                  identityNumber.toString().startsWith('1') &&
                  identityNumber.length > 9
              ) {
                  this.showHijriDate = true;
                  this.showgregoianDate = false;
              } else {
                  this.showHijriDate = false;
                  this.showgregoianDate = false;
              }
          });
  }

  setBirthDateValue(date: any) {
      if(this.showgregoianDate)  this.f.birthDateG.setValue(AppUtils.formatDate(date));
      if(this.showHijriDate)  this.f.birthDateH.setValue(AppUtils.formatDate(date));
  }



  clearAdditionalDriverForm() {
      this.stepsData.violations.forEach((violation) => {
          delete violation.checked;
      });
      this.stepsData.MedicalConditions.forEach((medical) => {
          delete medical.checked;
      });
  }
}
