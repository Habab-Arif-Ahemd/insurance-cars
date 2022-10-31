import { Routes } from "@angular/router";
import { AppRoutes } from "src/app/models/app/AppRoutes";
import { MainDriverComponent } from "./drivers/main-driver/main-driver.component";
import { VehicleInfoComponent } from "./vehicle-info/vehicle-info.component";
import {DirectAccessGuard} from "src/app/helpers/guards/direct-access.guard"
import { DirectAccessProfileGuard } from "src/app/helpers/guards/direct-access-profile.guard";


export const INSURANCE_STEPS_ROUTES: Routes = [
 /*  { path: AppRoutes.MotorRoutes.insuredInfo, canActivate: [DirectAccessGuard], component: MainDriverComponent },
  { path: AppRoutes.MotorRoutes.vehicleInfo,component: VehicleInfoComponent }, */
  { path: AppRoutes.MotorRoutes.insuredInfo , canActivate: [DirectAccessProfileGuard], component: MainDriverComponent },
  { path: AppRoutes.MotorRoutes.vehicleInfo,component: VehicleInfoComponent },
];
