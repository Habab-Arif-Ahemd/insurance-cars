import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';
import { InsuranceStepsData } from 'src/app/models/master-table/InsuranceStepsData';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ProfileService } from "src/app/services/profile/profile.service";
import { IdentityResponse ,Identity} from "src/app/models/profile/Identity";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { NgFormsManager } from "@ngneat/forms-manager";
import { ManagedForms, ManagedFormsTypes } from "src/app/models/insurance-steps/ManagedFormsTypes";
import { LocallyStoredItemsKeys } from "src/app/models/app/LocallyStoredItemsKeys";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { AppService } from 'src/app/services/app/app.service';
import { Dashboard } from 'src/app/models/profile/Dashboard';

@Component({
  selector: 'app-identities',
  templateUrl: './identities.component.html',
  styleUrls: ['./identities.component.css']
})

export class IdentitiesComponent implements OnInit {
  identities: Identity[] ;
  lang;
  isLoadingIdentitiesList: boolean = false;
  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private formsManager: NgFormsManager<ManagedFormsTypes>,
    private insuranceStepsService:InsuranceStepsService ,
    private profileSarvices: ProfileService, 
  ) { }
  dashboard?: Dashboard;
  policies: any[];

  ngOnInit(): void {
    this.getIdentities();
    this.getDashboard()

    this.appService.getAppLang().subscribe(appLang => (this.lang = appLang));
  }

  getDashboard(){
    this.profileSarvices.getPolicies().subscribe((dashboard:any)=>{
      this.dashboard=dashboard;
      this.policies = dashboard.policies;
      console.log(dashboard);
    });


  } 


  getIdentities() {
    this.isLoadingIdentitiesList = true;
    this.profileService.getIdentities().subscribe((res: IdentityResponse) => {
    this.identities =res.data;
    }, (err) => console.log(err),
      () => this.isLoadingIdentitiesList = false
    )
  }

  selectIdentity(identity: any) {
    console.log("dddd",identity)
    // read identity response from the table 
    // pass the respose to constructPreviousClientDate
    // fill the  main driver info form with the response 
    this.insuranceStepsService.setSelectIdentity(identity)
    this.router.navigateByUrl("/user/newPolicy/vehicle");
  }
 
  navigateToQuotation() {
    localStorage.setItem('QuoteFromProfile', 'true');

    this.router.navigateByUrl("/request/insured-info");
    //TODO: after naviagte to quotation request clear the storedItems
  }    

   /**
     * Deletes previous quotation request data from local storage
     *
     * @memberof IdentitiesComponent
     */
    private clearLocallyStoredItemsKeys() {

      if (localStorage.getItem(LocallyStoredItemsKeys.FormManager)) {
  
        this.formsManager.clear(ManagedForms.MainDriverInsuranceForm);
        this.formsManager.clear(ManagedForms.VehicleInsuranceForm);
        this.formsManager.clear(ManagedForms.DriversMoreDetails);
      }
      if (localStorage.getItem(LocallyStoredItemsKeys.UserAdditionalDrivers)) localStorage.removeItem(LocallyStoredItemsKeys.UserAdditionalDrivers);
      if (localStorage.getItem(LocallyStoredItemsKeys.UserQuoteResponse)) localStorage.removeItem(LocallyStoredItemsKeys.UserQuoteResponse);
      if (localStorage.getItem(LocallyStoredItemsKeys.PreviewQuoteResponse)) localStorage.removeItem(LocallyStoredItemsKeys.PreviewQuoteResponse);
  
    }
  
addVehicle(){
  
}

}
