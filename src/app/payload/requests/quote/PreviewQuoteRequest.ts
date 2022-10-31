import { PremiumBreakDown } from 'src/app/models/quote/PremiumBreakDown';
import { Discount } from 'src/app/models/quote/Discount';
import { Benefit } from 'src/app/models/quote/Benefit';

export interface PreviewQuoteRequest {
   quotationReqtId: string;
   clientId: string;
   quotationProductId: string;
   insuranceCompanyId: number;
   requestReferenceId: string;
   insurQuotationId: string;
   quotationStartDate: string;
   quotationEndDate: string;
   maxLiability: number;
   deductibleValue: number;
   totalPremium: number;
   premiumBreakdowns: PremiumBreakDown[];
   discounts: Discount[];
   benefits: Benefit[];
}
