import { Product } from 'src/app/models/quote/Product';
import { Quote,Arryy } from './../../models/quote/Quote';
import { ExpiredQuotesState } from '../../models/quote/ExpiredQuotesState';
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LocallyStoredItemsKeys } from "src/app/models/app/LocallyStoredItemsKeys";
import { ApiRoutes } from "src/app/models/app/ApiRoutes";
import { QuotesListResponse } from "src/app/payload/responses/quotes/QuotesListResponse";
import { PreviewQuoteRequest } from 'src/app/payload/requests/quote/PreviewQuoteRequest';
import { ComparisonQuoteService } from './comparison-quote.service';
import { PreviewPageRequest } from 'src/app/models/checkout/PreviewPageRequest';


@Injectable({
   providedIn: "root"
})


export class QuoteService {

   quotesUrl = environment.apiUrl + "/quotes";

   quotes: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([]);
   displayedProductType: BehaviorSubject<number> = new BehaviorSubject<number>(0);
   displayedProductTypethirdpabrty: BehaviorSubject<Arryy[]> = new BehaviorSubject<Arryy[]> ([]);
   selectedQuote: BehaviorSubject<Quote> = new BehaviorSubject<Quote>({} as Quote);
   expiredQuotesState: BehaviorSubject<ExpiredQuotesState> = new BehaviorSubject<ExpiredQuotesState>({
      totalQuotes: 0, expiredQuotes: [], hasAllQuotesExpired: false
   });
   

   constructor(
      private quotesComparisonService: ComparisonQuoteService,
      private http: HttpClient
   ) { }

   /************************************************************
   *   FILTERS
   ************************************************************/
   sortByPriceDescending() {

      // Create distinct quotes with a single product each, in order to sort the products by price
      let sortedQuotes: Quote[] = this.getDistinctQuotesProducts(this.getQuotes().value.concat());

      // Sort the quotes by their single product's price
      sortedQuotes = sortedQuotes.sort(
         (q1, q2) => q2.products[0].selectedDeductible.policyPremium - q1.products[0].selectedDeductible.policyPremium
      );

      this.setQuotes(sortedQuotes);

   }


   sortByPriceAscending() {

      // Create distinct quotes with a single product each, in order to sort the products by price
      let sortedQuotes: Quote[] = this.getDistinctQuotesProducts(this.getQuotes().value.concat());

      // Sort the quotes by their single product's price
      sortedQuotes = sortedQuotes.sort(
         (q1, q2) => q1.products[0].selectedDeductible.policyPremium - q2.products[0].selectedDeductible.policyPremium
      );

      this.setQuotes(sortedQuotes);

   }


   filterByLiability(liabilityVal: number) {
      let filteredQuotes: Quote[] = [];
      const tempQuotes = this.getQuotes().value.concat();

      // Create distinct quotes with a single product each, in order to sort the products by price
      tempQuotes.forEach(quote => {
         quote.products.forEach(product => {
            const tempQuote = Object.assign({}, quote);
            tempQuote.products = [product];
            filteredQuotes.push(tempQuote);
         });
      });

      // Filter the quotes by their liability
      /* filteredQuotes = filteredQuotes.filter(
         quote => quote.products[0].maxLiability === liabilityVal
      ); */

      this.setQuotes(filteredQuotes);
   }


   /************************************************************
   *   STORAGE
   ************************************************************/

   getStoredQuotes(): Quote[] {
      return JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.Quotes));
   }

   /* get all quotes or quotes filterd by product id */
   getQuotes(): BehaviorSubject<Quote[]> {
      if (this.quotes.value.length === 0) {
         this.setQuotes(
            JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.Quotes))
         );
      }
      return this.quotes;
   }


   getQuotesArr(): Quote[] {
      return JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.Quotes));
   }


   resetQuotes() {
      const unAlteredQuotes = JSON.parse(
         localStorage.getItem(LocallyStoredItemsKeys.Quotes)
      );
      if (unAlteredQuotes) {
         this.quotes.next(unAlteredQuotes);
      }
   }


   setQuotes(quotes: Quote[]) {
      localStorage.setItem(
         LocallyStoredItemsKeys.AlteredQuotes,
         JSON.stringify(quotes)
      );
      this.quotes.next(quotes);
   }


   getSelectedQuote(): BehaviorSubject<Quote> {
      // Get the selected quote from local storage
      const storedSelectedQuote = localStorage.getItem(
         LocallyStoredItemsKeys.SelectedQuote
      );
      // Set it as the selected quote if it exists
      if (storedSelectedQuote.length > 0) {
         //   this.setSelectedQuote(JSON.parse(storedSelectedQuote));
      }
      return this.selectedQuote;
   }


   setExpiredQuotesState(expiredQuotesState: ExpiredQuotesState) {
      this.expiredQuotesState.next(expiredQuotesState);
   }


   addExpiredQuote(quote: Quote) {

      /* Add the quote to the expired quotes list */
      let expiredQuotesState = this.getExpiredQuotesState().value;
      expiredQuotesState.expiredQuotes.push(quote);

      /* Calculate total quotes */
      let totalQuotes = this.getQuotes().value;
      expiredQuotesState.totalQuotes = totalQuotes.length;

      /* Check if all quotes are expired */
      if (expiredQuotesState.expiredQuotes.length >= totalQuotes.length) {
         expiredQuotesState.hasAllQuotesExpired = true;
      }

      /* Update the state */
      this.setExpiredQuotesState(expiredQuotesState);

   }


   getExpiredQuotesState(): BehaviorSubject<ExpiredQuotesState> {
      return this.expiredQuotesState;
   }



   /************************************************************
   *   API
   ************************************************************/

   setSelectedQuote(quoteSelectRequest: any): Observable<any> {
      return this.http.post(
         environment.apiUrl + ApiRoutes.Quotation.PreviewQuote,
         quoteSelectRequest
      );
   }


   getPreviewQuote() {
      return JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.PreviewQuoteResponse));
   }


   saveOrder(reqBody: PreviewPageRequest ) {
      return this.http.post(
         environment.apiUrl + ApiRoutes.Quotation.saveOrder, reqBody
      );
   }


   compareAllQuotes(): void {
      // Clear the current comparison list
      this.quotesComparisonService.clearComparisonProducts();
      
      // Add all quotes' products to comparison list
      this.quotes.value.forEach(quote => {
         // check if quote has more than one product
         // loop throw the products and pass them to addComparisonProduct
         if (quote.products.length > 1) {
            quote.products.forEach(product => {
               product.isUnderComparison = true;
               this.quotesComparisonService.addComparisonProduct(product, quote);
            })
            // pass the first product only
         } else {
            quote.products[0].isUnderComparison = true;
            this.quotesComparisonService.addComparisonProduct(quote.products[0], quote);
         }
      });
   }
   /************************************************************
   *   Util
   ************************************************************/

   /**
    * Returns an array of distinct quotes each with a single product
    * @param quotes The quotes with the products that would be separated
    */
   private getDistinctQuotesProducts(quotes: Quote[]): Quote[] {

      let distinctQuotesProducts: Quote[] = [];

      quotes.forEach(quote => {
         quote.products.forEach(product => {
            // Create a new temp quote object clone (different reference)
            let tempQuote: Quote = JSON.parse(JSON.stringify(quote));

            // Set its products as the single product
            tempQuote.products = [product];

            // Add it to the array
            distinctQuotesProducts.push(tempQuote);
         });
      });

      return distinctQuotesProducts;

   }

}
