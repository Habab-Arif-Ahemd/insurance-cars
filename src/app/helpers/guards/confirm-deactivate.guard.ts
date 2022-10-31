import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { VehicleInfoComponent } from 'src/app/components/insurance-steps/vehicle-info/vehicle-info.component'
import { AppService } from 'src/app/services/app/app.service';


@Injectable({
   providedIn: 'root'
})


export class ConfirmDeactivateGuard implements CanDeactivate<VehicleInfoComponent> {

   constructor(private appService: AppService) {}

   canDeactivate(component: VehicleInfoComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const confirmationMessage = this.appService.getAppLang().value === 'ar' ? 'هل تريد مغادرة الصفحة؟' : 'Do you want to leave this page?';
      return window.confirm(confirmationMessage);
   }

}
