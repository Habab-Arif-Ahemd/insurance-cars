import { Component, OnInit } from '@angular/core';
import { DriverPage } from 'src/app/models/insurance-steps/DriverPage';
import { DriversService } from 'src/app/services/insurance-steps/drivers.service';

@Component({
  selector: 'app-drivers-page',
  templateUrl: './drivers-page.component.html',
  styleUrls: ['./drivers-page.component.css']
})
export class DriversPageComponent implements OnInit {
  /* UI */
  showDriverPage: DriverPage;
  currentActiveDriverPage = DriverPage;
  constructor(private driverService: DriversService) { }
  
  
  ngOnInit(): void {
      this.getCurrentDriver();
  }


  getCurrentDriver() {
      let currDrivers = this.driverService.getUserQuoteReqDrivers().value;
      if (currDrivers.length > 1) {
          this.driverService.setDriverPage(DriverPage.additonalDriverList);
          console.log("DriverPage.drivers-page1")
          console.log(DriverPage.additonalDriverList)
      } else {
          this.driverService.setDriverPage(this.driverService.getDriverPage().value);
          console.log("DriverPage.drivers-page2")
          console.log(DriverPage.additonalDriverList)
      }

      this.driverService.getDriverPage().subscribe(currPage => {
          this.showDriverPage = currPage;
      })
  }
}

