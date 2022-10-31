import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Reactive Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { HomePageModule } from '../home-page/home-page.module';
import { IconsModule } from '../shared/icons/icons.module';
import { TranslationModule } from '../shared/translation.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ChangeEmailComponent } from './account-settings/change-email/change-email.component';
import { ChangeLangComponent } from './account-settings/change-lang/change-lang.component';
import { ChangePasswordComponent } from './account-settings/change-password/change-password.component';
import { ChangePhoneComponent } from './account-settings/change-phone/change-phone.component';
import { IndexComponent } from './account-settings/index/index.component';
import { AddVehicleComponent } from './buy-new-policy/add-vehicle/add-vehicle.component';
import { BuyNewPolicyComponent } from './buy-new-policy/buy-new-policy.component';
import { IdentitiesComponent } from './buy-new-policy/identities/identities.component';
import { VehicleComponent } from './buy-new-policy/vehicle/vehicle.component';
import { ClaimDetailsComponent } from './claims/claim-details/claim-details.component';
import { ClaimsListComponent } from './claims/claims-list/claims-list.component';
import { ClaimsComponent } from './claims/claims.component';
import { NewClaimsComponent } from './claims/new-claims/new-claims.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PoliciesComponent } from './policies/policies.component';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { PROFILE_ROUTES } from './profile.routes';
import { SavedQuotesComponent } from './saved-quotes/saved-quotes.component';
import { AddTicketComponent } from './support/add-ticket/add-ticket.component';
import { SupportComponent } from './support/support.component';
import { TicketDetailsComponent } from './support/ticket-details/ticket-details.component';
import { TicketComponent } from './support/ticket/ticket.component';
import { VehiclesComponent } from './vehicles/vehicles.component';



@NgModule({
  declarations: [
    ProfileMainComponent,
    PoliciesComponent,
    VehiclesComponent,
    SavedQuotesComponent,
    InvoicesComponent,
    SupportComponent,
    AccountSettingsComponent,
    BuyNewPolicyComponent,
    IdentitiesComponent,
    VehicleComponent,
    NewClaimsComponent,
    ClaimsListComponent,
    ClaimsComponent,
    TicketComponent,
    TicketDetailsComponent,
    AddTicketComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    ChangeLangComponent,
    ChangePhoneComponent,
    ClaimDetailsComponent,
    AddVehicleComponent,
    IndexComponent
  ],
  imports: [
    FormsModule,
    NgSelectModule,
    FileUploadModule,
    CommonModule,
    RouterModule,
    TranslationModule,
    IconsModule,
    NgSelectModule,BrowserAnimationsModule,
    ReactiveFormsModule,
    HomePageModule,
    NgbModule,
    RouterModule.forChild(PROFILE_ROUTES),
  ]
})
export class ProfileModule {}
