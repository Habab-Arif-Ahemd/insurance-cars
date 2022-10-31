import { ApiResponse } from "src/app/payload/responses/ApiResponse";
import { InsuranceCarrier } from "./InsuranceCarrier";
import { PreviewProduct } from './PreviewProduct';


export interface QuotePreview extends ApiResponse {
  quotationReqtId: string;
  requestReferenceId: string;
  insuranceCompanyId: number;
  insuranceCompany: InsuranceCarrier;
  quoteReferenceId: string;
  quotationStartDate: string;
  quotationEndDate: string;
  product: PreviewProduct;
  isSelectedForOrdering?: boolean;
  additionalProductBenefits?: string[];
}
