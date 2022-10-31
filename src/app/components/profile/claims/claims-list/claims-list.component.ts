import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClaimsComponent } from 'src/app/components/profile/claims/claims.component';
import { Claim } from 'src/app/models/profile/Claim';


@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css'],
})
export class ClaimsListComponent implements OnInit {
  // Data

  claimList: boolean = true;
  claimForm: boolean = false;
  claimDetails: boolean = false;



  @Output() showForm = new EventEmitter();
  claims: { claimNo: string; status: string; statusId: number; date: string; Details: string; showFullDetail?: boolean}[];

  constructor() {}

  ngOnInit(): void {
    this.getClaim();
    }

  getClaim(){
    this.claims = [
      { claimNo: 'CL-2020-10001', status: 'مرفوض',statusId:3, date: '11/20/2020, 12:34:42 PM', Details: 'حادث مرور في شارع البلدية تقاطع طريق المدينة، مرفق تقرير الحادث' },
      { claimNo: 'CL-2020-10002', status: 'تم الإصلاح',statusId:1, date: '11/21/2020, 1:44:34 PM', Details: 'حادث مرور في  شارع العروبة تقاطع طريق الملك فهد ، مرفق تقرير الحادث' },
      { claimNo: 'CL-2020-10003', status: 'تحت الإصلاح',statusId:2, date: '11/22/2020, 3:30:54 PM', Details: 'حادث مرور في  شارع التخصصي تقاطع طريق مكة المكرمة ، مرفق تقرير الحادث' },
      { claimNo: 'CL-2020-10004', status: 'تحت الإصلاح',statusId:2, date: '11/24/2020, 2:57:10 PM', Details: 'حادث مرور في تقاطع شارع الستين مع العوالي، مرفق تقرير الحادث' },
      { claimNo: 'CL-2020-10005', status: 'مرفوض',statusId:3, date: '11/25/2020, 3:12:22 PM', Details: 'حادث مرور في تقاطع شارع عبد الله بن الحارث مع شارع الرياض، مرفق تقرير الحادث' },
      { claimNo: 'CL-2020-10006', status: 'تم الإصلاح',statusId:1, date: '11/30/2020, 1:12:19 PM', Details: 'حادث مرور في تقاطع طريق جدة القديم مع شارع عبدالله عريف، مرفق تقرير الحادث' },
    ];
    this.claims.forEach(claim => claim.showFullDetail = false);
  }


  showAddClaimForm() {
    this.claimForm = true;
    this.claimList = false;
  }

  showClaimList() {
    this.claimForm = false;
    this.claimList = true;
  }

  showDetails(): void {
    this.claimForm = false;
    this.claimList = false;
    this.claimDetails = true;
  }
}
