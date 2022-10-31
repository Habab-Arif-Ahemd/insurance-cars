import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/models/profile/Dashboard';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AppService } from "src/app/services/app/app.service";
import { PolicyStatus } from 'src/app/models/profile/PolicyStatus';
import { environment } from 'src/environments/environment';
import { Invoice } from "src/app/models/checkout/Invoice";
import { InvoiceService } from "src/app/services/checkout/invoice.service";

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  /* Data */

  lang: string;
  dashboard?: Dashboard;
  policies: any[];
  isLoadingPoliciesList=false;
  policyStatus = PolicyStatus;
  page = 4;
  pageSize = 4;


  insuranceCompanyLogo: string = environment.apiAssetsUrl + 'IC/';

  /* UI */
  policySpinner: boolean;
  constructor(private profileSarvices: ProfileService,    private appService: AppService,    private invoiceService: InvoiceService,
    ) { }

  ngOnInit(): void {
    this.getDashboard();
    this.getAppLang(); 
  }

  getAppLang() {
    this.appService.getAppLang().subscribe((lang) => (this.lang = lang));
  }
  /* getDashboardData */
  getDashboard(){
    this.isLoadingPoliciesList=true;
    this.profileSarvices.getPolicies().subscribe((dashboard:any)=>{
      this.dashboard=dashboard;
      this.policies = dashboard.policies;
      console.log(dashboard);
      this.isLoadingPoliciesList=false;
    });
console.log('POLIC', this.policies);

  }

  getPoliciesByStatus(status: string) {
    this.isLoadingPoliciesList = true;
    this.profileSarvices.getDashboardPolicies(status).subscribe((data: any) => {
      this.policies = data.policies;
      this.isLoadingPoliciesList = false;
    });
  }

  // Print Invoice
  // printInvoice(id: string) {
  //   console.log('INVOICE');
  //   this.profileSarvices.printInvoice(id).subscribe((invoiceInfo: Invoice) => {
  //     this.invoiceService.setActiveGeneratedInvoice({
  //       invoice: invoiceInfo,
  //       outputType: "print",
  //     });
  //   });
  // }

  // For Policy Downloading
  downloadPolicy(id: string) {
    this.policySpinner = true
    this.invoiceService
    .downloadPolicyProfile(id).subscribe(blob => {
      this.policySpinner = false
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = 'Policy.zip';
      a.click();
      URL.revokeObjectURL(objectUrl);
    },
    err => {
      this.policySpinner = true;
      setTimeout(() => { this.policySpinner = false; }, 3000);
    })

  } 

  // For Invoice Downloading
  downloadInvoice(id: string) {
    this.invoiceService
    .profileprint(id)
    .subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = 'Invoice.zip';
      a.click();
      URL.revokeObjectURL(objectUrl);
    })

  /* this.invoiceService.downloadPolicyProfile(id).subscribe(
    (response) => { // download file
      var blob = new Blob([response.slice()], {type: 'application/pdf'});
      const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
  }); */
}}
