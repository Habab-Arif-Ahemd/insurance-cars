import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutModule } from './components/checkout/checkout.module';
import { InsuranceStepsModule } from './components/insurance-steps/insurance-steps.module';
import { QuotesModule } from './components/quotes/quotes.module';
// import { TranslationModule } from './components/shared/translation.module';

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CheckoutModule,
    QuotesModule,
    InsuranceStepsModule,
    // TranslationModule,
    NgbModule
  ]
})
export class MotorModule { }
