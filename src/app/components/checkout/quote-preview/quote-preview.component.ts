import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import AppUtils from 'src/app/helpers/utils/AppUtils';
import CheckoutUtils from 'src/app/helpers/utils/CheckoutUtils';
import { IbanValidator } from 'src/app/helpers/validators/IbanValidator';
import { phoneNumberValidator } from 'src/app/helpers/validators/phoneNumberValidator';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import BanksIds from 'src/app/models/checkout/BanksIds';
import { CheckoutIdRequest } from 'src/app/models/checkout/CheckoutIdRequest';
import { CheckoutReturnState } from 'src/app/models/checkout/CheckoutReturnState';
import { PolicyPurchase } from 'src/app/models/checkout/PolicyPurchase';
import { Benefit } from 'src/app/models/quote/Benefit';
import { PremiumBreakDown } from 'src/app/models/quote/PremiumBreakDown';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { PreviewQuoteResponse } from 'src/app/payload/responses/quotes/PreviewQuoteResponse';
import { AppService } from 'src/app/services/app/app.service';
import { OrderReviewService } from 'src/app/services/checkout/order-review.service';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { environment } from 'src/environments/environment';
import { Product } from '../../../models/quote/Product';
import { Quote } from '../../../models/quote/Quote';
declare const hyperpayModule: any;

@Component({
   selector: 'app-quote-preview',
   templateUrl: './quote-preview.component.html',
   styleUrls: ['./quote-preview.component.css']
})
export class QuotePreviewComponent implements OnInit {
   @ViewChild('paymentbox', { static: true }) paymentBox: ElementRef;

   /* External */
   @Input() quoteProduct?: Product;

   /* DATA */
   paymentResultPageUrl: string = AppRoutes.MotorRoutes.request + "/checkout/" + AppRoutes.MotorRoutes.paymentStatus;

   orderedQuote: PreviewQuoteResponse;
   amountDetails: any[] = [];
   amountDetailsAlrajhi: any[] = [];
   purchaseRequest: PolicyPurchase;
   vehicleLogoSrc: string;
   companyLogoSrc: string;
   ibanBankLogoSrc: string;
   tempBankCode: string;
   checkoutResponse: any;
   referenceId: string;
   endDate: string;
   returnState: CheckoutReturnState = {} as CheckoutReturnState;

   result: any[] = [];
   /* UI */
   isDataAccordionShown = false;
   viewPaymentCard: boolean=false;
   isLoadingPaymentCard: boolean;

   lang;
   isContinuationModalDisplayed = false;
   togglePaymentMethod: boolean = false;
   isBankLogoLoading: boolean;
   isEnteredIbanValid = false;
   isLoading = false;
   hasScrolledBanner: boolean = false;

   /* FORM */
   checkoutDetailsFormGroup: FormGroup;

   /* Alert */
   errorMessage;
   successMessage;
   isErrorAlertVisible;
   saveQuoteError;
   isSuccessAlertVisible;
   isWarningVisible;
   validationErrors: string[];
   alert: boolean = false
/* payment */
selectedPaymentBrand = 'VISA'; // Visa is selected by default
isCardPaymentFormVisible = true;
isCardPaymentFormLoading = false;
isInvalidFileAlertDisplayed = false;checkoutId: string;


   constructor(
      private modalService: NgbModal,
      private appService: AppService,
      private quoteService: QuoteService,
      private orderService: OrderReviewService,
      private formBuilder: FormBuilder,
      private renderer: Renderer2,
      private el: ElementRef,
      private router: Router,
   ) { }

   ngOnInit(): void {
      this.getPreviewQuote();
      this.initForms()
      this.appService.getAppLang().subscribe(appLang => (this.lang = appLang));
      this.watchIbanInputCompletion();
      this.quoteProduct = this.orderedQuote.quoteInfo.products[0];
      this.referenceId = this.orderedQuote.quoteInfo.requestReferenceId;
      this.endDate = this.orderedQuote.quoteInfo.quotationEndDate;
      this.sortAmountDetails();
      window.scroll({ top: 0 })
      // this.checkPhoneNumber();
      console.log("test")
   }

   // Window scroll events
   @HostListener("window:scroll", ["$event"])
   onScroll(event) {
      if (window.pageYOffset > 50)
         this.hasScrolledBanner = true;
      else this.hasScrolledBanner = false;
   }

   /**
        * Initializes the IBAN form
        *
        * @private
        * @memberof QuotePreviewComponent
        */
   private initForms() {
      this.checkoutDetailsFormGroup = this.formBuilder.group({
         emailCtrl: [
            this.orderedQuote.insuredInfo.email,
            Validators.compose([
               Validators.required,
               Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
            ]),
         ],

         phoneNumberCtrl: [
            this.orderedQuote.insuredInfo.phoneNumber,
            Validators.compose([Validators.required, Validators.minLength(9)]),
         ],
         ibanCtrl: ['SA', Validators.compose([Validators.required, IbanValidator])],
      },
         { validator: phoneNumberValidator });
   }

   /* -------------------------------------------------------------------------- */
   /*                       Sort Amount Details in checkout                      */
   /* -------------------------------------------------------------------------- */
   sortAmountDetails() {

      let valueAddedTax
      let annualPremium
      let extraBenefits: Benefit[] = this.quoteProduct.benefits.filter(benefit => benefit.benefitTypeId == 1);
      let accidentsPremium: PremiumBreakDown = this.quoteProduct.deductibles[0].premiumBreakdowns.filter(pre => pre.breakdownTypeId == 4)[0];
 
         valueAddedTax = this.quoteProduct.deductibles[0].premiumBreakdowns.filter(pre => pre.breakdownTypeId == 5)[0];
         annualPremium = this.quoteProduct.deductibles[0].premiumBreakdowns.filter(pre => pre.breakdownTypeId == 6)[0];
      
      extraBenefits?.forEach(benefit => {
         this.amountDetails?.push({
            name: benefit.name,
            nameAr: benefit.nameAr,
            price: benefit.benefitAmount
         });
      });
      // تحميل إضافي بسبب الحوادث طوكيو مارين
      // if (accidentsPremium) this.amountDetails?.push({
      //    name: accidentsPremium.name,
      //    nameAr: accidentsPremium.nameAr,
      //    price: accidentsPremium.breakdownAmount
      // })
      if (annualPremium ) this.amountDetails?.push({
         name: "Premium",
         nameAr: "القسط الأساسي",
         price: annualPremium.breakdownAmount,
         underLine: true,
         bold: true
      })
      if(this.orderedQuote.quoteInfo.insuranceCompany.id ){
      this.amountDetails?.push({
         name: "Total Premium",
         nameAr: "إجمالي المبلغ",
         price: this.quoteProduct.deductibles[0].totalAdditionalBenefits + annualPremium.breakdownAmount,
         bold: true
      })
      this.amountDetails?.push({
         name: valueAddedTax.name + " (15%) ",
         nameAr: valueAddedTax.nameAr + " (15%)",
         price: valueAddedTax.breakdownAmount
      });}
      this.amountDetails?.push({
         name: "Total Price with added TAX",
         nameAr: "إجمالي المبلغ شامل الضريبة",
         price: this.quoteProduct.deductibles[0].policyPremium,
         bold: true
      });

      console.log('BENEFITS', this.amountDetails)
   }

   // Check phone number starting with five

   // private checkPhoneNumber(): void {
   //    this.checkoutDetailsFormGroup.controls.phoneNumberCtrl.valueChanges.subscribe(
   //       (value) => {
   //          if (value.toString().startsWith('5') && value.minLength(9) && value.required) {
   //             this.checkoutDetailsFormGroup.controls.phoneNumberCtrl.setErrors(null)
   //          } else {
   //             this.checkoutDetailsFormGroup.controls.phoneNumberCtrl.setErrors({ phoneNumberIsNotStartWithFive: true });
   //          }
   //       }
   //    )
   // }

   /**
    * Returns the IBAN form group controls
    *
    * @readonly
    * @type {*}
    * @memberof QuotePreviewComponent
    */
   get checkoutForm(): any { return this.checkoutDetailsFormGroup.controls; }


   /**
   * Retrieves the preview quote / checkout data
   *
   * @private
   * @memberof QuotePreviewComponent
   */
   private getPreviewQuote(): void {

      this.orderedQuote = this.quoteService.getPreviewQuote();
      console.log('Ordererd Quote:', this.orderedQuote);

      this.orderedQuote.quoteInfo = this.orderedQuote.quoteInfo;
      // Sort driver array to start with main driver
      this.orderedQuote.vehicleDrivers.sort((a, b) => (a.typeId > b.typeId) ? 1 : -1);
      // this.orderedQuote.quoteInfo.isSelectedForOrdering = true;

      // Set the user's vehicle model logo source
      if (this.orderedQuote.vehicleInfo.makerLogo) {
         this.vehicleLogoSrc = environment.apiAssetsUrl + this.orderedQuote.vehicleInfo.makerLogo;
      }

      // set company logo
      if (this.orderedQuote.quoteInfo.insuranceCompany.logo) {
         this.companyLogoSrc = environment.apiAssetsUrl + this.orderedQuote.quoteInfo.insuranceCompany.logo;
      }

      // this.checkoutForm.emailCtrl.setValue(this.orderedQuote.insuredInfo.email);
      // this.checkoutForm.phoneNumberCtrl.setValue(this.orderedQuote.insuredInfo.phoneNumber);
   }

   openContinuationModal(modal: any) {
      // If closed
      if (!this.isContinuationModalDisplayed) {
         // Open the modal
         this.modalService.open(modal, {
            size: 'md',
            centered: true,
            beforeDismiss: () => {
               // Switch flag when dissmissed to uncheck the checkbox
               this.isContinuationModalDisplayed = false;
               // Close the modal
               return true;
            }
         });
         // Set flag to check the checkbox
         this.isContinuationModalDisplayed = true;
      }
   }


   getCompanyLogo(): string {
      return environment.apiAssetsUrl + "IC/" + this.orderedQuote.quoteInfo.insuranceCompany.logo;
   }

   // Save Quotes
   saveQuote() {

      let savedQuoteRequest = CheckoutUtils.constructCheckoutRequest(this.orderedQuote);
      savedQuoteRequest = Object.assign(savedQuoteRequest, {
         clientId: this.orderedQuote.insuredInfo.clientId
      })
      console.log(savedQuoteRequest);
      this.orderService.saveQuote(savedQuoteRequest).subscribe((res: any) => {
         this.checkoutResponse = res;
         if (res.isSuccess) {
            this.isSuccessAlertVisible = true;
            setTimeout(() => this.isSuccessAlertVisible = false, 4000);
            this.displayAlert('SuccessAlert', res);
            this.modalService.dismissAll()
         }
         console.log('SUCCESS', this.isSuccessAlertVisible);
         // this.renderPaymentform();

      },
         err => {
            this.saveQuoteError = true;
            setTimeout(() => this.saveQuoteError = false, 4000);
            this.displayAlert('ErrorAlert', err.error);
            this.modalService.dismissAll()
         }
      )
   }

   /**
   * Gets the entered IBAN and displays the bank based on it
   * @param event The IBAN input field event
   * @memberof QuotePreviewComponent
   */

   async setIbanBank(event) {
      // Apply IBAN mask (space every 4 characters)
      var target = event.target, position = target.selectionEnd, length = target.value.length;
      target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
      target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
      // Get input value
      let input: string = event.target.value.replace(" ", "");
      // Get bank code
      let bankCode = input[4] + input[5];
      // Check if entered code is different from previous code
      if (input.length >= 6 && this.checkoutDetailsFormGroup.valid && bankCode != this.tempBankCode) {
         // Update the value of the temp/previous entered code and set it to current
         this.tempBankCode = bankCode;
         console.log('worked' + this.tempBankCode);
         // Set the logo image src
         this.ibanBankLogoSrc = '../../../assets/img/banks-logos-codes/' + bankCode + '.png';
         // Display loader
         this.isBankLogoLoading = true;
         console.log(true);
         // 1 sec of loading
         await AppUtils.delay(1000);
         // Conceal loader
         this.isBankLogoLoading = false;
      }
   }
   /**
      * Prevents the user from deleting the IBAN country code "SA"
      *
      * @param {*} event The IBAN input keydown event
      * @memberof QuotePreviewComponent
      */
   onIbanKeydown(event): void {
      var key = event.keyCode || event.charCode;
      if ((key == 8 || key == 46) && event.target.value.length <= 2) {
         event.preventDefault();
      }
   }


   /**
    * Displays an alert with the retreived message(s) from an API response
    * @private
    * @param {('ErrorAlert' | 'SuccessAlert')} alertType Specifies the alert type of Success or Error
    * @param {string} message The message to be displayed on the alert
    * @memberof AuthenticationPageComponent
    */

   private displayAlert(alertType: 'ErrorAlert' | 'SuccessAlert', apiResponse: ApiResponse): void {
      // Set error message
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

            break;
         case 'SuccessAlert':

            // Set the success message
            this.successMessage = apiResponse.responseMessage;

            // Display alert
            // this.isSuccessAlertVisible = true;

            // Hide after timeout
            // setTimeout(() => this.isSuccessAlertVisible = false, 4000);

            break;
         default: break;
      }
      // Display alert
      // this.isSuccessAlertVisible = true;
   }

   //  Display purchase Warnings
   private displayWarning(apiResponse: ApiResponse): void {
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

      //Display Warning
      this.isWarningVisible = true;
      // setTimeout(() => this.isWarningVisible = false, 20000);
   }
   /**
    * Waits until user finishes typing the IBAN and then sends the checkoutID retrieval request
    *
    * @private
    * @memberof QuotePreviewComponent
    */
   private watchIbanInputCompletion(): void {
      let ibanCtrl = this.checkoutDetailsFormGroup.get('ibanCtrl');
      ibanCtrl.statusChanges.subscribe(status => {
         if (status === 'VALID') {
            this.isEnteredIbanValid = true;
            // Send the checkout ID retreival request
            // this.initCheckoutRequest();
            // Add the IBAN to the return state object
            // this.returnState.iban = ibanCtrl.value;
         }
      });
   }


   orderPayment(isCreditCard: boolean) {
      console.log("togglePaymentMethod", this.togglePaymentMethod);
      for (const key of Object.keys(this.checkoutDetailsFormGroup.controls)) {
         if (this.checkoutDetailsFormGroup.controls[key].invalid) {
            const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
            this.checkoutDetailsFormGroup.markAllAsTouched();
            return;
         }
      }

      this.togglePaymentMethod = isCreditCard;
      if (this.togglePaymentMethod) {
         this.isLoadingPaymentCard = true;
         console.log("togglePaymentMethod", this.togglePaymentMethod);
         // setTimeout(() => { this.isLoadingPaymentCard = false; }, 3000);
         let enteredIban = this.checkoutForm.ibanCtrl.value.replace(" ", "");
         let bankCode = parseInt(enteredIban[4] + enteredIban[5]);
         let bankId = BanksIds.banks.filter(bank => bank.code == bankCode)[0].id;
         let checkoutRequest = CheckoutUtils.constructCheckoutRequest(this.orderedQuote);
         console.log(checkoutRequest);
         checkoutRequest = Object.assign(checkoutRequest, {
            paymentMethodId: 1,
            clientId: this.orderedQuote.insuredInfo.clientId,
            iban: enteredIban.replace(/ /g, ""),
            bankId: bankId,
            bankCode: bankCode,
            email: this.checkoutForm.emailCtrl.value,
            phoneNumber: this.checkoutForm.phoneNumberCtrl.value,
         })
        
         console.log(checkoutRequest);


         let previousContactDetails = { email: this.orderedQuote.insuredInfo.clientId, phoneNumber: this.orderedQuote.insuredInfo.phoneNumber };
         let currentContactDetails = { email: this.checkoutForm.emailCtrl.value, phoneNumber: this.checkoutForm.phoneNumberCtrl.value };

         JSON.stringify(previousContactDetails) === JSON.stringify(currentContactDetails) ?
            checkoutRequest.isContactUpdated = true : checkoutRequest.isContactUpdated = true;
         this.orderService.getPaymentCard(checkoutRequest).subscribe((res: any) => {
            this.checkoutId =res.data.checkoutJsUrl
            this.checkoutResponse = res;
            console.log("this.checkoutResponse = res.pgReferenceId; " , res.data.checkoutJsUrl)
            console.log("this.checkoutResponse = res; ", res)
            this.renderPaymentform();
         },
            err => {
               this.isLoadingPaymentCard = true;
               setTimeout(() => { this.isLoadingPaymentCard = false; }, 3000);
               this.viewPaymentCard = false;
               this.isErrorAlertVisible = true;
               setTimeout(() => this.isErrorAlertVisible = false, 4000);
               this.displayAlert('ErrorAlert', err.error);
               this.togglePaymentMethod = false;
            }
         )
      }
   }



   /**
     * Renders the  payment form by injecting their script and handles on load logic
     *
     * @private
     * @memberof QuotePreviewComponent
     */
    private async renderPaymentform() {
      this.viewPaymentCard = !this.viewPaymentCard;
      // On HyperPay form loaded
      hyperpayModule.paymentFormReady().then(async () => {
  
        // Watch for form submission to store data on return state
        this.watchPaymentSubmission();
  
        // Wait for 3 seconds to avoid the deformed rendering of the form when it is being injected into the HTML
        await AppUtils.delay(3000);
  
        // Conceal card form loader
        this.isCardPaymentFormLoading = false;
  
        // Add input data on the form if return state exists
        if (history.state.paymentErrorMsg || history.state.paymentErrorMsg === '') this.addPaymentReturnStateData();
  
        // Get selected brand changes
        document.getElementsByName("paymentBrand")[0].addEventListener('change', async (event: any) => {
          this.selectedPaymentBrand = event.target.value;
        });
  
      });
  
      // On page language change
      this.appService.getAppLang().subscribe(async (lang) => {
  
        let hyperpayOptsScriptId = 'payment-form-options';
        let hyperpayScriptId = 'hyperpay-script';
        this.checkoutId = this.checkoutResponse.data.checkoutJsUrl ;
  console.log("dddddddddddddddddddddddddddddddx checkoutId",this.checkoutResponse)
        /* ------------------------- Create HyperPay Scripts ------------------------ */
  
        // Create new HyperPay payment script
        const newHyperpayScript = document.createElement("script");
        newHyperpayScript.id = hyperpayScriptId;
        newHyperpayScript.src = this.checkoutId;
        newHyperpayScript.async = true;
  
        // Create new HyperPay options script with options
        const optionsScript = document.createElement("script");
        optionsScript.id = hyperpayOptsScriptId;
        optionsScript.type = 'text/javascript';
        optionsScript.innerHTML = `
              var wpwlOptions = {
                 style: "card",
                 locale: "${lang}",
                 brandDetection: true,
                 brandDetectionType: "binlist",
                 brandDetectionPriority: ["MADA","VISA","MASTER"],
                 createRegistration: false,
                 onReady: () => hyperpayModule.paymentFormReady().resolve()
              };
           `;
  
        /* ----------------- Replace old options script if it exists ---------------- */
  
        // Get old options script
        const oldOptsScript = document.getElementById(hyperpayOptsScriptId);
  
        // If it exists
        if (oldOptsScript) {
  
          // Display card form loader
          this.isCardPaymentFormLoading = true;
  
          // Remove the hyperpay payment form from DOM
          this.isCardPaymentFormVisible = false;
  
          await AppUtils.delay(100);
  
          // Display and add the hyperpay payment form to DOM again
          this.isCardPaymentFormVisible = true;
  
          // Replace options script with new language
          document.head.replaceChild(optionsScript, oldOptsScript);
  
        } else {
          // Append it
          document.head.appendChild(optionsScript);
        }
  
  
        /* ----------------- Reload old hyperpay script if it exists ---------------- */
  
        // Get the old hyperpay script
        const oldHyperpayScript = document.getElementById(hyperpayScriptId);
  
        // If it exists
        if (oldHyperpayScript) {
          // Reload it
          document.head.removeChild(oldHyperpayScript);
          document.head.appendChild(newHyperpayScript);
        } else {
          // Append it
          document.head.appendChild(newHyperpayScript);
        }
  
        // Wait for the card form to load
        while (!(document.querySelector('.wpwl-form-card')) || window.getComputedStyle(window.document.querySelector('.wpwl-container-card')).display === "none") {
          this.isCardPaymentFormLoading = true;
          await new Promise(r => setTimeout(r, 500));
        }
        this.PaymentResponseCallBack(this.checkoutResponse)

        // Conceal the card form loader
        this.isCardPaymentFormLoading = false;
  
      });


      
    }
  
  /* pay */
   /* -------------------------------------------------------------------------- */
  /*                                RETURN STATE                                */
  /* -------------------------------------------------------------------------- */
/**
   * Fills the checkout attachments and IBAN return state data
   *
   * @private
   * @memberof OrderReviewComponent
   */
 private addReturnStateData(): void {

   // Get return state obj from local storage
   const returnStateObj: CheckoutReturnState = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.CheckoutReturnState));
   this.returnState = returnStateObj;


   // Fill the IBAN and update the form
   this.checkoutDetailsFormGroup.get('ibanCtrl').setValue(returnStateObj.iban);
   this.checkoutDetailsFormGroup.updateValueAndValidity({ onlySelf: false, emitEvent: true });

 }


  /**
   * Stores the checkout state data to display it if user returns to the checkout page after payment failure.
   * Return State = The checkout data that would be stored
   *
   * @private
   * @memberof OrderReviewComponent
   */
   private storeReturnState(): void {
      localStorage.setItem(LocallyStoredItemsKeys.CheckoutReturnState, JSON.stringify(this.returnState));
    }
  
   /**
   * Fills the payment form with return state data
   *
   * @private
   * @memberof OrderReviewComponent
   */
    private  addPaymentReturnStateData(): void {
      (<HTMLInputElement>document.getElementsByClassName('wpwl-control-brand')[0]).value = this.returnState.cardBrand;
      (<HTMLInputElement>document.getElementsByClassName('wpwl-control-expiry')[0]).value = this.returnState.cardExpiryDate;
      (<HTMLInputElement>document.getElementsByClassName('wpwl-control-cardHolder')[0]).value = this.returnState.cardHolder;
    }
 /**
   * Stores the payment data to return state object inorder to display it if user returns to the checkout page after payment failure
   *
   * @private
   * @memberof OrderReviewComponent
   */
  private watchPaymentSubmission(): void {
   document.getElementsByClassName('wpwl-button-pay')[0].addEventListener('click', () => {

     this.returnState.cardBrand = (<HTMLInputElement>document.getElementsByClassName('wpwl-control-brand')[0]).value;
     this.returnState.cardExpiryDate = (<HTMLInputElement>document.getElementsByClassName('wpwl-control-expiry')[0]).value;
     this.returnState.cardHolder = (<HTMLInputElement>document.getElementsByClassName('wpwl-control-cardHolder')[0]).value;

     // Store the return state data in case of payment error
     this.storeReturnState();

   });
 }

 private scrollToPayment(): void {
   const el = this.paymentBox.nativeElement;
   var bodyRect = document.body.getBoundingClientRect(),
     elemRect = el.getBoundingClientRect(),
     offset = elemRect.top - bodyRect.top - 550;
   window.scrollTo({ top: offset, behavior: "smooth" });
 }

  /*  */
   PaymentResponseCallBack(checkoutResponse) {
      console.log("ccccccccsdcsfcdsv checkoutResponse PolicyPurchase ",checkoutResponse)
      let purchaseRequest: PolicyPurchase = {};
      purchaseRequest.clientPaymentId = checkoutResponse.clientPaymentId;
      purchaseRequest.clientQuoteId = checkoutResponse.clientQuoteId;
      purchaseRequest.pgReferenceId = checkoutResponse.data.pgReferenceId;
      this.orderService.getPolicyPurchase(purchaseRequest).subscribe((res: any) => {
         // Save Purchase Response in Local Storage
         // Store quote preview response
         localStorage.setItem(LocallyStoredItemsKeys.PurchaseResponse, JSON.stringify(res.data));

         // Route to the payment status page
         this.router.navigateByUrl(AppRoutes.MotorRoutes.request + "/checkout/" + AppRoutes.MotorRoutes.paymentStatus);
         console.log(res)
      },
         err => {
            // this.alert = true
            // this.isLoading = false;
            this.viewPaymentCard = false;
            this.displayWarning(err.error);
            // alert('The Phone number not valid');
         }
      )
   }

}
