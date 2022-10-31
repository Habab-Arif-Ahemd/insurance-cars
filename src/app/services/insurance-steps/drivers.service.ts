import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { DriverPage } from 'src/app/models/insurance-steps/DriverPage';
import { Driver } from '../../models/insurance-steps/Driver';

@Injectable({
   providedIn: 'root'
})
export class DriversService {
   static injector: Injector;
   currentDrivers: BehaviorSubject<Driver[]> = new BehaviorSubject<Driver[]>([]);
   driverPage: BehaviorSubject<DriverPage> = new BehaviorSubject<DriverPage>(DriverPage.additonalDriverClosed);
 
   constructor() { }
   /**
      * Determines current driver page
      * @param driverPage 'main': MainDriverPage , 'additional': AdditionalDrivePage, 'list' : DriverList
      */
   public setDriverPage(page: DriverPage): void {
      this.driverPage.next(page);
   }

   public getDriverPage(): BehaviorSubject<DriverPage> {
      return this.driverPage;
   }

 

   saveAdditionalDriver(driver: Driver[]) {
      let storedDrivers: any[] = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.UserAdditionalDrivers));
     /*  if (isEditing) {
         storedDrivers = storedDrivers.filter((drivers) => !drivers.isEditing);
      } */
      if (storedDrivers) {
         storedDrivers.push(driver[0]);
         localStorage.setItem(LocallyStoredItemsKeys.UserAdditionalDrivers, JSON.stringify(storedDrivers));
      } else {
         localStorage.setItem(LocallyStoredItemsKeys.UserAdditionalDrivers, JSON.stringify(driver));
      } 
   }

   getUserQuoteReqDrivers(): BehaviorSubject<Driver[]> {
      
      let currentDrivers: Driver[] = [];
      // get main driver with typeId = 1
      let currentMainDriver: Driver =  JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.FormManager)).MainDriverInsuranceForm?.value;
      // if main driver exist push it in empty array
      if(currentMainDriver)  currentDrivers.push(currentMainDriver);
      // get additional driver from localstorage
      let additionalDriver: Driver[] = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.UserAdditionalDrivers));
      // if their is not additional driver create empty array to concat with main driver
      if (additionalDriver == null) additionalDriver = [];
      // compine additional driver with main driver
      currentDrivers = currentDrivers.concat(additionalDriver);
      this.currentDrivers.next(currentDrivers);
      return this.currentDrivers;
   }

   /* ---------------- remove additional drive from localstorage --------------- */
   removeUserQuoteReqDrivers(driverToRemove: Driver) {
      //  get all drivers from localstorage
      let currentDrivers = this.getUserQuoteReqDrivers().value;
      //  get main driver 
      let mainDriver = currentDrivers.filter((driver) => driver.typeId == 1)[0];
      //  remove main driver from list
      currentDrivers = currentDrivers.filter(
         (driver) => driver.typeId != 1
      );
      // remove additional drive you  need to delete from list 
      for (let i = 0; i < currentDrivers.length; i++) {
         if (currentDrivers[i].identityNumber == driverToRemove.identityNumber) {
            currentDrivers.splice(i, 1);
         }
      }
      // set new additonal drive list in localstorage
      localStorage.setItem(LocallyStoredItemsKeys.UserAdditionalDrivers, JSON.stringify(currentDrivers));
      // add main drive to list 
      currentDrivers.push(mainDriver);
      // set new list to global list
      this.currentDrivers.next(currentDrivers);
   }

   /* get drivers percentage */

   getDriversPercentage(): number {
      let drivers: Driver[] = this.getUserQuoteReqDrivers().value;
      let percentage: number = 0;
      drivers.forEach(driver => {
         if(driver.isEditing) return;
         percentage += driver.drivingPercentageId;
      })
      return percentage;
   }

   getCalculatedPercentage(): number {
      //  check driving percentage
      if (this.getDriversPercentage() <= 100) {
        // add remaining percentage to main driver the (25) because we sub the main driver default percentage and we need to add it again
        let remainPercentage = 125 - this.getDriversPercentage();
        return remainPercentage;
      } else {
        return this.getDriversPercentage();
      }
    }
    
}


