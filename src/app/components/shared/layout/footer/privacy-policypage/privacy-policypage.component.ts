import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
@Component({
  selector: 'app-privacy-policypage',
  templateUrl: './privacy-policypage.component.html',
  styleUrls: ['./privacy-policypage.component.css']
})
export class PrivacyPolicypageComponent implements OnInit {

  constructor(
    private appService: AppService) { }
    lang;

  ngOnInit(): void {
    this.appService.getAppLang().subscribe(appLang => (this.lang = appLang));
    window.scroll({ top: 0 })
  }
}
