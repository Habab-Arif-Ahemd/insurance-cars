import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NgFormsManager} from "@ngneat/forms-manager";
import { LocallyStoredItemsKeys } from "src/app/models/app/LocallyStoredItemsKeys";
import { ApiRoutes } from 'src/app/models/app/ApiRoutes';
import { CheckoutRequest } from 'src/app/models/checkout/CheckoutRequest';
import { PolicyPurchase } from 'src/app/models/checkout/PolicyPurchase';
import { environment } from 'src/environments/environment';
import { PreviewPageRequest } from 'src/app/models/checkout/PreviewPageRequest';

@Injectable({
   providedIn: 'root'
})


export class OrderReviewService {

   constructor(
      private formsManager: NgFormsManager,
      private http: HttpClient
   ) { }


   // public getCheckoutId(checkoutIdReq: CheckoutIdRequest) {
   //    return this.http.post(environment.apiUrl + ApiRoutes.Policy.checkout, checkoutIdReq);
   // }
   // Request for Saving Quotes
   saveQuote(saveOrderRequest: PreviewPageRequest ) {
      return this.http.post(environment.apiUrl + ApiRoutes.Quotation.saveOrder, saveOrderRequest);
   }

   public getPaymentCard(checkoutRequest: CheckoutRequest) {
      console.log(checkoutRequest);
      return this.http.post(environment.apiUrl + ApiRoutes.Policy.checkout, checkoutRequest);
   }

   public getPolicyPurchase(purchaseRequest: PolicyPurchase) {
      console.log(purchaseRequest);
      return this.http.post(environment.apiUrl + ApiRoutes.Policy.purchase, purchaseRequest);
   }

   public getCheckoutStatus(checkoutId: string) {
      return this.http.get(environment.apiUrl + ApiRoutes.Policy.issue + '/' + checkoutId);
   }
   
   getPolicyPurchaseLocally() {
      return JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.PurchaseResponse));
   }
}
