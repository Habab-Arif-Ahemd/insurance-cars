import { Component, HostListener, OnDestroy, OnInit, ViewChild , Input,} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { ErrorPageTypes } from 'src/app/models/app/ErrorPageTypes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { Quote } from 'src/app/models/quote/Quote';
import { PreviewQuoteResponse } from 'src/app/payload/responses/quotes/PreviewQuoteResponse';
import { QuotesListResponse } from 'src/app/payload/responses/quotes/QuotesListResponse';
import { AppService } from 'src/app/services/app/app.service';
import { ErrorService } from 'src/app/services/app/error.service';
import { ComparisonQuoteService } from 'src/app/services/quote/comparison-quote.service';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { Benefit } from '../../../models/quote/Benefit';
import { Product } from '../../../models/quote/Product';
import { InsuranceStepsApiService } from './../../../services/insurance-steps/insurance-steps-api.service';


@Component({
   selector: 'app-quotes-page',
   templateUrl: './quotes-page.component.html',
   styleUrls: ['./quotes-page.component.scss']
})


export class QuotesPageComponent implements OnInit, OnDestroy {
   @Input() quote: Quote;

   @ViewChild('expiryModal', { static: true }) private expiryModal;

   comparisonProductsBenefits = [];
   comparisonProducts: Product[] = [];
   additionalProductBenefits: Benefit[] = [];


   /* UI */
   hasScrolledBanner:boolean = false;
   appLang;
   isOnMidScreen;
   isLoadingQuotes;
   isComparisonBarOpen = false;
   isComparisonTableOpen = false;
   isQuotesExpiryModalDisplayed = false;
   hasLoadingQuotesFailed = false;
   isHoveringComparisonButton = false;
   isComparisonMenuOpen = false;
     uiState = {

      gulfGeneralIC: {

         selectedExtraBenefit: undefined as 'DriverCover' | 'PassengerCover'

      },

   }

   constructor(
      private insuranceStepServiceApi: InsuranceStepsApiService,
      private comparisonQuoteService: ComparisonQuoteService,
      private errorService: ErrorService,
      private quoteService: QuoteService,
      private appService: AppService,
      private modalService: NgbModal,
      private router: Router,
   ) { }


   ngOnInit() {
      this.getScreenSize();
      this.watchQuotesExpiry();
      this.watchComparisonQuotes();
      this.appService.getAppLang().subscribe(lang => this.appLang = lang);
      /* this.resetBenefitsChecks(); */

   }

   ngOnDestroy() {
      this.clearComparisonList();
   }



   /* -------------------------------------------------------------------------- */
   /*                                  LISTENERS                                 */
   /* -------------------------------------------------------------------------- */

   // Listen for window size changes
   @HostListener('window:resize', ['$event'])
   getScreenSize(event?): void {
      // If browser window is resized below mid screen size width
      window.innerWidth <= 858 ? this.isOnMidScreen = true : this.isOnMidScreen = false;
   }


   private watchComparisonQuotes(): void {

      this.comparisonQuoteService.getComparisonProducts().subscribe(product => {
         this.comparisonProducts = product;
         if (this.comparisonProducts.length > 0) {
            this.isComparisonBarOpen = true;
         } else {
            this.isComparisonBarOpen = false;
         }
      });

      this.comparisonQuoteService.getComparisonProductsBenefits().subscribe(() => {
         this.comparisonProductsBenefits = this.comparisonQuoteService.getUniqueProductsBenefitsList();
      });

   }


   private watchQuotesExpiry(): void {
      this.quoteService.getExpiredQuotesState().subscribe(expiryState => {
         if (expiryState.hasAllQuotesExpired) {
            this.modalService.open(this.expiryModal, { centered: true });
         }
      });
   }



   /* -------------------------------------------------------------------------- */
   /*                               USER INTERFACE                               */
   /* -------------------------------------------------------------------------- */

   removeComparisonProduct(product: Product): void {
      // Remove the product from the list
      product.isUnderComparison = false;
      this.comparisonQuoteService.removeComparisonProduct(product);
      // Close the comparison menu if comparison list is empty
      if (this.comparisonProducts.length == 0) this.isComparisonMenuOpen = false;
   }

   // Window scroll events
   @HostListener("window:scroll", ["$event"])
   onScroll(event) {
      if (window.pageYOffset > 100)
         this.hasScrolledBanner = true;
      else this.hasScrolledBanner = false;
   }

   showComparisonTable(comparisonPopover): void {
      // If there are less comparison quotes than the allowed minimum number on the list
      if (this.comparisonQuoteService.getComparisonProducts().value.length < ComparisonQuoteService.MIN_COMPARISON_PRODUCTS) {
         // Open the alerting popover
         if (comparisonPopover.isOpen()) { comparisonPopover.close(); } else { comparisonPopover.open(); }
      } else {
         this.isComparisonBarOpen = false;
         this.isComparisonTableOpen = true;
      }
   }


   closeComparisonTable(): void {
      this.isComparisonTableOpen = false;
      this.isComparisonBarOpen = true;
   }


   toggleComparisonTable(): void {
      this.isComparisonTableOpen = !this.isComparisonTableOpen;
   }


   clearComparisonList(): void {
      this.comparisonQuoteService.clearComparisonProducts();
   }


   toggleProductBenefit(product: Product, benefit: Benefit): void {

      // Add the benefit's amount to the total price
      console.log("benefit.isChecked",benefit.isChecked)
      console.log("xsxsss1",product)

      console.log("this.quote.",this.quote)
      console.log("benefit.benefitId",benefit.benefitId)
      console.log("xsxsss2",product)

      if (benefit.isChecked) {
         if (this.quote.insuranceCompany.id== 5) {

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
         product.selectedDeductible.policyPremium += benefit.benefitAmount;

         // Add the benefit amount to the previous total premium
         product.previousTotalPremium += benefit.benefitAmount;

         //Add the benefit amount to the total additional benefit
         product.selectedDeductible.totalAdditionalBenefits += benefit.benefitAmount;

         product.selectedDeductible.taxableAmount += benefit.benefitAmount;

         // Add the benefit VAT amount to the VtoggleExtraBenefitsAT premium breakdown
         let vatPremiumBreakdown = product.selectedDeductible.premiumBreakdowns.filter(pmd => pmd.breakdownTypeId === 5)[0];
         if (vatPremiumBreakdown) {
            vatPremiumBreakdown.breakdownAmount += benefit.benefitVATAmount;
            product.selectedDeductible.policyPremium += benefit.benefitVATAmount;
         }

      } else {

         // Subtract the benefit amount from the current total premium
         product.selectedDeductible.policyPremium -= benefit.benefitAmount;


         // Subtract the benefit amount from the total additional benefit
         product.selectedDeductible.totalAdditionalBenefits -= benefit.benefitAmount;
         product.selectedDeductible.taxableAmount -= benefit.benefitAmount;
         // Subtract the benefit amount from the previous total premium

         // this.quoteProduct.previousTotalPremium -= benefit.benefitAmount;



         // Subtract the benefit VAT amount from the VAT premium breakdown (breakdown with id = 5)
         let vatPremiumBreakdown = product.selectedDeductible.premiumBreakdowns.filter(pmd => pmd.breakdownTypeId === 5)[0];
         if (vatPremiumBreakdown) {
            vatPremiumBreakdown.breakdownAmount -= benefit.benefitVATAmount;
            product.selectedDeductible.policyPremium -= benefit.benefitVATAmount;
         }  
           // Unset the selected benefit state
      this.uiState.gulfGeneralIC.selectedExtraBenefit = undefined;
      }

      // Toggle the benefit addition to the additional product benefits array
      var index = this.additionalProductBenefits.indexOf(benefit);

      if (index >= 0) this.additionalProductBenefits.splice(index, 1);
      else this.additionalProductBenefits.push(benefit);

      this.toggleBenefitCheck(product, benefit);

   }

   toggleBenefitCheck(product: Product, benefit: Benefit): void {
      console.log('benefit before checked=> ', benefit.isChecked)
      const productBenefits = product.benefits;
      const benefitIdx = productBenefits.indexOf(benefit);
      productBenefits[benefitIdx].isChecked = !productBenefits[benefitIdx].isChecked;
      console.log('benefit after checked', benefit.isChecked)
   }


   navigateToLanding() {
      // Close modal
      this.modalService.dismissAll();
      // Navigate to landing page
      this.router.navigate([AppRoutes.landing]);
   }

   toggleComparisonMenu() {
      if (this.isHoveringComparisonButton && this.comparisonProducts.length > 0) {
         this.isComparisonMenuOpen = !this.isComparisonMenuOpen;
      }
   }

   /* -------------------------------------------------------------------------- */
   /*                                API / SUBMIT                                */
   /* -------------------------------------------------------------------------- */

   orderQuoteProduct(product: Product): void {

      // Get the list of all quotes
      const quotes = this.quoteService.getQuotes().value;

      // Find the product's quote according to its insurance carrier from the quotes list
      // const productQuote = quotes.filter(q => q.insuranceCompany === product.insuranceCarrier)[0];
      let productQuote:Quote = {};
      quotes.forEach(quote => quote.products.forEach(quoteProduct => {
         if(quoteProduct.quotationProductId==product.quotationProductId){
            productQuote= Object.assign({}, quote);
            productQuote.products= [JSON.parse(JSON.stringify(product))];
         }
      }))



      // let totalBenefits = JSON.parse(JSON.stringify(this.additionalProductBenefits.map(b => ({...b}))));
      let totalBenefits = productQuote.products[0].benefits.filter(benefit => benefit.isChecked)
      console.log(totalBenefits);
      // Construct a quote which has only the selected product
      // const quote = Object.assign({}, productQuote);
      // quote.products = [product];

      // Display loader for selected product from table
      product.isSelected = true;

      /* Extract free benefit */
   // Get the list of included benefits
   const includedBenefits = productQuote.products[0].benefits.filter(benefit => benefit.benefitTypeId === 3);

   // Add the included benefits to the selected benefits list
   if (includedBenefits) this.additionalProductBenefits = this.additionalProductBenefits.concat(includedBenefits);

   // Add the free benefits to the selected benefits list
   const freeBenefits =  productQuote.products[0].benefits.filter(benefit => benefit.benefitTypeId == 2);
   totalBenefits = totalBenefits.concat(freeBenefits);

   // Add the free benefits as well
   this.additionalProductBenefits = this.additionalProductBenefits.concat(freeBenefits);
   // Set the quote product's benefits
   productQuote.products[0].benefits = [...totalBenefits];

   productQuote.benefits = this.additionalProductBenefits;
  
      
      
      // Send the quote select (preview) request
      this.quoteService.setSelectedQuote(productQuote).subscribe(
         (res: PreviewQuoteResponse) => {

            // Hide loader for product
            product.isSelected = false;

            // Store quote preview response
            localStorage.setItem(LocallyStoredItemsKeys.PreviewQuoteResponse, JSON.stringify(res));

            // Delete the stored constructed quote preview request
            localStorage.removeItem(LocallyStoredItemsKeys.PreviewQuoteRequest);

            
            // Route to the checkout page
            this.router.navigateByUrl(AppRoutes.MotorRoutes.request + "/" + AppRoutes.MotorRoutes.checkout);
            

         },
         err => {
            // Hide loader for product
            product.isSelected = false;

            this.router.navigate([AppRoutes.error]);
         }
         
      );
      

   }


   /**
    * Resends the quotation / quotes fetching request
    *
    * @memberof QuotesPageComponent
    */
   reloadQuotations(): void {

      // Close the quotation reloading dialog modal
      this.modalService.dismissAll();

      // Display loader
      this.isLoadingQuotes = true;

      // Resend the quotations request to reload quotations
      this.insuranceStepServiceApi.getQuotationList().subscribe(
         (res: QuotesListResponse) => {
            // Conceal loader
            this.isLoadingQuotes = false;
            // Check if insurance companies didn't respond with quotations
            if (!res.isSuccess && res.statusCode === StatusCodes.QuotationsUnavailable) {
               // Navigate to unavailable quotations error page
               this.errorService.setActiveErrorPageType(ErrorPageTypes.QuotationsUnavailable);
               this.router.navigate([AppRoutes.error]);
            }
         },
         (err) => {
            // Conceal loader
            this.isLoadingQuotes = false;
            // Navigate to unavailable quotations error page
            this.errorService.setActiveErrorPageType(ErrorPageTypes.QuotationsUnavailable);
            this.router.navigate([AppRoutes.error]);
         }
      )
   }


}
