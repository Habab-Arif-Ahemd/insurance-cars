import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFormsManager } from '@ngneat/forms-manager';
import { FormGroup } from '@ngneat/reactive-forms';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { ManagedForms, ManagedFormsTypes } from 'src/app/models/insurance-steps/ManagedFormsTypes';
import { Identity, IdentityResponse } from 'src/app/models/profile/Identity';
import { ClientVehicles, Vehicle } from 'src/app/models/profile/Vehicle';
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehiclesList: Vehicle[] = [];
  identities: Identity[];
  isLoading: boolean = false;
  IdentityNumber: number;
  vehicleInfoFormGroup: FormGroup<ManagedFormsTypes['VehicleInsuranceForm']>;
  insuranceSteps: any;


  constructor(private profileService: ProfileService,
    private router: Router,
    private insuranceStepsService: InsuranceStepsService,
    private formsManager: NgFormsManager<ManagedFormsTypes>,

  ) { }

  ngOnInit() {
    this.getIdentities();

    this.getClientVehciles();
  }

  getClientVehciles() {
    this.isLoading = true;
    /* const clientId =  localStorage.getItem('clientId');
    console.log("clientIdclientIdclientId",clientId); */
    console.log("",)
    this.profileService.getClientVehicles().subscribe((vehicles: ClientVehicles) => {
      this.isLoading = false;
      this.vehiclesList = vehicles.data;

    })
  }
  additionalDriverInfoForm: FormGroup;



  selectVehicle(vehicle) {


    this.insuranceStepsService.setSelectVehicle(vehicle);
    localStorage.setItem('QuoteFromProfileFill', 'true');
    localStorage.setItem('QuoteFromProfile', 'true');

    this.router.navigate([AppRoutes.MotorRoutes.request + '/' + AppRoutes.MotorRoutes.insuredInfo]);

  }

  getIdentities() {
    this.profileService.getIdentities().subscribe((res: IdentityResponse) => {
      this.identities = res.data;
    }
    )
  }

  AddVehicle(identity: any) {
    localStorage.setItem('QuoteFromProfileFill', 'true');
    localStorage.setItem('QuoteFromProfile', 'true');
    console.log("this.identitiesvvvvvvvvvvvvvv", this.identities)
    this.insuranceStepsService.setSelectIdentity(identity);

    this.insuranceStepsService.clearSelectVehicle();
  
  
 this.router.navigate([AppRoutes.MotorRoutes.request + '/' + AppRoutes.MotorRoutes.insuredInfo]);
    
  }
}