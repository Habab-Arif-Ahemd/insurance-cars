import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { Benefit } from 'src/app/models/quote/Benefit';
import { Deductible } from 'src/app/models/quote/Deductible';
import { PreviewQuoteResponse } from 'src/app/payload/responses/quotes/PreviewQuoteResponse';
import { AppService } from 'src/app/services/app/app.service';
import { ComparisonQuoteService } from 'src/app/services/quote/comparison-quote.service';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { environment } from 'src/environments/environment';
import { Product } from '../../../models/quote/Product';
import { Quote } from '../../../models/quote/Quote';
import { TimerProperties } from './../../../models/quote/TimerProperties';


@Component({
   selector: "app-quote",
   templateUrl: "./quote.component.html",
   styleUrls: ["./quote.component.scss"]
})

export class QuoteComponent implements OnInit , OnDestroy{

   


   /* External */
   @Input() quote: Quote;
   @Input() quoteProduct?: Product;
   originalQuoteProduct: Product;
   // @Input() insurancePreview?: InsuranceOfferPreview;

   

   /* UI */
   appLang="";
   lang;
   showToggle = false;
   isLoading = false;
   isViewingDetails = false;
   isDeductibleLoaderVisible = false;
   insuranceCompanyLogo: string = environment.apiAssetsUrl + 'IC/';
   isBtnShown = false;
   rest=false;
   isDriverChecked: boolean;
   isDriverAndPassengersChecked: boolean;
   productCounterMax: boolean;
   /* Data */
   selectedBenefits: Benefit[] = [];
   timer: TimerProperties = { hours: 0, minutes: 0, seconds: 0, isOver: false };
   liabilitiesDataCollections: any[] = [];
   filterProduct: any[] = [{id:2 , name: ''}, {id:3 , name: ''}] 
   originalQuote: Quote;
    /* Term and Condition for each IC  */
   ICtermsAndConditions: String = "https://oasisaggrapi.com/";
   /* Benefits */

   extraBenefits: Benefit[];
   freeBenefits: Benefit[];
   noOfViewedFreeBenefits: number;
   noOfViewedExtraBenefits: number;
   nextRoute: string;
   toggleExtraBenefit: boolean = false;
   toggleFreeBenefit: boolean = false;
   // generate Random string to indicate which benefit has been selected
   randomBenefitId = (Math.random() + 1).toString(36).substring(7);
   uiState = {

      gulfGeneralIC: {

         selectedExtraBenefit: undefined as 'DriverCover' | 'PassengerCover'

      },

   }
   constructor(
      private router: Router,
      private appService: AppService,
      private quoteService: QuoteService,
      private comparisonQuoteService: ComparisonQuoteService
   ) { }


   ngOnInit() {
      console.log("quoteProduct",this.quoteProduct)
      this.initQuoteTimer();
      this.originalQuoteProduct =  { ...this.quoteProduct };
      console.log('is Equal quote',JSON.stringify(this.originalQuote) === JSON.stringify(this.quote))
      this.initProductProperties();
      this.appService.getAppLang().subscribe(appLang => (this.lang = appLang));
      // this.resetBenefitsChecks();
      // this.addBenefitsChecks();
   }

   


   /************************************************************
   *   INITIALIZATION
   ************************************************************/

   /**
    * Initializes the quote's product default values
    */
   initProductProperties() {

      this.quoteProduct.benefits.forEach(benefit => {
         benefit.showFullBenefit = false;
      })
      

      // Get benefits which aren't free
      this.extraBenefits = this.quoteProduct.benefits.filter(benefit => benefit.benefitTypeId == 1);
      this.freeBenefits = this.quoteProduct.benefits.filter(benefit => benefit.benefitTypeId == 2);

      // Display half of the free benefits
      if (!this.toggleFreeBenefit && this.freeBenefits.length >= 3) {
         this.noOfViewedFreeBenefits = Math.ceil(this.freeBenefits.length / 2);
      } else {
         this.noOfViewedFreeBenefits = this.freeBenefits.length;
      }
        // Display half of the extra benefits
      // if (!this.toggleExtraBenefit && this.extraBenefits.length >= 3) {
      //    this.noOfViewedExtraBenefits = Math.ceil(this.extraBenefits.length / 2);
      // } else {
      //    this.noOfViewedExtraBenefits = this.extraBenefits.length;
      // }

      // Get benefits which are free
      this.freeBenefits = this.quoteProduct.benefits.filter(benefit => benefit.benefitTypeId == 2);

      // Display half of the free benefits
      //  this.noOfViewedFreeBenefits = (this.freeBenefits.length == 0) ? 0 : Math.ceil(this.freeBenefits.length / 2);

      // Determine if product has extra benefits
      if (this.extraBenefits && this.extraBenefits.length > 0) {
         this.quoteProduct.hasExtraBenefits = true;
      } else {
         this.quoteProduct.hasExtraBenefits = false;
      }
      // Determine if product has extra benefits
      if (this.freeBenefits && this.freeBenefits.length > 0) {
         this.quoteProduct.hasFreeBenefits = true;
      } else {
         this.quoteProduct.hasFreeBenefits = false;
      }
      // Sort deductibles by value
      this.quoteProduct.deductibles.sort((a, b) => a.deductibleValue > b.deductibleValue ? 1 : -1);

      // Select first deductible (smallest value)
      this.quoteProduct.selectedDeductible = this.quoteProduct.deductibles[0];

      // Initialize deductibles selections
      this.quoteProduct.deductibles.forEach(deductible => {
         this.liabilitiesDataCollections.push({
            deductible: deductible,
            benefits: this.quoteProduct.benefits,
            policyPremium: deductible.policyPremium
         });
      });
   }

     /**
    * Initializes the quote's product count down timer and keeps countin
    * 
    */
      initQuoteTimer() {

         const endDate = new Date(this.quote.quotationEndDate).getTime();
   
         let interval = setInterval(() => {
   
            const currentDate = new Date().getTime();
            // quotationEndDate:"2021-1-26T10:10:31.893"
            let offset = endDate - currentDate;
            // console.log('end date', this.quote.quotationEndDate)
            this.timer = {
               hours: Math.floor(offset / (1000 * 60 * 60)),
               minutes: Math.floor((offset / 1000 / 60) % 60),
               seconds: Math.floor((offset / 1000) % 60),
               isOver: false
            };
            
            if (offset < 0) {
               /* Set as expired */
               clearInterval(interval);
               this.timer.isOver = true;
               /* Add quote to expired quotes list */
               // this.quoteService.addExpiredQuote(this.quote);
               // console.log('Timer', this.timer)
               
            }
            
         }, 1000);
         
      }


   /************************************************************
   *   USER INTERFACE
   ************************************************************/

   /**
    * Selects a benefit and adds it to the additional benefits array
    * @param benefit The benefit that would be added
    */
   addExtraBenefit(benefit: Benefit): void {
      this.toggleBenefitCheck(benefit);
      console.log("benefit.isChecked",benefit.isChecked)
      console.log("this.quote.",this.quote)
      console.log("benefit.benefitId",benefit.benefitId)
      // Add the benefit's amount to the total price
      if (benefit.isChecked) {
         if (this.quote.insuranceCompany.id == 5) {

            switch (benefit.benefitId) {
      
               case 1:
      
                  this.uiState.gulfGeneralIC.selectedExtraBenefit = 'DriverCover';
      
               break;
      
               case 3:
      
                  this.uiState.gulfGeneralIC.selectedExtraBenefit = 'PassengerCover';
      
               break;
      
            }
      
         }
       
         // Add the benefit amount to the current policyPremium
         this.quoteProduct.selectedDeductible.policyPremium += benefit.benefitAmount;

         // Add the benefit amount to the previous total premium
         // this.quoteProduct.previousTotalPremium += benefit.benefitAmount;
         console.log('Previoussss', this.quoteProduct.previousTotalPremium);
         
         //Add the benefit amount to the total additional benefit
         this.quoteProduct.deductibles.map(deductible =>  deductible.totalAdditionalBenefits += benefit.benefitAmount);

         this.quoteProduct.selectedDeductible.taxableAmount += benefit.benefitAmount;
        
         // Add the benefit VAT amount to the VtoggleExtraBenefitsAT premium breakdown
         let vatPremiumBreakdown = this.quoteProduct.selectedDeductible.premiumBreakdowns.filter(pmd => pmd.breakdownTypeId === 5)[0];
         if (vatPremiumBreakdown) {
            vatPremiumBreakdown.breakdownAmount += benefit.benefitVATAmount;
            this.quoteProduct.selectedDeductible.policyPremium += benefit.benefitVATAmount;
            // if(this.rest == true){
            //    console.log(' RESET', this.rest);
            //    vatPremiumBreakdown.breakdownAmount = 0;
            //    vatPremiumBreakdown.breakdownAmount += benefit.benefitVATAmount ;
            //    this.quoteProduct.selectedDeductible.policyPremium += benefit.benefitVATAmount;
            // }
         }

      } else {

         // Subtract the benefit amount from the current total premium
         this.quoteProduct.selectedDeductible.policyPremium -= benefit.benefitAmount;

         
          // Subtract the benefit amount from the total additional benefit
          this.quoteProduct.deductibles.map(deductible =>  deductible.totalAdditionalBenefits -= benefit.benefitAmount);
         this.quoteProduct.selectedDeductible.taxableAmount -= benefit.benefitAmount;
         // Subtract the benefit amount from the previous total premium

         this.quoteProduct.previousTotalPremium -= benefit.benefitAmount;

         

         // Subtract the benefit VAT amount from the VAT premium breakdown (breakdown with id = 5)
         let vatPremiumBreakdown = this.quoteProduct.selectedDeductible.premiumBreakdowns.filter(pmd => pmd.breakdownTypeId === 5)[0];
         if (vatPremiumBreakdown) {
            vatPremiumBreakdown.breakdownAmount -= benefit.benefitVATAmount;
            this.quoteProduct.selectedDeductible.policyPremium -= benefit.benefitVATAmount;
         }
      // Unset the selected benefit state
      this.uiState.gulfGeneralIC.selectedExtraBenefit = undefined;
      }
   }
   
   /**
    * Toggles the benefit check status
    * @param benefit The benefit that is checked
    */
   toggleBenefitCheck(benefit: any): void {
      const quoteBenefits = this.quoteProduct.benefits;
      const benefitIdx = quoteBenefits.indexOf(benefit);
      quoteBenefits[benefitIdx].isChecked = !quoteBenefits[benefitIdx].isChecked;
   }

   // toggleExtraBenefits() {

   //    this.isBtnShown = !this.isBtnShown;
   //    this.toggleExtraBenefit = !this.toggleExtraBenefit;
   //    if (this.toggleExtraBenefit) {
   //       this.noOfViewedExtraBenefits = this.extraBenefits.length
   //    } else if (!this.toggleExtraBenefit && this.extraBenefits.length >= 3) {
   //       this.noOfViewedExtraBenefits = Math.ceil(this.extraBenefits.length / 2);
   //    }
   // }

   toggleFreeBenefits() {
      this.isBtnShown = !this.isBtnShown;
      this.toggleFreeBenefit = !this.toggleFreeBenefit;
      if (this.toggleFreeBenefit) {
         this.noOfViewedFreeBenefits = this.freeBenefits.length
      } else if (!this.toggleFreeBenefit && this.freeBenefits.length >= 3) {
         this.noOfViewedFreeBenefits = Math.ceil(this.freeBenefits.length / 2);
      }
   }

   /**
    * Clears the check status for all of the currect quote's product benefits
    */
   resetBenefitsChecks() {
      this.rest=true;
      this.quoteProduct.benefits.forEach(benefit => {
         benefit.isChecked = false;
      });
   }

  
   /**
    * Toggles (adds/removes) a product from the products comparison list
    * @param comparisonPopover A popover element passed from the component's html that would display validation errors
    */
   toggleProductComparison(comparisonPopover: any): void {

      if (!this.quoteProduct.isUnderComparison) {
         // If comparison quotes will exceeded max comparison limit before adding a product to comparison list
         if (
            this.comparisonQuoteService.getComparisonProducts().value.length >=
            ComparisonQuoteService.MAX_COMPARISON_PRODUCTS
         ) {
            // Open the alerting popover
            if (comparisonPopover.isOpen()) {
               comparisonPopover.close();
            } else {
               comparisonPopover.open();
            }
         } else {
            this.quoteProduct.isUnderComparison = true;
            this.comparisonQuoteService.addComparisonProduct(
               this.quoteProduct,
               this.quote
            );
         }
      } else {
         this.quoteProduct.isUnderComparison = false;
         this.comparisonQuoteService.removeComparisonProduct(this.quoteProduct);
      }

   }

   // toggleComparisonMenu() {
   //    if (this.isHoveringComparisonButton && this.comparisonProducts.length > 0) {
   //       this.isComparisonMenuOpen = !this.isComparisonMenuOpen;
   //    } 
   // }
  
   /**
    * Sets the selected deductible according to the selected liability amount
    * @param selectedDeductible The selected deductible value
    */
   setSelectedDeductible(selectedDeductible: Deductible) {
      // selectedDeductible.totalAdditionalBenefits = 0
      
      // Display loading spinner
      this.isDeductibleLoaderVisible = true;
      setTimeout(() => (this.isDeductibleLoaderVisible = false), 1000);

      // Get the selected liability data collection from the list
      let selectedLiabilityDataCol = Object.assign({}, this.liabilitiesDataCollections.find(liabilitySel => liabilitySel.deductible == selectedDeductible));

      // Calculate total price of the selected liability data collection by adding the already checked benefits prices to it
      if (selectedLiabilityDataCol) {
         this.quoteProduct.benefits.forEach(benefit => {
            if (benefit.isChecked) selectedLiabilityDataCol.policyPremium += benefit.benefitAmount;
            // let vatPremiumBreakdown = this.quoteProduct.selectedDeductible.premiumBreakdowns.filter(pmd => pmd.breakdownTypeId === 5)[0];
            // if (vatPremiumBreakdown) {
            //    vatPremiumBreakdown.breakdownAmount -= benefit.benefitVATAmount;
            //    this.quoteProduct.selectedDeductible.policyPremium -= benefit.benefitVATAmount;
            // }
         });
      }

      // Set the previous total price to the current displayed total price
      this.quoteProduct.previousTotalPremium = this.quoteProduct.selectedDeductible.policyPremium;
      console.log('Deductibles', this.quoteProduct.previousTotalPremium)
      // Set the new selected deductible
      this.quoteProduct.selectedDeductible = selectedDeductible;
      // Set the current displayed product's deductible's total price to the calculated price
      this.quoteProduct.selectedDeductible.policyPremium = selectedLiabilityDataCol.policyPremium;

      // Disable the previous total price display if the default deductible is selected
      if (this.quoteProduct.selectedDeductible.policyPremium == this.quoteProduct.deductibles[0].policyPremium) {
         this.quoteProduct.previousTotalPremium = undefined;
      }
      
      // this.resetBenefitsChecks(); 

   }

   /************************************************************
   *   PRODUCT SUBMIT (Quote Product Select)
   ************************************************************/

     
   orderQuoteProduct() {

      // Display laoder
      this.isLoading = true;
      // Construct a quote which has only the selected product
      const quote = Object.assign({}, this.quote);
      quote.products = [JSON.parse(JSON.stringify(this.quoteProduct))];

      let selectedBenefits = quote.products[0].benefits.filter(benefit => benefit.isChecked);
      
      // Set the selected deductible as only deductible
      quote.products[0].deductibles = [quote.products[0].selectedDeductible];
      

      // Get the list of included benefits
      const includedBenefits = this.quoteProduct.benefits.filter(benefit => benefit.benefitTypeId === 3);

      // Add the included benefits to the selected benefits list
      if (includedBenefits) this.selectedBenefits = this.selectedBenefits.concat(includedBenefits);

      // Add the free benefits to the selected benefits list
      const freeBenefits = this.quoteProduct.benefits.filter(benefit => benefit.benefitTypeId == 2);
      selectedBenefits = selectedBenefits.concat(freeBenefits);

      // Add the free benefits as well
      this.selectedBenefits = this.selectedBenefits.concat(freeBenefits);
      // Set the quote product's benefits
      quote.products[0].benefits = [...selectedBenefits];

      quote.benefits = this.selectedBenefits;
      // Send the quote select (preview) request
      this.quoteService.setSelectedQuote(quote).subscribe(
         (res: PreviewQuoteResponse) => {
         window.scrollTo({ top: 0, behavior: 'smooth' });

            // Stop loader
            this.isLoading = false;

            // Set the selected deductible as only deductible
            quote.products[0].deductibles = [quote.products[0].selectedDeductible];

            // Store quote preview response
            localStorage.setItem(LocallyStoredItemsKeys.PreviewQuoteResponse, JSON.stringify(res));

            // Delete the stored constructed quote preview request
            localStorage.removeItem(LocallyStoredItemsKeys.PreviewQuoteRequest);
            this.quote =  { ...this.originalQuote};
            console.log('is Equal quote',JSON.stringify(this.originalQuote) === JSON.stringify(this.quote))
            // Route to the checkout page
            this.router.navigateByUrl(AppRoutes.MotorRoutes.request + "/" + AppRoutes.MotorRoutes.checkout);
           
         },
         err => {
            this.isLoading = false;
            this.router.navigate([AppRoutes.error]);
         }
      );

   }

   ngOnDestroy(){
      // this.quote = JSON.parse(JSON.stringify(this.originalQuote));
     
   }

}
