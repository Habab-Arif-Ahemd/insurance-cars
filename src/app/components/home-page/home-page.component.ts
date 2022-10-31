import { Component, OnInit } from '@angular/core';
import {  Validators } from '@angular/forms';
import { NgFormsManager } from '@ngneat/forms-manager';
//import { url } from 'inspector';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ManagedForms, ManagedFormsTypes } from 'src/app/models/insurance-steps/ManagedFormsTypes';
import { Product } from 'src/app/models/quote/Product';
import { AppService } from 'src/app/services/app/app.service';
import { InsuranceStepsApiService } from 'src/app/services/insurance-steps/insurance-steps-api.service';
import { BaseModel } from '../../models/master-table/BaseModel'
import{ContactusFormGroupHomepage}from 'src/app/models/insurance-steps/ManagedFormsTypes'
import {  FormBuilder,FormGroup } from '@ngneat/reactive-forms';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { AppRoutes } from 'src/app/models/app/AppRoutes';

/* dfdfd */
@Component({
   selector: 'app-home-page',
   templateUrl: './home-page.component.html',
   styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  /* form */

  ContactusFormGroupHomepage:FormGroup<ManagedFormsTypes['ContactusFormGroupHomepage']>;
  Contactus:any
  /* UI */
  isLoading = false;
  isFormValid = false;
  isSubmitting: boolean;
    /* Alert */
    errorMessage;
    successMessage;
    isErrorAlertVisible;
    isSuccessAlertVisible;
    validationErrors: string[];
    contactType = [
      { id: 1, name: 'Phone',nameAr: 'رقم الهاتف' },
      { id: 2, name: 'Email',nameAr: 'البريد الالكتروني' },
  ];
  
   // Data
   productType: BaseModel[] = [
      {
         id: "1",
         name: "Third-Party Vehicle Insurance",
         nameAr: "تأمين مركبات طرف ثالث (ضد الغير)"
      },
      {
         id: "2",
         name: "Comprehensive Vehicle Insurance",
         nameAr: "تأمين مركبات شامل"
      }
   ];
   selectedProductTypes: number;
   name: string;
   nameAr: string;
   AppRoutes: any = AppRoutes;
   /* ----------------------- steps for timer in sllider ----------------------- */
   isActiveStep: number = 1;
   showgregoianDate: boolean = false;
   customOptions: OwlOptions = {
      loop: true,
      margin: 10,
      nav: false,
      dots: true,
      rtl: false,
      center: true,
      smartSpeed: 2000,
      autoplay: true,
      responsive: {
         0: {
            items: 1
         },
         600: {
            items: 3
         },
         992: {
            items: 1
         }
      }

   };
   customOptions2: OwlOptions = {
      loop: true,
      margin: 10,
      nav: false,
      dots: true,
      rtl: false,
      center: true,
      autoplay: true,
      smartSpeed: 3000,
      responsive: {
         0: {
            items: 1
         },

         600: {
            items: 4
         },
         992: {
            items: 5
         }
      },

   };
   /* -------------------------------------------------------------------------- */
   /*                             parteners carousol                             */
   /* -------------------------------------------------------------------------- */
   partnersCarouselOpts: OwlOptions = {
      margin: 0,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      dots: false,
      // nav: true,
      navSpeed: 700,
      // navText: ['&#8249', '&#8250;'],
      responsive: {
         0: {
            items: 2,
         },
         400: {
            items: 2,
         },
         500: {
            items: 3,
         },
         700: {
            items: 3,
         },
         900: {
            items: 5,
         },
      },
      responsiveRefreshRate: 50,
   };


   commonQestions: any[] = [
      {
         id: "q1",
         questionar: " ما هو أمنت وما هي الخدمة التي يقدمها ",
         questionen: "What is Ammant and What it's services ?",

         answerar:
            " أمنت هو منصة إلكترونية مصرحة من قبل مؤسسة النقد وتقدم خدمة مقارنة وشراء و وثائق التأمين بشكل إلكتروني وتملكها شركة المأمون لوساطة التأمين.",
         answeren: "Ammant is an electronic platform authorized by the Monetary Agency and provides a service to compare and purchase insurance policies in electronic form and is owned by Al-Mamoun Insurance Brokerage Company.  ",
         isActive: false
      },
      {
         id: "q2",
         questionar: "كيف يمكنني شراء وثيقة التأمين  ؟",
         questionen: "How can I buy insurance quote ?",
         answerar:

            "قم بإدخال معلومات المركبة التي ترغب في شراء وثيقة تأمين لها ومعلومات مالك المركبة" +
            "أختر نوع التغطية التأمينية المطلوبة" +
            "ستظهر لك قائمة بشركات التأمين المتوفرة للتأمين الذي اخترته، حيث يمكنك مقارنة الأسعار والمزايا حسب رغبتك، ومن بعدها يمكنك اختيارالشركة التي ترغب بها" +
            "بعد إختيارالشركة، قم بسداد قيمة وثيقة التأمين من خلال وسائل الدفع المتاحة  سيتم اصدار الوثيقة بشكل فوري وإرسالها عبر البريد الالكتروني المسجل لدينا.",
         answeren:
            "Enter the vehicle information you want to purchase an insurance policy for it and the vehicle owner's information" +
            "Choose the type of insurance coverage required " +
            "List of insurance companies will appear for your insurane that you choosed , then you can compare prices and features as you wish , after that you can choose the company you want" +
            " After chossen the company, Pay the amount of the insurance policy through the available payment methods The document will be issued immediately and sent it for you with our registered email",
         isActive: false
      },

      {
         id: "q3",
         questionar: " ماذا يشمل سعر وثيقة التأمين  ؟",
         questionen: "What included in insurance quote price ?",
         answerar:
            "السعر المعروض هو القيمة الكلية لقيمة وثيقة التأمين المطلوب. ويشمل السعر أيضا رسوم الضرائب و الرسوم بالإضافة إلى عمولة الوسيط كما يتم خصم عدم وجود مطالبات بعد التحقق من نجم.",
         answeren: "The displayed price is the total value of the required insurance policy. The price also includes taxes and fees in addition to the broker's commission and no claims are deducted after the Najm verification. ",
         isActive: false
      },
      /*  {
         id: "q4",
         question: "كيف أستطيع إلغاء وثيقة التأمين",
         answer:
           " لا يقوم Concord بإلغاء وثيقة التأمين وفي حال رغبتكم بالإلغاء بإمكانكم مراجعة شركة التأمين التي قامت بإصدار وثيقة التأمين.",
       }, */
      {
         id: "q5",
         questionar: "ماهي وسائل الدفع الممكنة لشراء وثيقة التأمين  ؟",
         questionen: "What is available payment way for buying insurance quotes ?",
         answerar:
            "يتيح أمنت خيارات الدفع التالية:" +
            " بطاقات فيزا , ماستر كارد , مدى , حساب سداد .",
         answeren: "Visa cards, Master Card , Mada and SADAD Account",
         isActive: false
      },
      {
         id: "q6",
         questionar: " هل موقع أمنت آمن للدفع الإلكتروني  ؟",
         questionen: "Is Ammant website safe for E-payment ?",
         answerar:
            "يضمن أمنت تجربة دفع آمنة 100% من خلال شريكنا في عملية الدفع الإلكتروني والتي تقوم بتشفير تفاصيل الدفع قبل نقلها باستخدام أحدث تقنيات التشفير الالكتروني والتي تتبع أعلى معايير الأمان بالإضافة الى انه لا يتم تخزين أرقام بطاقات الائتمان على أنظمتنا ولا نقوم بأخذ تفاصيل البطاقة عن طريق الهاتف أو البريد الالكتروني .",
         answeren: "Ammant guarantees a 100% secure payment experience through our online payment partner , Which encrypts payment details before they are transmitted using the latest electronic encryption technology , Which follow the highest safety standards , In addition, credit card numbers are not stored in our systems and we do not collect card details by phone or email",
         isActive: false
      },
   ];
   ourServices: any[] = [
      {
         // url: "../../../assets/img/app-landing/steps.svg"
         id: 1,
         icon: '../../../assets/img/Icon-png/verify.png',
         titleAr: " خطوات سهلة وسريعة ",
         titleEn: "Quick and easy steps",
         descAr: " توفر منصة أمنت جميع عروض الأسعار بخطوات سهلة وسريعة لا تتجاوز دقائق من وقتك",
         descEn: "Ammant platform provides all quotes in easy and fast steps that do not exceed minutes of your time"
      },
      {
         id: 2,
         icon: '../../../assets/img/Icon-png/receipt-disscount.png',
         titleAr: " أسعار تنافسية ",
         titleEn: "Competitive prices",
         descAr: " بحكم علاقاتنا القوية مع شركات التأمين المرخصة من قبل البنك المركزي السعودي نوفر أسعار التأمين بشكل تنافسي في منصة واحدة",
         descEn: "By our strong relationships with insurance companies that licensed by the Central Bank of Saudi Arabia, we provide insurance rates competitively in one platform"
      },
      {
         id: 3,
         icon: '../../../assets/img/Icon-png/support-alt.png',
         titleAr: " دعم فني",
         titleEn: " Technical Support ",
         descAr: " نوفر لك الدعم الفني على مدار الساعة لحل أي مشكلة تقنية بشكل سريع للغاية",
         descEn: "We provide you with around-the-clock technical support to solve any technical problem very quickly"
      },

      {
         id: 4,
         icon: '../../../assets/img/Icon-png/card-pos.png',
         titleAr: " خيارات الدفع",
         titleEn: "Payment Options",
         descAr: "خيارات الدفع المتاحة عبر المنصة هي الخيارات الموافق عليها من قبل البنك المركزي السعودي. متعددة ومريحة. ",
         descEn: "The payment options available via the platform are the options approved by the Saudi Central Bank. Versatile and convenient"
      },

   ];

   isCollapsed: boolean = false;
   isContactTypeEmail:boolean = true;
   isContactTypeIsPhone: boolean = false;
   selectedContactType: number = 1;
   val: string;
   lang: string;
   constructor(
      private fb: FormBuilder,
      private formsManager: NgFormsManager<ManagedFormsTypes>,
      private countactUsService:InsuranceStepsApiService,
      private appService: AppService,
   ) { }

   ngOnInit(): void {     
 /*       if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
  } else {
    localStorage.removeItem('foo') 
  } */
      this.initForm();
      this.setTimer();
      this.getStepData();
      /* setTimeout(() => (  window.location.reload()
      ), 1000);   */ }

   initForm(): void {
      
      this.ContactusFormGroupHomepage=this.fb.group({
         name:[null, [Validators.required]],
         phoneNumber: [null,Validators.compose([Validators.required, Validators.minLength(9)])],
         email: [
            null,
            Validators.compose([
              Validators.required,
              Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
            ]),
          ],
        insuranceTypeId:[2, [Validators.required]],
        contactType:[1,Validators.required]
      })   
       this.formsManager.upsert(ManagedForms.ContactusFormGroupHomepage, this.ContactusFormGroupHomepage, {persistState: true});
       this.clearForm();
        }


        get ContactusForm() {
         return this.ContactusFormGroupHomepage.controls;
       }
   // set timer for steps
   setTimer() {
      setInterval(() => {
         this.isActiveStep += 1;
         if (this.isActiveStep == 4) {
            this.isActiveStep = 1
         }
      }, 5000);
   }
   getStepData() {
      /* get master table data */
      /* TODO: Move master table request from quotation request page to landing page */
      this.appService.getAppLang().subscribe((language) => {
         this.lang = language;
      });
   }  private clearForm(): void {
      this.ContactusFormGroupHomepage.reset();
    }


   //   selectProductType(productId) {
   //    productId = this.productType.forEach(productId => id );

   //    if (productId == 2) {
   //       this.productType.name
   //      this.nameAr = this.productType.nameAr
   //    } else {
   //       this.name = this.productType.name
   //       this.nameAr = this.productType.nameAr
   //    }
   //  }
   //  setBirthDateValue(date: any) {
   //   if (this.showgregoianDate) this.f.birthDateG.setValue(AppUtils.formatDate(date));
   //   if (this.showHijriDate) this.f.birthDateH.setValue(AppUtils.formatDate(date));
   // }
   selectContactType(val){
      this.selectedContactType = val.id;
      if (this.selectedContactType == 2) {
        this.isContactTypeEmail = true; 
        this.isContactTypeIsPhone = false
      } else {
        this.isContactTypeIsPhone = true;
        this.isContactTypeEmail = false
      }
   }
   submit(){;
      this.isLoading = true;
      this.isSubmitting = true;
      // Construct user registration payload object
      console.log("this.ContactusFormGroupHomepage.get(.value ",this.ContactusFormGroupHomepage.get("name").value)
      console.log("this.ContactusFormGroupHomepage.get(.value ",this.ContactusFormGroupHomepage.get("phoneNumber").value)
      console.log("this.ContactusFormGroupHomepage.get(.value ",this.ContactusFormGroupHomepage.get("insuranceTypeId").value)
      console.log("this.ContactusFormGroupHomepage.get(.value ",this.ContactusFormGroupHomepage.get("contactType").value)

      const contactus: ContactusFormGroupHomepage = {
        name:this.ContactusFormGroupHomepage.get("name").value,
        phoneNumber: this.ContactusFormGroupHomepage.get("phoneNumber").value,
        insuranceTypeId: this.ContactusFormGroupHomepage.get("insuranceTypeId").value,
        contactType: this.ContactusFormGroupHomepage.get("contactType").value,
      };
     this.countactUsService.contactUsHomePage(contactus).subscribe((res: ContactusFormGroupHomepage) => {
         // Stop the loader
           this.Contactus = res;
        console.log("contactUs 1",this.Contactus )
        this.isLoading = false;

        
      },
      (err) => {
         // Close modal on server error
         if (err.status == 0 || err.status == 500) console.log(err) /* this.closeModal.emit(); */
         // Stop the loader
         // Display error alert
         this.isLoading = false;
          this.displayAlert('ErrorAlert', err.error);

      }
    );
     }
     private displayAlert(alertType: 'ErrorAlert' | 'SuccessAlert', apiResponse: ApiResponse): void {
      switch (alertType) {
        case 'ErrorAlert':
          // Set error message
          this.errorMessage = apiResponse.responseMessage;
  console.log( "this.errorMessage", this.errorMessage)
          // Set validation errors
          if (
            apiResponse.validationErrors &&
            apiResponse.validationErrors.length > 0
          ) {
            // Init empty array
            let errorsArr: string[] = [];
  
            // Push the errors into the array
            apiResponse.validationErrors.forEach((err) =>
              errorsArr.push(err.description)
            );
  
            // Set the validation errors
            this.validationErrors = errorsArr;
          } else {
            this.validationErrors = null;
          }
  
          // Display alert
          this.isErrorAlertVisible = true;
  
          // Hide after timeout
          setTimeout(() => (this.isErrorAlertVisible = false), 10000);
  
          break;
        case 'SuccessAlert':
          // Set the success message
          this.successMessage = apiResponse.responseMessage;
  
          // Display alert
          this.isSuccessAlertVisible = true;
  
          // Hide after timeout
          setTimeout(() => (this.isSuccessAlertVisible = false), 10000);
  
          break;
         default:
          break;
      }
    }
  
   }