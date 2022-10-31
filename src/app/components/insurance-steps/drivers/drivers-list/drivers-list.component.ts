import { Component, OnInit } from "@angular/core";
import { LocallyStoredItemsKeys } from "src/app/models/app/LocallyStoredItemsKeys";
import { Driver } from "src/app/models/insurance-steps/Driver";
import { DriverPage } from "src/app/models/insurance-steps/DriverPage";
import { DriversService } from 'src/app/services/insurance-steps/drivers.service';

@Component({
  selector: "app-drivers-list",
  templateUrl: "./drivers-list.component.html",
  styleUrls: ["./drivers-list.component.css"],
})
export class DriversListComponent implements OnInit {
  currentDrivers: Driver[] = [];
  inCompleteDrivingPercentage = false;
  percentageAlert = false;
  driverToEdit: Driver;
  mainDriverPercentage: number;
  constructor(private driversService: DriversService) { }

  ngOnInit() {
    this.getCurrentDriver();
    // calculate main driver percentage
  }

  getCurrentDriver() {
    this.driversService.getUserQuoteReqDrivers().subscribe((drivers) => {
      this.currentDrivers = drivers;
      this.currentDrivers.sort((a, b) => (a.typeId > b.typeId ? 1 : -1));
     
      this.currentDrivers.forEach(driver => {
        if (driver.identityNumber.toString().startsWith('1')) {
          driver.isSaudi = true;
        } else {
          driver.isSaudi = false;
        }
      })
    });
  }

  submitAddDriver() {
    // Indicates the sum of all drivers percentages in the array
    let currentDriversPercentage = this.driversService.getDriversPercentage();

    if (currentDriversPercentage == 100) {
      this.inCompleteDrivingPercentage = true;
      this.percentageAlert = false;
      setTimeout(() => {
        this.inCompleteDrivingPercentage = false;
      }, 5000);

    } else {
      this.driversService.setDriverPage(DriverPage.additonalDriverOpend);
      this.inCompleteDrivingPercentage = false;
    }
  }

  /*edit Driver  */
  editDriver(driverToEdit: Driver) {
   // save the driver in local storage 
    localStorage.setItem(LocallyStoredItemsKeys.DriverToEdit, JSON.stringify(driverToEdit));
    // adding flag to driver we want to edit
    let currentDrivers: Driver[] = this.driversService.getUserQuoteReqDrivers().value;
    // filter the driver from the array becaues we will edit only on additional driver
    currentDrivers = currentDrivers.filter(driver => driver.typeId != 1);
    currentDrivers.forEach(driver => {
      if(JSON.stringify(driver) === JSON.stringify(driverToEdit)) {
        driver.isEditing = true;
      }
    })
    // set new additonal drive list in localstorage
    localStorage.setItem(LocallyStoredItemsKeys.UserAdditionalDrivers, JSON.stringify(currentDrivers));
    this.driversService.setDriverPage(DriverPage.additonalDriverOpend);
  }

  removeDriver(driverToRemove) {
    this.driversService.removeUserQuoteReqDrivers(driverToRemove);
  }
}
