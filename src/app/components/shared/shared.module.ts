import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { SortByPipe } from 'src/app/helpers/pipes/SortBy.pipe';
/* ngx-bootstrap */
import { AuthComponent } from '../auth/auth.component';
import { ForgetPasswordComponent } from '../auth/forget-password/forget-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { VerifyAccountComponent } from '../auth/verify-account/verify-account.component';
import { VerifyResetPasswordComponent } from '../auth/verify-reset-password/verify-reset-password.component';
import { GregorianDatepickerComponent } from './datepicker/gregorian-datepicker/gregorian-datepicker.component';
import { HigriDatepickerComponent } from './datepicker/higri-datepicker/higri-datepicker.component';
import { IconsModule } from './icons/icons.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { StepsWizardComponent } from './layout/steps-wizard/steps-wizard.component';
import { CarLoadingComponent } from './pages/loading/car-loading/car-loading.component';
import { ErrorComponent } from './pages/loading/error/error/error.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { TranslationModule } from './translation.module';
import { TermsConditionsComponent } from './layout/footer/terms-conditions/terms-conditions.component'
import {TermsConditionsPageComponent} from './layout/footer/terms-conditions-page/terms-conditions-page.component';
import {TermConditionsEngComponent} from './layout/footer/term-conditions-eng/term-conditions-eng.component';
import {PrivacyPolicyarComponent} from './layout/footer/privacy-policyar/privacy-policyar.component';
import {PrivacyPolicyenComponent} from './layout/footer/privacy-policyen/privacy-policyen.component'
import {PrivacyPolicypageComponent} from './layout/footer/privacy-policypage/privacy-policypage.component';
import { QuestionsComponent } from './layout/footer/questions/questions.component';
import { QuestionsArComponent } from './layout/footer/questions-ar/questions-ar.component';
import { QuestionsEnComponent } from './layout/footer/questions-en/questions-en.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    LoadingComponent,
    VerifyAccountComponent, 
    GregorianDatepickerComponent, 
    HigriDatepickerComponent,
    VerifyResetPasswordComponent,
    ErrorComponent,
    CarLoadingComponent,
    SortByPipe,
    StepsWizardComponent,
    TermsConditionsComponent,
    TermConditionsEngComponent,
    TermsConditionsPageComponent,
    PrivacyPolicyarComponent,
    PrivacyPolicyenComponent,
    PrivacyPolicypageComponent,
    QuestionsComponent,
    QuestionsArComponent,
    QuestionsEnComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, RouterModule,
    NgbModule,
    TranslationModule,
    IconsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    FormsModule,
    IconsModule,
    LoadingComponent,
    ErrorComponent,
    CarLoadingComponent,
    NgSelectModule,
    GregorianDatepickerComponent,
    HigriDatepickerComponent,
    TranslationModule,
    SortByPipe,
    NgbModule,
    TermsConditionsComponent,
    TermsConditionsPageComponent,
    TermConditionsEngComponent,
    PrivacyPolicyarComponent,
    PrivacyPolicyenComponent,
    PrivacyPolicypageComponent,
    QuestionsComponent,
    QuestionsArComponent,
    QuestionsEnComponent,
  ], 
  providers: [NgbActiveModal],
})
export class SharedModule { }