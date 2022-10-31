import { Routes } from '@angular/router';
import { CheckoutInvoiceComponent } from './checkout-invoice/checkout-invoice.component';
import { QuotePreviewComponent } from './quote-preview/quote-preview.component';
import {DirectAccessGuard} from "src/app/helpers/guards/direct-access.guard"


export const Checkout_ROUTES: Routes = [
  { path: '',  canActivate: [DirectAccessGuard],component: QuotePreviewComponent},
  { path: 'status', component: CheckoutInvoiceComponent},

];
