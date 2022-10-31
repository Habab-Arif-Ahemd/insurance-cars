import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { PurchaseResponse } from 'src/app/payload/responses/order-preview/PurchaseResponse';
import { environment } from 'src/environments/environment';
import { AppService } from './../../../services/app/app.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { InvoiceService } from 'src/app/services/checkout/invoice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharebyFormGroup } from 'src/app/models/insurance-steps/ManagedFormsTypes';
import { ManagedForms, ManagedFormsTypes } from 'src/app/models/insurance-steps/ManagedFormsTypes';
import {  FormBuilder,FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { NgFormsManager } from '@ngneat/forms-manager';


declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-checkout-invoice',
  templateUrl: './checkout-invoice.component.html',
  styleUrls: ['./checkout-invoice.component.css']
})
export class CheckoutInvoiceComponent implements OnInit {
  lang;
  purchaseRespone: PurchaseResponse;
  printlink
  downloadlink
  linkNotNull: boolean;
  invoiceSpinner: boolean;
  policySpinner: boolean;
  documents
  togglePaymentMethod: boolean = false;
  Shreby:any
/* UI */
isLoading = false;
isFormValid = false;
isSubmitting: boolean;
emailToggle:boolean =false
smsToggle:boolean =false
whatsApplToggle:boolean =false
  /* Alert */
  errorMessage;
  successMessage;
  isErrorAlertVisible;
  isSuccessAlertVisible;
  validationErrors: string[];

   /* Modal */
   isContinuationModalDisplayed = false;
   SharebyFormGroup:FormGroup<ManagedFormsTypes['SharebyFormGroup']>;

   @ViewChild('SharbyModal') SharbyModal: ElementRef;
  constructor(private appService: AppService,
    private formsManager: NgFormsManager<ManagedFormsTypes>,
    private http: HttpClient,
     private invoiceService: InvoiceService,
     private modalService: NgbModal, 
     private fb: FormBuilder,) { }
  ngOnInit() {
    window.scroll({ top: 0 })
    // Get the checkout ID from URL and check the payment status
    this.appService.getAppLang().subscribe(appLang => (this.lang = appLang));
    this.getPurchaseResponse();
    this.documents=this.invoiceService.download(this.purchaseRespone.documents[0].url).subscribe(blob => {
      this.policySpinner = false
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = 'Policy.zip';
      a.click();
      URL.revokeObjectURL(objectUrl);
      console.log("objectUrl", objectUrl)
    })
  }
  initForm(): void {
    this.SharebyFormGroup=this.fb.group({
      phoneNumber:[null, [Validators.required]],
      email:[ '',Validators.compose([Validators.required,Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),]), ],
      message:[this.purchaseRespone.documents[0].url],
    })   
    this.formsManager.upsert(ManagedForms.SharebyFormGroup, this.SharebyFormGroup, {persistState: true});

    
      }
  downloadPdf(pdfUrl: string, pdfName: string) {
    FileSaver.saveAs(pdfUrl, pdfName);
  }
  getCompanyLogo(): string {
    return environment.apiAssetsUrl + 'IC/' + this.purchaseRespone.insuranceCompanyLogo;
  }

  getPurchaseResponse() {
    this.purchaseRespone = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.PurchaseResponse));
    //console.log(this.purchaseRespone.insuranceCompany.logo + "teeesst")
  } 
  download(): any {
    console.log("tootaaal", this.purchaseRespone.documents[1].url)
    //  if(this.purchaseRespone.documents[1].url==null )
    //  {
    //    this.linkNotNull=true
    //  }else{
    this.invoiceSpinner = true

    this.invoiceService.download(this.purchaseRespone.documents[1].url).subscribe(blob => {
        this.invoiceSpinner = false
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Invoice.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
        console.log("objectUrl", objectUrl)
      },
        err => {
          this.invoiceSpinner = true;
          setTimeout(() => { this.invoiceSpinner = false; }, 3000);
        }
      )



  }
   openWhatsApp() {  
     console.log("ddddddd",this.purchaseRespone)      
    window.open('https://web.whatsapp.com://send?'+this.documents);      


  }  
  openEmail() {     
    window.open('mailto:?subject'+this.documents);      
      } 
      openSMS(){
/*         window.open('sms:009653456789999?009653456789999');    
 */    /*  this.invoiceService.shareBySmS() */

}

sharebyTogel(){
  this.emailToggle = !this.emailToggle ;
}
smsTogglee(){
  this.smsToggle=!this.smsToggle
}
whatsApplTogglee(){
  this.whatsApplToggle=!this.whatsApplToggle
}
submit(){
  this.isLoading = true;
  this.isSubmitting = true;
  // Construct user registration payload object
  const Share: SharebyFormGroup = {
    phoneNumber:this.SharebyFormGroup.get("phoneNumber").value,
     email: this.SharebyFormGroup.get("email").value,
     message: "dddddd",
  };
  
this.invoiceService.shareByemail(Share).subscribe((res: any) => {
     // Stop the loader
     this.isLoading = false;
console.log("sssssssssssssssssss")
     this.Shreby = res;
     
    
  },
  (err) => {
     // Close modal on server error
     if (err.status == 0 || err.status == 500) console.log(err) /* this.closeModal.emit(); */
     // Stop the loader
     this.isLoading = false;
     // Display error alert
/*      this.displayAlert('ErrorAlert', err.error);
 */
  }
);
 }
  Print() {
    this.policySpinner = true;
    if (this.purchaseRespone.documents[0].url.startsWith("a")) {
      this.invoiceService.download(this.purchaseRespone.documents[0].url).subscribe(blob => {
          this.policySpinner = false
          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)
          a.href = objectUrl
          a.download = 'Policy.zip';
          a.click();
          URL.revokeObjectURL(objectUrl);
          console.log("objectUrl", objectUrl)
        })
    } else {
      this.invoiceService.printPolicy(this.purchaseRespone.documents[0].url).subscribe(blob => {
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
          }
        )
    }


  }


  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  
  openShreBy(SharbyModal: any) {
    // Open the modal
   // If closed
      if (!this.isContinuationModalDisplayed) {
         // Open the modal
         this.modalService.open(SharbyModal, {
            size: 'md',
            centered: true,
            beforeDismiss: () => {
               // Switch flag when dissmissed to uncheck the checkbox
               this.isContinuationModalDisplayed = false;
               // Close the modal
               return true;
            }
         });
         // Set flag to check the checkbox
         this.isContinuationModalDisplayed = true;
      }
    
    }
}