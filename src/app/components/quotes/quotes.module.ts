import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { QuoteOrderDataComponent } from './quote-order-data/quote-order-data.component';
import { QuoteComponent } from './quote/quote.component';
import { QuotesFiltersComponent } from './quotes-filters/quotes-filters.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { QuotesPageComponent } from './quotes-page/quotes-page.component';
import { QUOTES_PAGE_ROUTES } from './quotes.routes';
//import { QuoteOrderComponent } from './quote-order-data/quote-order-data.component';



@NgModule({
   imports: [
      CommonModule,
      SharedModule,
      FormsModule,
      RouterModule.forChild(QUOTES_PAGE_ROUTES),
   ],
   declarations: [
      QuotesPageComponent,
      QuoteComponent,
      QuotesListComponent,
      QuotesFiltersComponent,
      QuoteOrderDataComponent
   ]
})


export class QuotesModule { }
