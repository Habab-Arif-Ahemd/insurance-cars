import { filter } from 'rxjs/operators';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/quote/Product';
import { AppService } from 'src/app/services/app/app.service';
import { QuoteService } from 'src/app/services/quote/quote.service';


@Component({
   selector: 'app-quotes-filters',
   templateUrl: './quotes-filters.component.html',
   styleUrls: ['./quotes-filters.component.css']
})


export class QuotesFiltersComponent implements AfterViewInit, OnInit {
   /* UI */
   isHoveringComparisonButton = false;
   selectedProductId: number;
   selectedProductIdfortheather: number = 0;
   
   lang: string;
   isComparisonMenuOpen = false;
   isSelected: boolean;

   QuotesCounter: number = 0;
   thirdPartyProductCounter: number = 0;
   GGi: number = 0;

   GGithirdParty: number = 0;
   thirdPartyProductCounterTa: number = 0;
   comprehensiveProductCounter: number = 0;
   /* Data */
   comparisonProducts: Product[] = [];
   selectedSortType: { ascending: boolean, descending: boolean } = {
      ascending: true, descending: false
   };
   constructor(

      private quoteService: QuoteService,
      private appService: AppService,
   ) {
      // this.filterProducts = this.products;
   }
   ngOnInit(): void {
      this.ProductTypeLenght();
      this.checkQuotesType();
      this.appService.getAppLang().subscribe((language) => {
         this.lang = language;
      });
      //  this.toggleSortType();
   }

   product = this.quoteService.sortByPriceDescending


   ngAfterViewInit() {
      this.initSortingOrder();
   }



   /************************************************************
   *   INITIALIZATION
   ************************************************************/

   /**
    * Initializes quotes sorting order
    */
   initSortingOrder() {
      this.quoteService.sortByPriceAscending();
   }


   toggleSortType() {
      this.selectedSortType = {
         ascending: !this.selectedSortType.ascending,
         descending: !this.selectedSortType.descending
      };

      if (this.selectedSortType.ascending) this.quoteService.sortByPriceAscending();
      else this.quoteService.sortByPriceDescending();
   }

   /**
    * pass the productTypeId to the BehaviourSubject in quoteService
    * subscribe to behaviour subject value in quote list 
    * use ngIf directive to display only the filterd product
    * @memberof QuotesFiltersComponent
    */
   filterProduct(productTypeId?) {
      this.quoteService.displayedProductType.next(productTypeId);
   }


   checkQuotesType() {
      const quotes = this.quoteService.getQuotes().value;

      quotes.forEach(quote => {
         let type1 = quote.products.some(item => item.productTypeId === 1)
         let type2 = quote.products.some(item => item.productTypeId === 2)
         console.log(type1, type2);

      })
   }

   resetFilters() {
      this.quoteService.resetQuotes();
      this.selectedSortType = { ascending: true, descending: false };
   }
   /**
   * Adds all current quotes to comparison list
   *
   * @memberof QuotesFiltersComponent
   */
   onCompareAllQuotes(): void {
      this.quoteService.compareAllQuotes();
      if (this.isHoveringComparisonButton && this.comparisonProducts.length > 0) {
         this.isComparisonMenuOpen = !this.isComparisonMenuOpen;
      }
   }

   ProductTypeLenght() {
      let quotes = this.quoteService.getQuotes().value;
console.log(",quotes",quotes)
      /* for quotes that have tow product  inide it */
      let x = 0
      quotes.forEach(quote => {
         if (quote.products.length > 1) { x++  }})

      /* total counter */
      this.QuotesCounter = quotes.length + x;

      /* for count the  third Party Product or comprehensive Product */

      /* Altawniya */
      // for (var y = 0; y < quotes.length; y++) {
      //    if (quotes[y].products.length > 1) {
      //       if (quotes[y].products[1].productTypeId === 5 || quotes[y].products[1].productTypeId === 3) {
      //          this.thirdPartyProductCounterTa = this.thirdPartyProductCounterTa + 2
      //       } else if(quotes[y].products[0].productTypeId === 1 ) { this.GGi = this.GGi + 1  }else this.GGithirdParty = this.GGithirdParty + 1
      //    }
      // }

      for (var y = 0; y < quotes.length; y++) {
         if (quotes[y].products.length > 1) {
            if(quotes[y].products[0].productTypeId === 1 ) { 
               this.GGi = this.GGi + 1  
            }
            else this.GGithirdParty = this.GGithirdParty + 1
         }
      }

      this.thirdPartyProductCounter = quotes.filter(item => item.products[0].productTypeId == 1).length + this.thirdPartyProductCounterTa+ this.GGithirdParty
      this.comprehensiveProductCounter = quotes.filter(item => item.products[0].productTypeId == 2).length + quotes.filter(item => item.products[0].productTypeId == 6).length +this.GGi

   }

}
