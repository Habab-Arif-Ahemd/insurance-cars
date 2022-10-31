import { ApiRoutes } from './../../models/app/ApiRoutes';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PasswordChangeRequest } from 'src/app/payload/requests/user/PasswordChangeReq';
import { PhoneChangeRequest } from 'src/app/payload/requests/user/PhoneChangeReq';
import { DefaultLangChangeRequest } from 'src/app/payload/requests/user/DefaultLangChangeReq';
import { UsernameChangeRequest } from 'src/app/payload/requests/user/UsernameChangeReq';
import { UsernameChangeVerificationReq } from 'src/app/payload/requests/user/UsernameChangeVerificationReq';
import { PhoneChangeVerificationReq } from 'src/app/payload/requests/user/PhoneChangeVerificationReq';
import { PasswordChangeVerficationReq } from 'src/app/payload/requests/user/PasswordChangeVerficationReq';
import { TicketsParms } from 'src/app/models/profile/tickets';
import { Policy } from 'src/app/models/profile/Dashboard';
import { Invoice } from "src/app/models/checkout/Invoice";
import { Invoices } from 'src/app/models/profile/Invoices';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveSettingsPanels } from 'src/app/models/app/ActiveSettingsPanels';
import { UserProfileDataRes, UserProfileData } from 'src/app/payload/responses/user/UserProfileDataRes';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
   apiRoute = environment.apiUrl;

   initialActivePanels = {
    password: false, email: false, phone: false, misc: false
 };


  userData = {
    pageNumber: 1,
    pageSize: 10,
    ticketStatusId: null
  }

  private activeSettingsPanel: BehaviorSubject<ActiveSettingsPanels> = new BehaviorSubject<ActiveSettingsPanels>(this.initialActivePanels);
  constructor(private http: HttpClient) { }


  getClientVehicles() {
    return this.http.get(this.apiRoute + ApiRoutes.Profile.GetVehiclesList + "/" );
  }

  /* get saved  qoutes*/

  getSavedQuotes() {
    return this.http.get(this.apiRoute + ApiRoutes.Profile.UserQuote );
  }

    /* get single saved Quote */

    getSavedQuote(id: string) {
      // const params = new HttpParams().set(id);
      // console.log(environment.apiUrl + ApiRoutes.Profile.UserQuote +'/'+params.toString());
      return this.http.get(
        environment.apiUrl + ApiRoutes.Profile.UserQuotes + "/" + id
      );
    }
  
changePassword( PasswordChangeRequest: PasswordChangeRequest) {
   return   this.http.post(this.apiRoute + ApiRoutes.Profile.PasswordChangeRequest,PasswordChangeRequest);
}
confirmchangePassword( PasswordChangeVerficationReq: PasswordChangeVerficationReq) {
   return   this.http.post(this.apiRoute + ApiRoutes.Profile.PasswordChange,PasswordChangeVerficationReq);
}
   changePhone( PhoneChangeRequest: PhoneChangeRequest) {
      return   this.http.post(this.apiRoute + ApiRoutes.Profile.PhoneNumberChangeRequest,PhoneChangeRequest);
}

changeLang( DefaultLangChangeRequest: DefaultLangChangeRequest) {
   return   this.http.post(this.apiRoute + ApiRoutes.Profile.ChangeLanguage,DefaultLangChangeRequest);
}
changeEmail(UsernameChangeRequest: UsernameChangeRequest) {
   return   this.http.post(this.apiRoute + ApiRoutes.Profile.UsernameChangeRequest,UsernameChangeRequest);
}
confirmEmailchange(confirmUsernamChange: UsernameChangeVerificationReq) {
   return   this.http.post(this.apiRoute + ApiRoutes.Profile.UsernameChange,confirmUsernamChange);
}
confirmPhonechange(PhoneChangeVerificationReq: PhoneChangeVerificationReq) {
   return   this.http.post(this.apiRoute + ApiRoutes.Profile.PhoneNumberChange,PhoneChangeVerificationReq);
}
/* function for  */

fetchUserProfileData(): Observable<UserProfileDataRes> {
  let url = this.apiRoute + ApiRoutes.Profile.GetAccountinfo;
  return this.http.get<UserProfileDataRes>(this.apiRoute + ApiRoutes.Profile.GetAccountinfo);
}

    /* get saved  Policies */

  getPolicies(){
         return this.http.get(this.apiRoute + ApiRoutes.Profile.Dashboard)
  }

  getDashboardPolicies(status: string) {
    return this.http.get<Policy[]>(
      environment.apiUrl + ApiRoutes.Profile.Policy+ status
    );
  }


    /* get saved  Invoices */

  getInvoices() {
    return this.http.get<Invoices>(
      environment.apiUrl + ApiRoutes.Profile.Invoices
    );
/*     return this.http.get(this.apiRoute + ApiRoutes.Profile.UserInvoices);
 */  }
  printInvoice(id: string) {
    return this.http.get<Invoice>(
      environment.apiUrl + ApiRoutes.Profile.PrintInvoice + id
    );
  }

  
   /* get saved Vehicles */

  getVehicles(){
         return this.http.get(this.apiRoute + ApiRoutes.Profile.GetVehiclesList)
  }

  getIdentities(){
    return this.http.get(this.apiRoute + ApiRoutes.Profile.GetUserIdentities)

  }

  /* -------------------------------------------------------------------------- */
  /*                                   Tickets                                  */
  /* -------------------------------------------------------------------------- */
  getTicketsList(tickets?: TicketsParms) {
    return this.http.post(
      environment.apiUrl + ApiRoutes.Tickets.ticketsList,
      tickets
    );
  }

  getTicketsTypes() {
    return this.http.get(
      environment.apiUrl + ApiRoutes.Tickets.ticketsTypes);
  }

   createTicket(ticketFormData: FormData) {
    return this.http.post(
      environment.apiUrl + ApiRoutes.Tickets.ticketsCreate,
      ticketFormData
    );
  }

  getTicket(ticketId: string) {
    let params = new HttpParams().set('ticketId', ticketId);
      return this.http.get(environment.apiUrl + ApiRoutes.Tickets.ticketDetails, {params: params});
  }
  sendfollowUp(message: {message: string , ticketId: string}) {
    return this.http.post(environment.apiUrl + ApiRoutes.Tickets.ticketFollowUp, message);
  }

  getTicketStatus() {
      return this.http.get(environment.apiUrl + ApiRoutes.Tickets.ticketStatus);
  }

  getUnReadFollowup() {
      return this.http.get(environment.apiUrl + ApiRoutes.Tickets.totalUnReadFollowup);
  }

  changeStatus(status) {
      return this.http.post(environment.apiUrl + ApiRoutes.Tickets.changeStatus, status)
  }


   /* Setters and Getters */

  getActiveSettingsPanel(): BehaviorSubject<ActiveSettingsPanels> {
    return this.activeSettingsPanel;
  }

  setActiveSettingsPanel(activePanelsObj: ActiveSettingsPanels) {
    this.activeSettingsPanel.next(activePanelsObj);
  }

  getUserProfileData(): UserProfileData {
    return JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.ProfileData));
  }

  setUserProfileData(userProfileData: UserProfileData) {
    localStorage.setItem(LocallyStoredItemsKeys.ProfileData, JSON.stringify(userProfileData));
  }

}
