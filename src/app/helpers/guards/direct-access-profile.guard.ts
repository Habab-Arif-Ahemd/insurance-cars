import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DirectAccessProfileGuard implements CanActivate {
  constructor(
    private router: Router
 ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let quoteFromProfile =  localStorage.getItem('QuoteFromProfile'.toLowerCase());
      console.log("quoteFromProfilequoteFromProfilequoteFromProfilequoteFromProfilequoteFromProfile",quoteFromProfile)

      switch (quoteFromProfile) {  
        case '/request/insured-info':
          if ((quoteFromProfile)) { this.router.navigate(['/request/insured-info']); return false };
        break;
        case '/request/insured-info':
          if (!quoteFromProfile) {  this.router.navigate(['/']);  return false }
         break;
      }
      return true;
      }
  
}
