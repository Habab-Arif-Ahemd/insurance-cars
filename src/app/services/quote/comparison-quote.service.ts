import { Benefit } from '../../models/quote/Benefit';
import { Product } from '../../models/quote/Product';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quote } from '../../models/quote/Quote';


@Injectable({
   providedIn: 'root'
})


export class ComparisonQuoteService {
   public static readonly MIN_COMPARISON_PRODUCTS = 2;
   public static readonly MAX_COMPARISON_PRODUCTS = 4;

   comparisonProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
   quotes: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([]);
   comparisonProductsBenefits: BehaviorSubject<Benefit[]> = new BehaviorSubject<Benefit[]>([]);


   constructor(
   ) { }


   addComparisonProduct(product: Product, quote: Quote): void {
      console.log(product);
      console.log(quote);
      // console.log("Object",Object.keys(product).length)
      if(product){
      const tempCompProducts = this.comparisonProducts.value.concat();
      const productIndex = tempCompProducts.indexOf(product);
      // Add if it doesn't already exists in the comparison list
      if (!(productIndex > -1)) {
         product.insuranceCarrier = quote.insuranceCompany;
         tempCompProducts.push(product);
         this.comparisonProducts.next(tempCompProducts);
         this.addProductBenefitsToList(product);
      }
   }
   }

   removeComparisonProduct(product: Product): void {
      const tempCompProducts = this.comparisonProducts.value.concat();
      const productIndex = tempCompProducts.indexOf(product);
      if (productIndex > -1) {
         tempCompProducts.splice(productIndex, 1);
         this.comparisonProducts.next(tempCompProducts);
         this.removeProductBenefitsFromList(product);
      }
   }


   clearComparisonProducts(): void {
      // Clear comparison state of each product
      this.comparisonProducts.value.forEach(product => product.isUnderComparison = false);
      // Clear the list
      this.setComparisonProducts([]);
   }


   addProductBenefitsToList(product: Product): void {
      // Construct a unique identifier for the product benefits by its product and quote  jjhggjh5
      product.benefits.forEach(benefit => benefit.quoteProductId = product.quotationProductId)
      // Get the comparison benefits list
      let tempBenefits = this.comparisonProductsBenefits.value.concat();
      // Add the quote benefits to the total comparison benefits list
      tempBenefits = tempBenefits.concat(product.benefits);
      this.comparisonProductsBenefits.next(tempBenefits);
   }


   removeProductBenefitsFromList(product: Product): void {
     console.log(product)
      // Get current comparison benefits list
      let tempBenefits = this.comparisonProductsBenefits.value.concat();
      // Remove the benefits with quoteID equal to the removed quote insurance company ID
      tempBenefits.forEach(benefit => {
         if (benefit.quoteProductId === product.quotationProductId) {
            tempBenefits = tempBenefits.filter(b => b !== benefit);
         }
      });
      this.comparisonProductsBenefits.next(tempBenefits);
   }


   getUniqueProductsBenefitsList() {
      // Get the current comparison benefits with no duplicates
      const tempBenefits = this.comparisonProductsBenefits.value;
      return Array.from(new Set(tempBenefits.map(e => e.name))).map(name => tempBenefits.find(e => e.name === name));
   }


   /*
      Getters and Setters
   */


   getComparisonProducts(): BehaviorSubject<Product[]> {
      return this.comparisonProducts;
   }


   setComparisonProducts(product: Product[]): void {
      this.comparisonProducts.next(product);
   }


   getComparisonProductsBenefits(): BehaviorSubject<Benefit[]> {
      return this.comparisonProductsBenefits;
   }


   setComparisonProductsBenefits(benefits: Benefit[]): void {
      this.comparisonProductsBenefits.next(benefits);
   }

}
