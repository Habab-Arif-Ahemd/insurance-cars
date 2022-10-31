import { Quote } from "../../../models/quote/Quote";
import { VehicleInfo } from "../../../models/shared/VehicleInfo";
import { InsuredInfo } from "../../../models/shared/InsuredInfo";
import { ApiResponse } from "../ApiResponse";
import { QuotePreview } from 'src/app/models/quote/QuotePreview';
import { PreviewVehicleDriver } from 'src/app/models/checkout/PreviewVehicleDriver';


export interface PreviewQuoteResponse extends ApiResponse {
  referenceId?: string;
  insuredInfo: InsuredInfo;
  vehicleInfo?: VehicleInfo;
  quoteInfo?: Quote;
  vehicleDrivers: PreviewVehicleDriver[];
}
