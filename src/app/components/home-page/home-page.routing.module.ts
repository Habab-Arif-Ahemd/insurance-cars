import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { PrivacyPolicypageComponent } from '../shared/layout/footer/privacy-policypage/privacy-policypage.component';
import { TermsConditionsPageComponent } from '../shared/layout/footer/terms-conditions-page/terms-conditions-page.component';
import { HomePageComponent } from './home-page.component';
import {ContactUsComponent} from "src/app/components/home-page/contact-us/contact-us/contact-us.component"
import { QuestionsComponent } from '../shared/layout/footer/questions/questions.component';
import { ErrorComponent } from '../shared/pages/loading/error/error/error.component';

const routes: Routes = [
   { path: AppRoutes.landing, component: HomePageComponent },
   { path: AppRoutes.termandconditions, component: TermsConditionsPageComponent},
   { path: AppRoutes.QuestionsComponent, component: QuestionsComponent},
   { path: AppRoutes.privacyPolicy, component: PrivacyPolicypageComponent},
   { path: AppRoutes.ContactUs, component: ContactUsComponent},
   { path: AppRoutes.error, component: ErrorComponent},

];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class HomePageRoutingModule { }
