import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from 'src/app/models/checkout/Invoice';
import { InvoiceGeneration } from 'src/app/models/checkout/InvoiceGeneration';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from 'src/app/models/app/ApiRoutes';
import{SharebyFormGroup, }from 'src/app/models/insurance-steps/ManagedFormsTypes'


@Injectable({
  providedIn: 'root'
})

export class InvoiceService {
  activeGeneratedInvoice: BehaviorSubject<InvoiceGeneration> = new BehaviorSubject<InvoiceGeneration>(undefined);


  constructor(private http: HttpClient) { }

  download(url: string): Observable<Blob> {
  type d=2
    let headers = new HttpHeaders();
    // headers = headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    
    https://oasisaggrapi.com/
    return this.http.get("https://oasisaggrapi.com/" + url, {
      responseType: 'blob'
    })
  }


/* send policy share by sms */
shareBySmS(SharebyFormGroup:SharebyFormGroup){
  return this.http.post(environment.apiUrl+ApiRoutes.Service.smsShare,SharebyFormGroup)
}
/* send policy share by email */
shareByemail(SharebyFormGroup:SharebyFormGroup){
  return this.http.post(environment.apiUrl+ApiRoutes.Service.emailShare,SharebyFormGroup)
}

  /* checkout invoice */
  printPolicy(url: string): Observable<Blob> {
    return this.http.get(url,
      {
        responseType: 'blob'
      })
  }

  /* profile invoice*/
  profileprint(id: string): Observable<Blob> {
    return this.http.get(environment.apiUrl + ApiRoutes.Profile.PrintInvoice + `${id}`, {
      responseType: 'blob'
    })
  }

  downloadPolicyProfile(id: string): Observable<Blob> {
    return this.http.get(environment.apiUrl + ApiRoutes.Profile.DownloadPolicy + id, {
      responseType: 'blob'
    })
  }

  setActiveGeneratedInvoice(invoiceGenerationData: InvoiceGeneration) {
    this.activeGeneratedInvoice.next(invoiceGenerationData);
  }


  getActiveGeneratedInvoice(): BehaviorSubject<InvoiceGeneration> {
    return this.activeGeneratedInvoice;
  }

}
