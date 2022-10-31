import { Component, OnInit } from '@angular/core';
import { LoadingPageTypes } from 'src/app/models/app/LoadingPageTypes';
import { AppService } from 'src/app/services/app/app.service';


@Component({
   selector: 'app-loading',
   templateUrl: './loading.component.html',
   styleUrls: ['./loading.component.css']
})


export class LoadingComponent implements OnInit {


   type: LoadingPageTypes;


   constructor(private appService: AppService) { }


   ngOnInit() { 
      window.scroll({top: 0});
      this.initLoadingType();
      // TODO: Ask akram about this, this component for loading language switch as well, so switching language now sets step num to 6
      /* this.insuranceStepService.setCurrentStepNum(6); */
   }


   initLoadingType() {
      // Get active loading type
      this.type = this.appService.getActiveLoadingPageType().value;
   }

}
