import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CheckoutInvoiceComponent } from './checkout-invoice/checkout-invoice.component';
import { Checkout_ROUTES } from './checkout.routes';
import { QuotePreviewComponent } from './quote-preview/quote-preview.component';
@NgModule({
  declarations: [
    QuotePreviewComponent,
    QuotePreviewComponent,
    CheckoutInvoiceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(Checkout_ROUTES),
  ],
  exports: [ 
  ]
})
export class CheckoutModule { }
