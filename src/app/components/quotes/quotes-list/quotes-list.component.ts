import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { AppService } from 'src/app/services/app/app.service';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { Quote } from '../../../models/quote/Quote';


@Component({
   selector: 'app-quotes-list',
   templateUrl: './quotes-list.component.html',
   styleUrls: ['./quotes-list.component.scss']
})


export class QuotesListComponent implements OnInit {
   d=3
   quotes: Quote[] = [];
   isLoadingQuotes: boolean;
   displayedProductType: number = 0;
   displayedProductType2:any[]=[];
   constructor(
      private router: Router,
      private appService: AppService,
      // private errorService: ErrorService,
      private quoteService: QuoteService
   ) { }


   ngOnInit() {
      this.watchQuoteFiltering()
      this.getQuotes();
   }


   getQuotes() {
      
      // Get quotes list from local storage
      this.quoteService.getQuotes().subscribe((quotes) => {
         this.isLoadingQuotes = true;
         setTimeout(() => { this.isLoadingQuotes = false;}, 2000); 
         console.log('quotes has been changed IM NOT WORKING')
         this.quotes = quotes;
         
         // If there were no quotations
         if (quotes.length === 0) {
            // Navigate to unavailable quotations error page
            // this.errorService.setActiveErrorPageType(ErrorPageTypes.QuotationsUnavailable);
            this.router.navigate([AppRoutes.error]);
         }
      });
   }

   watchQuoteFiltering() {
      this.quoteService.displayedProductType.subscribe(productType => {
         this.isLoadingQuotes = true;
         setTimeout(() => { this.isLoadingQuotes = false;}, 2000); 
         var c = [1, 3, 5]
         this.displayedProductType = productType;
      })
   }

}
