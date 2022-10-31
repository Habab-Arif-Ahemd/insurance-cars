import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../services/app/app.service';

@Component({
  selector: 'app-new-claims',
  templateUrl: './new-claims.component.html',
  styleUrls: ['./new-claims.component.css']
})
export class NewClaimsComponent implements OnInit {
   //Datepicker
  //  today: Date = new Date();
  //  bsConfig: Partial<BsDatepickerConfig> = {
  //    isAnimated: true,
  //    containerClass: 'theme-blue',
  //    minDate: this.today,
  //  };

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {

  }
}
