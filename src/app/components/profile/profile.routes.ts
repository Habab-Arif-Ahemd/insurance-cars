import { AppRoutes } from "src/app/models/app/AppRoutes";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { ChangeEmailComponent } from "./account-settings/change-email/change-email.component";
import { ChangeLangComponent } from "./account-settings/change-lang/change-lang.component";
import { ChangePasswordComponent } from "./account-settings/change-password/change-password.component";
import { ChangePhoneComponent } from "./account-settings/change-phone/change-phone.component";
import { IndexComponent } from "./account-settings/index/index.component";
import { AddVehicleComponent } from "./buy-new-policy/add-vehicle/add-vehicle.component";
import { BuyNewPolicyComponent } from "./buy-new-policy/buy-new-policy.component";
import { IdentitiesComponent } from "./buy-new-policy/identities/identities.component";
import { VehicleComponent } from "./buy-new-policy/vehicle/vehicle.component";
import { ClaimDetailsComponent } from "./claims/claim-details/claim-details.component";
import { ClaimsListComponent } from "./claims/claims-list/claims-list.component";
import { ClaimsComponent } from "./claims/claims.component";
import { NewClaimsComponent } from "./claims/new-claims/new-claims.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { PoliciesComponent } from "./policies/policies.component";
import { ProfileMainComponent } from "./profile-main/profile-main.component";
import { SavedQuotesComponent } from "./saved-quotes/saved-quotes.component";
import { AddTicketComponent } from "./support/add-ticket/add-ticket.component";
import { SupportComponent } from "./support/support.component";
import { TicketDetailsComponent } from "./support/ticket-details/ticket-details.component";
import { TicketComponent } from "./support/ticket/ticket.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";

export const PROFILE_ROUTES = [
    {
    path: AppRoutes.profile.profileMain,
    component: ProfileMainComponent,
    children: [
      {
        path: AppRoutes.profile.newPolicy.main, component: BuyNewPolicyComponent,
        children: [
          { path: '', component: IdentitiesComponent },
          { path: AppRoutes.profile.newPolicy.vehicle, component: VehicleComponent },
          { path: AppRoutes.profile.newPolicy.addVehicle, component: AddVehicleComponent },

        ]
      },
      { path: '', redirectTo: AppRoutes.profile.policies, pathMatch: 'full' },
      { path: AppRoutes.profile.policies, component: PoliciesComponent },
      { path: AppRoutes.profile.vehicles, component: VehiclesComponent },
      { path: AppRoutes.profile.savedQuote, component: SavedQuotesComponent },
      { path: AppRoutes.profile.invoice, component: InvoicesComponent },
      {
        path: AppRoutes.profile.support.main, component: SupportComponent,
        children: [
          { path: '', component: TicketComponent },
          { path: AppRoutes.profile.support.add, component: AddTicketComponent },
          { path: AppRoutes.profile.support.details, component: TicketDetailsComponent },
        ]
      },
      {
        path: AppRoutes.profile.account.main, component: AccountSettingsComponent,
        children: [
          { path: '', component: IndexComponent },
          { path: AppRoutes.profile.account.email, component: ChangeEmailComponent },
          { path: AppRoutes.profile.account.password, component: ChangePasswordComponent },
          { path: AppRoutes.profile.account.language, component: ChangeLangComponent },
          { path: AppRoutes.profile.account.phone, component: ChangePhoneComponent },
        ]

      },
      {
        path: AppRoutes.profile.claim.main, component: ClaimsComponent,
        children: [
          { path: '', component: ClaimsListComponent },
          { path: AppRoutes.profile.claim.new, component: NewClaimsComponent },
          { path: AppRoutes.profile.claim.details, component: ClaimDetailsComponent },
        ]
      },
    ],
}
]
