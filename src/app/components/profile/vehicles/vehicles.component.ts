import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/profile/Vehicle';
import { AppService } from 'src/app/services/app/app.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  /* Data */
  results: any;
  vehiclesListOption: any;
  vehicles: Vehicle[] = [];
  searchVehicle: Vehicle[] = [];
  vehicleId: number;
  filteredVehicle: Vehicle[] = [];
  lang: any;
  isLoadingVehicles: boolean = false;

  constructor(
    private profileService: ProfileService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.appService.getAppLang().subscribe((language) => {
      this.lang = language;
    });

    this.getVehicles();
    this.getVehiclesListOption();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  /* get list of vehicles */

  getVehiclesListOption() {
    this.profileService.getVehicles().subscribe((vehicles: any) => {
      this.vehiclesListOption = vehicles.data;
    });
  }

  getVehicles() {
    this.isLoadingVehicles = true;
    this.profileService.getVehicles().subscribe((vehicles: any) => {
      this.vehicles = vehicles.data;
   
      this.isLoadingVehicles = false;
      console.log(this.vehicles);
    });
  }

  onChange(selectedOptions) {
    if (selectedOptions == '') {  
      this.getVehicles();
    } else 
    
    this.isLoadingVehicles = true;
    this.vehicles.length = 0;
    for (let i = 0; i < selectedOptions.length; i++) {
      this.profileService.getVehicles().subscribe((vehicles: any) => {
        const result = vehicles.data.find(
          ({ vehicleId }) => vehicleId == selectedOptions[i]
        );
        console.log(result);
        this.vehicles.push(result);
        console.log(this.vehicles);
     
      });
    }
    this.isLoadingVehicles = false;
  }
}
