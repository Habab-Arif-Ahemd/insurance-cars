import { SavedQuote } from './../../../models/profile/SavedQuote';
import { ProfileService } from './../../../services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { PreviewQuoteResponse } from "src/app/payload/responses/quotes/PreviewQuoteResponse";
import { LocallyStoredItemsKeys } from "src/app/models/app/LocallyStoredItemsKeys";
import { Router } from "@angular/router";
import { AppRoutes } from "src/app/models/app/AppRoutes";
import { environment } from "src/environments/environment";
import { TimerProperties } from "src/app/models/quote/TimerProperties";
import { AppService } from "src/app/services/app/app.service";

@Component({
  selector: 'app-saved-quotes',
  templateUrl: './saved-quotes.component.html',
  styleUrls: ['./saved-quotes.component.css'],
})
export class SavedQuotesComponent implements OnInit {timer: TimerProperties = { hours: 0, minutes: 0, seconds: 0, isOver: false };

isLoadingUserPolicies = false;
savedQuotes: SavedQuote[] = [];
vehicleLogoSrc: string = environment.apiAssetsUrl;
lang: any;
page = 4;
pageSize = 6;

constructor(
  private profileService: ProfileService,
  private router: Router,
  private appService: AppService
) {}

ngOnInit() {
  window.scrollTo(0, 0);
  this.getSavedQuote();
  this.getAppLang();
}

getAppLang() {
  this.appService.getAppLang().subscribe((lang) => (this.lang = lang));
}

getSavedQuote() {
  this.isLoadingUserPolicies = true;
  this.profileService.getSavedQuotes().subscribe(
    (savedQuote: SavedQuote) => {
      this.savedQuotes = savedQuote.data;
      savedQuote.btnLoader = false;
      this.isLoadingUserPolicies = false;
      console.log('Saved Quotes', this.savedQuotes )
    },
    (err) => {
      console.log(err);
    },
    () => {
      /* TODO:  Invoke finally method in all quotation request page */
      this.initQuoteTimer();
    }
  );
}

/**
 * Initializes the quote's product count down timer and keeps counting
 */
initQuoteTimer(): void {
  // Every second
  let interval = setInterval(() => {
    // Go through each saved quotes
    this.savedQuotes.forEach((quote: SavedQuote) => {
      /* And update its timer */
      const endDate = new Date(quote.quotationEndDate).getTime();
      const currentDate = new Date().getTime();
      let offset = endDate - currentDate;
      quote.timer = {
        hours: Math.floor(offset / (1000 * 60 * 60)),
        minutes: Math.floor((offset / 1000 / 60) % 60),
        seconds: Math.floor((offset / 1000) % 60),
        isOver: false,
      };

      if (offset < 0) {
        /* Set as expired */
        clearInterval(interval);
        quote.timer.isOver = true;
      }
    });
  }, 1000);
}

buySavedQuote(id: string) {
  this.savedQuotes.forEach((qoute) => {
    qoute.btnLoader = false;
    if (id == qoute.id) {
      qoute.btnLoader = true;
    }
  });
  this.profileService
    .getSavedQuote(id)
    .subscribe((res: PreviewQuoteResponse) => {
      localStorage.setItem( LocallyStoredItemsKeys.PreviewQuoteResponse, JSON.stringify(res));
      this.router.navigateByUrl(AppRoutes.MotorRoutes.request + "/" + AppRoutes.MotorRoutes.checkout);

    });
}
}

 