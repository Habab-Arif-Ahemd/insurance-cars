import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgFormsManager } from '@ngneat/forms-manager';
import {
  AbstractControl,
  FormBuilder,
  FormGroup
} from '@ngneat/reactive-forms';
import AppUtils from 'src/app/helpers/utils/AppUtils';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { ErrorPageTypes } from 'src/app/models/app/ErrorPageTypes';
import { LoadingPageTypes } from 'src/app/models/app/LoadingPageTypes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import {
  ManagedForms,
  ManagedFormsTypes
} from 'src/app/models/insurance-steps/ManagedFormsTypes';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { AppService } from 'src/app/services/app/app.service';
import { InsuranceStepsApiService } from 'src/app/services/insurance-steps/insurance-steps-api.service';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';
import { ErrorService } from './../../../services/app/error.service';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css'],
})
export class VehicleInfoComponent implements OnInit {
  estimatedVehicleValueMessage: string;
  quoteFromProfile:any;

  private validationMesaage = {
    required: 'هذا الحقل مطلوب'/* ,
    min: 'يجب أن تكون قيمة المركبة أكبر من او تساوي 50,000', */
  };

  /* Form */
  vehicleInfoFormGroup: FormGroup<ManagedFormsTypes['VehicleInsuranceForm']>;
  /* DATA  */
  stepsData: any;
  vehicleModify: any;
  vehicleSpecification: string = '';
  yakeenMissingData: any;

  /* UI */
  termSearchFn = AppUtils.searchItemTerm;
  submitted;
  lang: string;
  driverVehicleSpecification: boolean;
  isVehicleSpecificationEmpty: boolean;

  @ViewChild('errorAlert', { read: ElementRef, static: true })
  errorAlert: ElementRef; // gets #target1
  isLoadingQuotes: boolean;
  errorMessage: string;
  validationErrors: string[];
  isErrorAlertVisible: boolean;
  nextRoute: string;
  isConfirmingIdentity: boolean;

  /* Modal */
  @ViewChild('yakeenMissingDataModal') yakeenMissingDataModal: ElementRef;
  @ViewChild('continuationModal') continuationModal: ElementRef;

  constructor(
    private formsManager: NgFormsManager<ManagedFormsTypes>,
    private fb: FormBuilder,
    private appService: AppService,
    private insuranceSteps: InsuranceStepsService,
    private insuranceStepServiceApi: InsuranceStepsApiService,
    private router: Router,
    private modalService: NgbModal,
    private errorService: ErrorService,
    private insuranceStepsService: InsuranceStepsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.appService.getAppLang().subscribe((lang) => (this.lang = lang));
    this.getPreviousQuotationData();


  }

  initForm() {
    this.vehicleInfoFormGroup = this.fb.group({
      vehicleSumInsured: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9,]*$'),

          /* Validators.min(50000), */
        ],
      ],
      vehicleUseId: [1, [Validators.required]],
      vehicleTransmissionTypeId: [2, [Validators.required]],
      vehicleParkingLocationId: [2, [Validators.required]],
      isVehicleModified: [false],
      vehicleRepairMethodId: [1, [Validators.required]],
      vehicleModificationDetails: [null],
      vehicleSpecifications: [this.vehicleSpecification],
    });
    const vehicleSumInsured =
      this.vehicleInfoFormGroup.get('vehicleSumInsured');
    vehicleSumInsured.valueChanges.subscribe((value) =>
      this.sendMessage(vehicleSumInsured)
    );
    //TODO: Remove persisState from each form
    // Add the form to the managed forms
    this.formsManager.upsert(
      ManagedForms.VehicleInsuranceForm,
      this.vehicleInfoFormGroup,
      { persistState: true }
    );
  
    this.getStepData();
/*     this.clearForm();
 */
  }
  private clearForm(): void {
    this.vehicleInfoFormGroup.reset();
  }
  sendMessage(c: AbstractControl): void {
    this.estimatedVehicleValueMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.estimatedVehicleValueMessage = Object.keys(c.errors)
        .map(
          (key) =>
            (this.estimatedVehicleValueMessage += this.validationMesaage[key])
        )
        .join('');
      console.log(this.estimatedVehicleValueMessage);
    }
  }
  get f() {
    return this.vehicleInfoFormGroup.controls;
  }

  getStepData() {
    this.insuranceSteps.getInsuranceStepsData().subscribe((stepsData) => {
      this.stepsData = stepsData;
    });
  }

  
  showVehicleSpecifications() {
    this.driverVehicleSpecification = !this.driverVehicleSpecification;
    this.isVehicleSpecificationEmpty = false;
  }

  addVehicleSpecification(id: number) {
    this.vehicleSpecification = AppUtils.addQuoteCheckBoxs(
      id,
      this.vehicleSpecification
    );
    this.f.vehicleSpecifications.setValue(this.vehicleSpecification);
  }

  hasVehicleModified(ismodifed) {
    console.log(ismodifed);
    if (ismodifed) {
      this.f.vehicleModificationDetails.setValidators(Validators.required);
      this.f.vehicleModificationDetails.updateValueAndValidity();
    } else {
      this.f.vehicleModificationDetails.clearValidators();
      this.f.vehicleModificationDetails.updateValueAndValidity();
    }
  }

  showInsuredInfo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigateByUrl('request/insured-info');
  }


  /* -------------------------------------------------------------------------- */
  /*                               USER INTERFACE                               */
  /* -------------------------------------------------------------------------- */
  openContinuationModal(modal: any) {
    // Open the modal
    this.modalService.open(modal, {
      size: 'md',
      centered: true,
      backdrop: 'static',
      beforeDismiss: () => {
        // Close the modal
        return true;
      },
    });
  }

  requestNewQuotation() {
    this.modalService.dismissAll();
    this.sendQuotesRequest();
  }

  navigateSavedQuote() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/user/previous-quotes');
  }

  async scrollToTarget(elId): Promise<any> {
    await this.delay(100);
    const el = document.getElementById(elId);
    if (el == null) {
      return;
    }
    var bodyRect = document.body.getBoundingClientRect(),
      elemRect = el.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top - 100;
    window.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  }

  /**
   * Displays an error alert with the retreived error message(s) from an API response
   * @private
   * @param apiResponse The error response that has been received from the API
   * @memberof VehicleInfoComponent
   */
  private displayErrorAlert(apiResponse: ApiResponse): void {
    // Set error message
    this.errorMessage = apiResponse.responseMessage;
    console.log(' this.validationErrors ' + apiResponse.responseMessage);

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
  }

  /* -------------------------------------------------------------------------- */
  /*                                API / SUBMIT                                */
  /* -------------------------------------------------------------------------- */

  /**
   * Check form validity status
   *
   * @private
   * @memberof VehicleInfoComponent
   */

  watchFormsBeforeSendRequest() {
    let formsStatus = this.insuranceStepsService.isValidFormManager();
    formsStatus.forEach((formsStatus, idx, array) => {
      if (!formsStatus.isValid) {
        const firstElementWithError = document.querySelector('.ng-invalid');
        if (firstElementWithError)
          firstElementWithError.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      // check if we are in last iteration valid and then we send the request
      if (idx === array.length - 1) {
        this.requestNewQuotation();
      }
    });
  }
  sendQuotesRequest(quotationRequest?): void {
    // close confilrmation email component

    this.isConfirmingIdentity = false;
    // Set active loading type to quotation request/retrieval
    this.appService.setActiveLoadingPageType(LoadingPageTypes.QuotationLoading);

    // Display loading
    this.isLoadingQuotes = true;

    // Fetch the quotes list
    this.insuranceStepServiceApi.getQuotationList().subscribe(
      (res: any) => {
        // Set active loading type to undefine to iniazlize the 
        this.appService.setActiveLoadingPageType(undefined);
        // Stop loading
        this.isLoadingQuotes = false;
        localStorage.removeItem(LocallyStoredItemsKeys.UserQuoteRequest);
       window.scrollTo({ top: 0, behavior: 'smooth' });

      },
      (err) => {
        // Set active loading type to undefine to iniazlize the 
        this.appService.setActiveLoadingPageType(undefined);
        // Stop loading
        this.isLoadingQuotes = false;

        if (err.error.statusCode == StatusCodes.QuotatationSavedBefore) {
          this.openContinuationModal(this.continuationModal);
        } else if (   
        (err.error.statusCode == StatusCodes.DriverNotFound) ||
        (err.error.statusCode == StatusCodes.AdditionalDriverNotFound) ||
        (err.error.statusCode == StatusCodes.QueryAccindentFaild) ||
        (err.error.statusCode == StatusCodes.QueryAdressFaild) ||
        (err.error.statusCode == StatusCodes.AvoidMultiClientRegistration) ||
        (err.error.statusCode == StatusCodes.InvalidInputValidation) 

        ) {
          // Scroll to the top of the page
          this.scrollToTarget('errorAlert');
          this.displayErrorAlert(err.error);
        } else if (err.error.statusCode == StatusCodes.YakeenMissisngData) {
          this.isLoadingQuotes = false;
          this.yakeenMissingData = err.error;
          console.log('yakeenMissingData' + this.yakeenMissingData);
          this.openYakeenMissingDataModal(this.yakeenMissingDataModal);
        } else {
          // Navigate to unavailable quotations error page
          this.errorService.setActiveErrorPageType(
            ErrorPageTypes.QuotationsUnavailable
          );
          this.router.navigate([AppRoutes.error]);
        }
      }
    );
  }

  openYakeenMissingDataModal(yakeenMissingDataModal: any) {
    // Open the modal
    this.modalService.open(yakeenMissingDataModal, {
      size: 'md',
      centered: true,
      animation: true,
      backdrop: 'static',
      beforeDismiss: () => {
        // Close the modal
        return true;
      },
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  changeInputFromProfile() {
    this.quoteFromProfile = localStorage.getItem('QuoteFromProfile')
    if (this.quoteFromProfile) this.quoteFromProfile.toLowerCase();

    console.log( this.quoteFromProfile)
 } 

    /* for landing form */
    getPreviousQuotationData() {
   
      let previousQuotationData = this.insuranceSteps.getSelectVehicle().value;

      if (Object.keys(previousQuotationData).length > 0) {
        this.clearForm();
        this.f.vehicleSumInsured.setValue(previousQuotationData.vehicles.vehicleSumInsured);
        this.f.vehicleUseId.setValue(previousQuotationData.vehicles.vehicleUseId);
        if(previousQuotationData.vehicles.isVehicleModified === true || previousQuotationData.vehicles.isVehicleModified === false ){
          this.f.isVehicleModified.setValue(previousQuotationData.vehicles.isVehicleModified);} else this.f.isVehicleModified.setValue(false)
/*         this.f.isVehicleModified.setValue(previousQuotationData.vehicles.isVehicleModified)
 */     this.f.vehicleParkingLocationId.setValue(previousQuotationData.vehicles.vehicleParkingLocationId)
        this.f.vehicleTransmissionTypeId.setValue(previousQuotationData.vehicles.vehicleTransmissionTypeId)
        this.f.vehicleRepairMethodId.setValue(parseInt(previousQuotationData.vehicles.vehicleRepairMethodId))
        this.f.vehicleSpecifications.setValue(previousQuotationData.vehicles.vehicleSpecifications)
        this.f.vehicleParkingLocationId.setValue(2)
      }else{
        this.f.vehicleSumInsured.setValue(null);

      }

    }
    
}
