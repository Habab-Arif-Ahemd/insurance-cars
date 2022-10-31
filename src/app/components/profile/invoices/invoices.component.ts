import { Invoice } from './../../../models/checkout/Invoice';
import { Component, OnInit } from '@angular/core';
import { Invoices } from './../../../models/profile/Invoices';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { InvoiceService } from "src/app/services/checkout/invoice.service";
import { AppService } from "src/app/services/app/app.service";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  /* Module */
  invoices: Invoices[] = [];
  lang: any;

  /* Load Variabel  */
  isLoadingData:boolean = true;
  page = 4;
pageSize = 4;

  constructor(
    private profileSarvices: ProfileService,
    private invoiceService: InvoiceService,private appService: AppService
    ) { }

  ngOnInit(): void {
    this.getInvoices();this.getAppLang();

  }
  getAppLang() {
    this.appService.getAppLang().subscribe((lang) => (this.lang = lang));
  }
  /* getInvoicesList  */

  getInvoices() {
    this.isLoadingData = true;
    this.profileSarvices.getInvoices().subscribe((invoices: Invoices) => {
      this.invoices = invoices.data;
      this.isLoadingData = false;
      console.log(this.invoices);
    });
  
  }


  printInvoice(id: string) {

    console.log("ids,invoiceaaas" ,this.invoices[0].id)
 this.invoiceService.profileprint(this.invoices[0].id).subscribe(
   (response) => { // download file
     var blob = new Blob([response.slice()], {type: 'application/pdf'});
     const blobUrl = URL.createObjectURL(blob);
       const iframe = document.createElement('iframe');
       iframe.style.display = 'none';
       iframe.src = blobUrl;
       document.body.appendChild(iframe);
       iframe.contentWindow.print();
 });
 
  }
  
}
