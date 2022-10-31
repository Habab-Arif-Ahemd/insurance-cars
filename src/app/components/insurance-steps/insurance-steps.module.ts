import { HomePageModule } from './../home-page/home-page.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { IconsModule } from '../shared/icons/icons.module';
import { SharedModule } from '../shared/shared.module';
import { AdditionalDriverComponent } from './drivers/additional-driver/additional-driver.component';
import { DriversListComponent } from './drivers/drivers-list/drivers-list.component';
import { DriversPageComponent } from './drivers/drivers-page/drivers-page.component';
import { MainDriverComponent } from './drivers/main-driver/main-driver.component';
import { INSURANCE_STEPS_ROUTES } from './insurance-steps.routes';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { UpdateClientInfoComponent } from './update-client-info/update-client-info.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { YakeenMissingInfoComponent } from './yakeen-missing-info/yakeen-missing-info.component';
import { InsuranceInfoComponent } from './insurance-info/insurance-info.component';
const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [MainDriverComponent,
     AdditionalDriverComponent, 
     MoreDetailsComponent, VehicleInfoComponent, 
     DriversListComponent, DriversPageComponent,
     UpdateClientInfoComponent, YakeenMissingInfoComponent, InsuranceInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    IconsModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbModule,
    SharedModule,
    RouterModule.forChild(INSURANCE_STEPS_ROUTES),
    HomePageModule
  ]
  
})
export class InsuranceStepsModule { }
