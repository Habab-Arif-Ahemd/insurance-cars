import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LoadingPageTypes } from 'src/app/models/app/LoadingPageTypes';
import { AppService } from 'src/app/services/app/app.service';


@Component({
   selector: 'app-steps-wizard',
   templateUrl: './steps-wizard.component.html',
   styleUrls: ['./steps-wizard.component.css']
})
export class StepsWizardComponent implements OnInit {

   activeStep: any = {
      insuredInfo: true,
      vehicleInfo: false,
      quotes: false,
      checkout: false,
      status: false,
   }
   hasScrolledBanner: boolean = false;
   isLoadingQuotes: boolean;

   constructor(private router: Router, private appService: AppService) { }

   ngOnInit(): void {
      this.watchNavigation();
      this.switchActivePage(this.router.url.replace('/request/', ''))
      this.watchLoader();
   }

   watchLoader() {
      this.appService.getActiveLoadingPageType().subscribe(loader => {
         loader === LoadingPageTypes.QuotationLoading ? this.isLoadingQuotes = true : this.isLoadingQuotes = false
      })
   }
   watchNavigation() {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
         event.url = event.url.replace('/request/', '');
         console.log(event.url)
         this.switchActivePage(event.url);
      });
   }

   switchActivePage(url: string) {

      if (url === AppRoutes.MotorRoutes.insuredInfo) {
         this.activeStep.insuredInfo = true;
         this.activeStep.vehicleInfo = false;
         this.activeStep.quotes = false;
         this.activeStep.checkout = false;

      } else if (url === AppRoutes.MotorRoutes.vehicleInfo) {
         this.activeStep.insuredInfo = false;
         this.activeStep.vehicleInfo = true;
         this.activeStep.quotes = false;
         this.activeStep.checkout = false;

      } else if (url === AppRoutes.MotorRoutes.quotes) {
         this.activeStep.insuredInfo = false;
         this.activeStep.vehicleInfo = false;
         this.activeStep.quotes = true;
         this.activeStep.checkout = false;
      }
      else if (url === AppRoutes.MotorRoutes.checkout) {
         this.activeStep.insuredInfo = false;
         this.activeStep.vehicleInfo = false;
         this.activeStep.quotes = false;
         this.activeStep.checkout = true;
      }
      else  {
         this.activeStep.insuredInfo = false;
         this.activeStep.vehicleInfo = false;
         this.activeStep.quotes = false;
         this.activeStep.status = true;
      }
   }

   enterToStep(stepName: string) {
      console.log(stepName)
      let currentUrl = this.router.url.replace('/request/', '');

      if (stepName === this.router.url) return;

      if (stepName === 'insured-info') {

         if (currentUrl === 'checkout' || currentUrl === 'quotes' || currentUrl === 'vehicle-info') {

            this.router.navigate([AppRoutes.MotorRoutes.request + '/' + AppRoutes.MotorRoutes.insuredInfo]);
         }
      }
      if (stepName === 'vehicle-info') {

         if (currentUrl === 'checkout' || currentUrl === 'quotes') {

            this.router.navigate([AppRoutes.MotorRoutes.request + '/' + AppRoutes.MotorRoutes.vehicleInfo]);
         }
      }
      if (stepName === 'quotes') {

         if (currentUrl === 'checkout') {
            this.router.navigate([AppRoutes.MotorRoutes.request + '/' + AppRoutes.MotorRoutes.quotes]);
         }
      }
      if (stepName === 'checkout') return;
   }

   // Window scroll events
   @HostListener("window:scroll", ["$event"])
   onScroll(event) {
      if (window.pageYOffset > 100)
         this.hasScrolledBanner = true;
      else this.hasScrolledBanner = false;
   }

}
