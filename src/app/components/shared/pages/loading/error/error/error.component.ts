import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';
import { ErrorPageTypes } from './../../../../../../models/app/ErrorPageTypes';
import { ErrorService } from './../../../../../../services/app/error.service';


@Component({
   selector: 'app-error',
   templateUrl: './error.component.html',
   styleUrls: ['./error.component.css']
 })
 export class ErrorComponent implements OnInit {

   type: ErrorPageTypes;


   constructor(
      private router: Router,
      private errorService: ErrorService,
      private insuranceStepService: InsuranceStepsService
   ) { }


   ngOnInit() {
      window.scroll({top: 0});
      this.initErrorType();
   }


   initErrorType() {
      // Get active error type
      this.type = this.errorService.getActiveErrorPageType().value || ErrorPageTypes.ServerError;
   }


   rerouteError() {
      // Navigate to landing page
      this.router.navigate([AppRoutes.landing]);
      // Reset the insurance steps progress
   }

}
