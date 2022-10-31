
import { StepsWizardComponent } from './components/shared/layout/steps-wizard/steps-wizard.component';
import { AppRoutes } from './models/app/AppRoutes';

export const MOTOR_ROUTES = [
   {
      path: '',
      component: StepsWizardComponent,
      children: [
         {
            // request/insured-info without quotation
            path: '',
            loadChildren: () => import('./components/insurance-steps/insurance-steps.module')
               .then(m => m.InsuranceStepsModule)
         },
         { 
            path: AppRoutes.MotorRoutes.quotes,
            loadChildren: () => import('./components/quotes/quotes.module')
               .then(m => m.QuotesModule)
         },
         {
            path: AppRoutes.MotorRoutes.checkout,
            loadChildren: () => import('./components/checkout/checkout.module')
               .then(m => m.CheckoutModule)
         },
         {
            path: AppRoutes.MotorRoutes.paymentStatus,
            loadChildren: () => import('./components/checkout/checkout.module')
               .then(m => m.CheckoutModule)
         },
         {
            path: '**',
            redirectTo: AppRoutes.MotorRoutes.insuranceSteps
         }
      ]
   }
];
