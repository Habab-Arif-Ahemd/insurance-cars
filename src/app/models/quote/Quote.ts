import { ApiResponse } from '../../payload/responses/ApiResponse';
import { InsuranceCarrier } from './InsuranceCarrier';
import { Product } from './Product';
import { PremiumBreakDown } from './PremiumBreakDown';
import { Discount } from './Discount';
import { Benefit } from './Benefit';


export interface Quote extends ApiResponse {
  
   quotationReqtId?: string;
   requestReferenceId?: string;
   insuranceCompany?: InsuranceCarrier;
   vehicleFKId?: string;
   productDeductibleId?: string;
   quotationStartDate?: string;
   quotationEndDate?: string;
   products?: Product[];
   isSelectedForOrdering?: boolean;
   /* These arrays for preview Quote  */
   premiumBreakdowns?: PremiumBreakDown[];
   discounts?: Discount[];
   benefits?: Benefit[];
}
export interface Arryy extends ApiResponse {
   number?: Numberr[];
}
export interface Numberr extends ApiResponse {
  number1 :1;
  number3 :3;
  number5 :5;
}
 