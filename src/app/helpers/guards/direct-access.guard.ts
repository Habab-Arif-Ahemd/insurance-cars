import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { delay } from 'rxjs/operators';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import{QuoteService} from 'src/app/services/quote/quote.service'

@Injectable({
   providedIn: 'root'
})


export class DirectAccessGuard implements CanActivate {

   constructor(
      private router: Router,private quoteService: QuoteService,
   ) {}
   canActivate(
      router: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let identityNumber = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.FormManager)).LandingForm.value.insuredIdentityNumber;
        let quoteFromProfile =  localStorage.getItem('QuoteFromProfile'.toLowerCase());
console.log("quoteFromProfile form prifle",quoteFromProfile)
      switch (state.url) {
        case '/request/insured-info':
          if ((!identityNumber && quoteFromProfile)) { this.router.navigate(['/']); return false };
        break;
        case '/request/quotes':
          if (localStorage.getItem(LocallyStoredItemsKeys.Quotes) === null) {  this.router.navigate(['/request/insured-info']);  return false }
         break;
        case '/request/checkout':
          if (this.quoteService.getPreviewQuote() === null) {this.router.navigate(['/request/quotes']); return false }
          break;
        case '/request/checkout/status':
          if (localStorage.getItem(LocallyStoredItemsKeys.PurchaseResponse) === null) {  this.router.navigate(['/request/checkout']);  return false }
          break;
        default:
          this.router.navigate(['/'])
          break;
      }
      return true;
  
    }
}
