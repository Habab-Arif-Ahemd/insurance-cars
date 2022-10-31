import { PreviewProduct } from './../quote/PreviewProduct';
import { InsuranceCarrier } from './../quote/InsuranceCarrier';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { InsuredInfo } from '../shared/InsuredInfo';
import { VehicleInfo } from '../shared/VehicleInfo';


export interface Invoice extends ApiResponse {
   quoteReferenceId: string;
   policyReferenceId: string;
   policyNumber: string;
   invoiceDate: string;
   insuredInfo: InsuredInfo;
   vehicleInfo: VehicleInfo;
   insuranceCompany: InsuranceCarrier;
   product: PreviewProduct;
   links: { name:string; url:string; }[];
}
