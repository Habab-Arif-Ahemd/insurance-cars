import { Routes } from '@angular/router';
import { QuotesPageComponent } from './quotes-page/quotes-page.component';
import {DirectAccessGuard} from "src/app/helpers/guards/direct-access.guard"

export const QUOTES_PAGE_ROUTES: Routes = [
  { path: '', canActivate: [DirectAccessGuard],component:  QuotesPageComponent}

];
