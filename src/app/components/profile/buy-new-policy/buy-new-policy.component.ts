import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buy-new-policy',
  templateUrl: './buy-new-policy.component.html',
  styleUrls: ['./buy-new-policy.component.css']
})
export class BuyNewPolicyComponent implements OnInit {
  
  @Input() identityNumber: number;
  showIdentities: boolean = true;
  showVehicles: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  sendIdentity(id: number) {
    this.identityNumber = id;
    this.showIdentities = false;
    this.showVehicles = true;
  }
}
