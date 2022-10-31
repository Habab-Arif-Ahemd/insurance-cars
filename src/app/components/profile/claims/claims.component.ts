import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
})
export class ClaimsComponent implements OnInit {
  showClaimsList: boolean = true;
  ShowClaimForm: boolean = false;
  showClaimDetails: boolean  = false;
  constructor() {}

  showClaimForm(): void {
    this.showClaimsList = false;
    this.ShowClaimForm = true;
  }

  showClaimList(): void {
    this.showClaimsList = true;
    this.ShowClaimForm = false;
  }


  ngOnInit(): void {}
}
