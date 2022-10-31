import { Product } from "../quote/Product";
import { InsuredInfo } from "../shared/InsuredInfo";
import { VehicleInfo } from "../shared/VehicleInfo";
import { PreviewVehicleDriver } from "./PreviewVehicleDriver";
import {PolicyDocument} from "./PolicyDocument";

export interface PolicyData {
    policyNumber: string;
    policyIssueDate: string;
    policyEffectiveDate: string;
    policyExpiryDate: string;
    insuredInfo: InsuredInfo;
    vehicleInfo: VehicleInfo;
    vehicleDrivers: PreviewVehicleDriver[];
    product: Product;
    insuranceCompany: string;
    documents: PolicyDocument[];
}
 