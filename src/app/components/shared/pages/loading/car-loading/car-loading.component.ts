import { Component, OnInit } from '@angular/core';
import { LoadingPageTypes } from 'src/app/models/app/LoadingPageTypes';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-car-loading',
  templateUrl: './car-loading.component.html',
  styleUrls: ['./car-loading.component.css']
})
export class CarLoadingComponent implements OnInit {
  type: LoadingPageTypes;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    window.scroll({top: 0});
    this.initLoadingType();
  }
  initLoadingType() {
    // Get active loading type
    this.type = this.appService.getActiveLoadingPageType().value;
 }

}
