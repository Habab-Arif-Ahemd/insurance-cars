import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import AppUtils from 'src/app/helpers/utils/AppUtils';
import { AppService } from 'src/app/services/app/app.service';
import { InsuranceStepsApiService } from 'src/app/services/insurance-steps/insurance-steps-api.service';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';

@Component({
  selector: 'app-yakeen-missing-info',
  templateUrl: './yakeen-missing-info.component.html',
  styleUrls: ['./yakeen-missing-info.component.css'],
})
export class YakeenMissingInfoComponent implements OnInit {
  @Output() yakeenFormSubmitted = new EventEmitter();
  @Input() yakeenMissingData: any;
  isErrorAlertVisible: boolean = true;
  isLoading: boolean = false;
  yakeenInfoFormGroup: FormGroup;
  vehicleMakeStepData: any[];
  vehicleModelStepData: any[] = [];

  /* UI */
  termSearchFn = AppUtils.searchItemTerm;

  lang: string;
  submitted: boolean = false;
  errorMessage: string;
  validationErrors: string[];

  constructor(
    private insuranceStepsApi: InsuranceStepsApiService,
    private insuranceStepsService: InsuranceStepsService,
    private fb: FormBuilder,
    private appService: AppService,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getStepData();
    this.initForm();
    this.watchVehicleMakeToGetModel();
  }

  initForm() {
    // initialize empty form group
    this.yakeenInfoFormGroup = this.fb.group({});
    // construct missing info from quotation response and create form control depend on missing info response
    this.yakeenMissingData?.data.forEach((yakeenMissing) => {
      this.yakeenInfoFormGroup.addControl(
        yakeenMissing.key,
        this.fb.control(null, [Validators.required])
      );
    });
    this.yakeenMissingData?.data.forEach((yakeenMissing) => {
      this.checkFormControlExistence(yakeenMissing.key);
    });

    this.appService.getAppLang().subscribe((language) => {
      this.lang = language;
    });
  }

  get f() {
    return this.yakeenInfoFormGroup.controls;
  }

  /* checks if there is any enabled control for the specified control name in that FormGroup */
  checkFormControlExistence(formControlName: string): boolean {
    return this.yakeenInfoFormGroup.contains(formControlName);
  }

  watchVehicleMakeToGetModel() {
    this.yakeenMissingData?.data.forEach((yakeenMissing) => {
      if (yakeenMissing.key === 'Make' && yakeenMissing.value !== null) {
        // get vehicle models from existing vehicle models
        this.insuranceStepsApi
          .getVehicleModal(yakeenMissing.value)
          .subscribe((vehicleModels) => {
            this.vehicleModelStepData = vehicleModels;
          });
        // set existing vehicle make value

        this.f.Make.setValue(parseInt(yakeenMissing.value));
      } else if (yakeenMissing.key === 'Make' && yakeenMissing.value == null) {
        this.f.Make.valueChanges.subscribe((makeId) => {
          this.insuranceStepsApi
            .getVehicleModal(makeId)
            .subscribe((vehicleModels) => {
              this.vehicleModelStepData = vehicleModels;
            });
        });
      }
    });
  }

  submitForm() {
    if (this.yakeenInfoFormGroup.invalid) {
      return;
    }

    // construct yakeen missing info array
    let tempMissingInfo: any[] = [];

    for (var key of Object.keys(this.yakeenInfoFormGroup.value)) {
      tempMissingInfo.push({
        key: key,
        value: this.yakeenInfoFormGroup.value[key].toString(),
      });
    }
    // Save the  yakeen missing info on local storage
    localStorage.setItem('yakeenInfoForm', JSON.stringify(tempMissingInfo));
    // close the model
    this.modalService.dismissAll();
    // back to quotation request page and concat yakeen missing info with existing qutation request
    this.yakeenFormSubmitted.emit(this.yakeenInfoFormGroup.value);
  }

  getStepData() {
    this.insuranceStepsApi.getMissingYakeenStepsData();
    this.insuranceStepsService
      .getInsuranceStepsData()
      .subscribe((stepsData: any) => {
        this.vehicleMakeStepData = stepsData.VehicleMakers;
      });
  }
}
