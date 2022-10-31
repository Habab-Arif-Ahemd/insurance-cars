import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-terms-conditions-page',
  templateUrl: './terms-conditions-page.component.html',
  styleUrls: ['./terms-conditions-page.component.css']
})
export class TermsConditionsPageComponent implements OnInit {

  constructor( private appService: AppService) { }
  lang;
  hasScrolledBanner: boolean = false;
  ngOnInit(): void {
    this.appService.getAppLang().subscribe(appLang => (this.lang = appLang));
    window.scroll({ top: 0 })
  }

}
