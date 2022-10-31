import { ApiResponse } from "src/app/payload/responses/ApiResponse";
import { Vehicle } from 'src/app/models/profile/Vehicle';
import { Identity} from "src/app/models/profile/Identity";

export interface previousQuotationData extends ApiResponse {
    vehicles: Vehicle;
    identities: Identity ;

  }