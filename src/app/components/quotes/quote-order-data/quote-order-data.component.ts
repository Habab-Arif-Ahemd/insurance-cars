import { Component, OnInit } from '@angular/core';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { InsuredInfo } from 'src/app/models/quote/InsuredInfo';
import { VehicleInfo } from 'src/app/models/quote/VehicleInfo';
import { AppService } from 'src/app/services/app/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quote-order-data',
  templateUrl: './quote-order-data.component.html',
  styleUrls: ['./quote-order-data.component.css']
})
export class QuoteOrderDataComponent implements OnInit {
  insuredInfo: InsuredInfo;
  vehicleInfo: VehicleInfo;
  vehicleLogoSrc: string;

  isDataAccordionShown = false;
  lang;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getAppLang().subscribe(appLanguage => this.lang = appLanguage);
    this.getUserOrderData();
  }
  getUserOrderData() {
    const userQuotesResponse: any = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.UserQuoteResponse));
    console.log(userQuotesResponse);
    this.insuredInfo = userQuotesResponse.insuredInfo;
    this.vehicleInfo = userQuotesResponse.vehicleInfo;
    
    // Construct vehicle logo image url
    this.vehicleLogoSrc = environment.apiAssetsUrl + this.vehicleInfo.makerLogo;
    console.log(this.vehicleLogoSrc);
 }


 toggleDataAccordion() {
    this.isDataAccordionShown = !this.isDataAccordionShown;
 }
}
