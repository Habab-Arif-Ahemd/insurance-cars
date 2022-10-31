import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRoutes } from 'src/app/models/app/ApiRoutes';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { QuotesListResponse } from 'src/app/payload/responses/quotes/QuotesListResponse';
import { environment } from 'src/environments/environment';
import { QuoteService } from '../quote/quote.service';
import { InsuranceStepsService } from './insurance-steps.service';
import { Router } from '@angular/router';
import *  as  QuotationRequest from '../../../assets/i18n/Qr.json';
import { Driver } from 'src/app/models/insurance-steps/Driver';
import QuoteUtils from 'src/app/helpers/utils/QuoteUtils';
import{ContactusFormGroup, ContactusFormGroupHomepage}from 'src/app/models/insurance-steps/ManagedFormsTypes'

@Injectable({
   providedIn: 'root'
})


export class InsuranceStepsApiService {

   masterTblApi = environment.apiUrl;
   dataRoutes = [
      ApiRoutes.MasterTable.VehicleIdType,
      ApiRoutes.MasterTable.VehicleRepairMethod,
      ApiRoutes.MasterTable.Cities,
      ApiRoutes.MasterTable.Occupations,
      ApiRoutes.MasterTable.Countries,
      ApiRoutes.MasterTable.VehicleUse,
      ApiRoutes.MasterTable.TransmissionType,
      ApiRoutes.MasterTable.ParkingLocation,
      ApiRoutes.MasterTable.Mileage,
      ApiRoutes.MasterTable.EducationLevel,
      ApiRoutes.MasterTable.DrivingPercentage,
      ApiRoutes.MasterTable.LicenseType,
      ApiRoutes.MasterTable.SocialStatus,
      ApiRoutes.MasterTable.VehicleSpecifications,
      ApiRoutes.MasterTable.Violation,
      ApiRoutes.MasterTable.MedicalCondition,
      ApiRoutes.MasterTable.Relation,
   ];

   yakeenMissingInfoRoutes = [
      ApiRoutes.MasterTable.VehicleMaker,
      // ApiRoutes.MasterTable.VehicleModel
   ]
   constructor(
      private http: HttpClient, private insuranceStepService: InsuranceStepsService,
      private router: Router, private quoteService: QuoteService
   ) { }


   /**
    * Fetches the master tables data
    */
   async getStepsData() {
      // Send requests
      for await (let route of this.dataRoutes) {
         await this.getRouteRequest(route).toPromise()
            .then(
               res => {
                  /* Convert master/Cities to  Cities */
                  //  route = route.substring(7);
                  route = route.replace('master/', '');
                  this.insuranceStepService.addInsuranceStepsObject(res, route);
               }
            )
            .catch(
               err => console.log(err)
            );
      }
   }

   /**
       * Fetches the insurance order form data
       */
   async getMissingYakeenStepsData() {
      // Send requests
      for await (let route of this.yakeenMissingInfoRoutes) {
         await this.getRouteRequest(route).toPromise()
            .then(
               res => {
                  /* Convert master/Cities to  Cities */
                  //  route = route.substring(7);
                  route = route.replace('master/', '');
                  this.insuranceStepService.addInsuranceStepsObject(res, route);
               }
            )
            .catch(
               err => console.log(err)
            );
      }
   }
   /* get vehicle models by vechile made */
   getVehicleModal(makeId: number) {
      let params = new HttpParams();
      params = params.append('id', makeId.toString());
      return this.http.get<any[]>(environment.apiUrl + ApiRoutes.MasterTable.VehicleModel, {params: params} );
   }


   setUserQuoteReqDrivers(tempDrivers: Driver[]) {
      return this.getAdditionalDriverInfo(tempDrivers[0]);
   }
   /**
    * Inquire the Additional driver information from API 
    */

   getAdditionalDriverInfo(driverInfo: Driver) {
      return this.http.post(environment.apiUrl + ApiRoutes.Quotation.InquireDriver, driverInfo);
   }
   /* contact us  */
   contactUs(ContactusFormGroup: ContactusFormGroup) {
      console.log("contactUs 2",ContactusFormGroup )

   return this.http.post(environment.apiUrl + ApiRoutes.Service.contactus, ContactusFormGroup);

}
  /* contact us  */
  contactUsHomePage(ContactusFormGroupHomepage: ContactusFormGroupHomepage) {
   console.log("contactUs 2",ContactusFormGroupHomepage )

return this.http.post(environment.apiUrl + ApiRoutes.Service.callback, ContactusFormGroupHomepage);
  }

   private getRouteRequest(route: any): Observable<any> {
      return this.http.get(this.masterTblApi + route.valueOf());
   }


  

   public getQuotationList() {
      // Get the constructed user request from local storage
      // const userQuotationRequest = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.UserQuoteRequest));
      const userQuotationRequest = QuoteUtils.constructQuoteRequest();
      console.log(userQuotationRequest);
      // Send the quotes list request
      return this.http.post(environment.apiUrl + ApiRoutes.Quotation.RequestQuote, userQuotationRequest).pipe(
         tap((res: QuotesListResponse) => {
            if (res.isSuccess) {
               // Save the response on local storage
               localStorage.setItem(LocallyStoredItemsKeys.UserQuoteResponse, JSON.stringify(res));
               // Route to the quotes list page
                this.router.navigate([AppRoutes.MotorRoutes.request +'/' + AppRoutes.MotorRoutes.quotes]);
               // Store the retreived quotes on local storage
               localStorage.setItem(LocallyStoredItemsKeys.Quotes, JSON.stringify(res.quotes));
               this.quoteService.setQuotes(res.quotes);
            }
         })
      );
   }

}
