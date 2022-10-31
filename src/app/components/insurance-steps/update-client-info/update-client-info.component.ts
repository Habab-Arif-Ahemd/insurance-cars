import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { QuoteRequest } from "src/app/models/insurance-steps/QuoteRequest";
import { AuthService } from "src/app/services/auth/auth.service";
import { InsuranceStepsService } from "src/app/services/insurance-steps/insurance-steps.service";

@Component({
  selector: 'app-update-client-info',
  templateUrl: './update-client-info.component.html',
  styleUrls: ['./update-client-info.component.css']
})
export class UpdateClientInfoComponent implements OnInit {
  @Output() sendQuotesRequest = new EventEmitter();
  @Output() backToForms = new EventEmitter();
  confirmIdentityForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private insuranceStepService: InsuranceStepsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.initForm();
  }

  initForm() {
    this.confirmIdentityForm = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
        ]),
      ],
      phoneNumber: ["", [Validators.required]],
    });

    this.setPrivousClientEmail();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.confirmIdentityForm.controls;
  }

  setPrivousClientEmail() {
   /*  if (this.insuranceStepService.getUserQuoteRequest().value.email) {
      this.f.email.setValue(
        this.insuranceStepService.getUserQuoteRequest().value.email
      );
      this.f.phoneNumber.setValue(
        this.insuranceStepService
          .getUserQuoteRequest()
          .value.phoneNumber.replace("966", "")
      );
    } else {
      this.f.email.setValue(this.authService.getDecodedToken().sub);
      this.f.phoneNumber.setValue(
        this.authService.getDecodedToken().tel.replace("966", "")
      );
    } */
  }

  submitConfirmEmail() {
    this.confirmIdentityForm.value.phoneNumber =
      "966" + this.confirmIdentityForm.value.phoneNumber;
    const confirmEmailInfo: QuoteRequest = this.confirmIdentityForm.value;
    // this.insuranceStepService.setUserQuoteRequest(confirmEmailInfo);
    this.sendQuotesRequest.emit();
  }
}
