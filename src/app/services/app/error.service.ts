import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorPageTypes } from 'src/app/models/app/ErrorPageTypes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';


@Injectable({
   providedIn: 'root'
})


export class ErrorService {

   activeErrorPageType: BehaviorSubject<ErrorPageTypes> = new BehaviorSubject<ErrorPageTypes>(undefined);


   constructor() { }


   setActiveErrorPageType(errorPageType: ErrorPageTypes): void {
      this.activeErrorPageType.next(errorPageType);
      localStorage.setItem(LocallyStoredItemsKeys.ActiveErrorType, errorPageType);
   }


   getActiveErrorPageType(): BehaviorSubject<ErrorPageTypes> {
      // Get stored error type from local storage
      let storedErrorType = (<any>ErrorPageTypes)[localStorage.getItem(LocallyStoredItemsKeys.ActiveErrorType)];
      // If there is no error type value in subject, but there is a stored error then set it to the stored error
      if (!this.activeErrorPageType.value && storedErrorType) this.setActiveErrorPageType(storedErrorType);
      return this.activeErrorPageType;
   }

}
