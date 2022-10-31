import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common'
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Identity } from 'src/app/models/profile/Identity';
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  identities: Identity[] = [];
  ownerIdentity = false;
  vehicleRegisteredType = true;
  constructor(private location: Location , private profileService: ProfileService,) { }

  ngOnInit(): void {
    this.getIdentities();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  newInsurance(){
    this.vehicleRegisteredType = true;
    this.ownerIdentity = false;
  }
  transiferOwner(){
    this.ownerIdentity = true;
    this.vehicleRegisteredType = false;
  }
  getIdentities(){
    this.profileService.getIdentities().subscribe((identities:any)=>{
      this.identities.push(identities.data[0]);
      console.log(identities);
    });

  }
  
  back(): void {
    this.location.back()
  }
}
