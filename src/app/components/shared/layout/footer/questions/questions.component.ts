import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor( private appService: AppService) { }
  lang;
  hasScrolledBanner: boolean = false;
  ngOnInit(): void {
    this.appService.getAppLang().subscribe(appLang => (this.lang = appLang));
    window.scroll({ top: 0 })
  }

}
