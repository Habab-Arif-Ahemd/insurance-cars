import { Quote } from "../../../models/quote/Quote";
import { VehicleInfo } from "../../../models/shared/VehicleInfo";
import { InsuredInfo } from "../../../models/shared/InsuredInfo";
import { ApiResponse } from "../ApiResponse";

export interface QuotesListResponse extends ApiResponse {
  insuredInfo: InsuredInfo;
  vehicleInfo: VehicleInfo;
  quotes?: Quote[];
  quoteInfo?: string;
}
