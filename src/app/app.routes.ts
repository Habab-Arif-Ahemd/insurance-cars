import { MessageComponent } from './components/app-loading/message/message.component';
import { PROFILE_ROUTES } from './components/profile/profile.routes';
import { AppRoutes } from './models/app/AppRoutes';
import { MOTOR_ROUTES } from './motor-insurance.routes';
export const APP_ROUTES = [
  {
    path: AppRoutes.landing,
   

    loadChildren: () =>
      import('./components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },

  { path: AppRoutes.paymentStatus, component: MessageComponent},

  { path: AppRoutes.MotorRoutes.request, children: MOTOR_ROUTES },
  { path: AppRoutes.profile.profileMain, children: PROFILE_ROUTES }
];
