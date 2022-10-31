import {Quote} from 'src/app/models/quote/Quote';
import { Benefit } from '../quote/Benefit';

export interface PreviewPageRequest {
   
    quote?: PreviewPageQuote,
    paymentMethodId?: number,
    clientId?: string,
}

export interface PreviewPageQuote {
   quotationReqtId?: string;
   requestReferenceId?: string;
   insuranceCompanyId?: number;
   vehicleFKId?: string;
   quotationStartDate?: string;
   quotationEndDate?: string;
   product?: PreviewPageQuoteProduct;
   isSelectedForOrdering?: boolean;
   /* These arrays for preview Quote  */
}

export interface PreviewPageQuoteProduct {

    quotationProductId ? : string;
    insurQuotationId ?: string;
    policyEffectiveDate ?: string;
    policyExpiryDate ?: string;
    productDeductibleId ?: string;
    deductibleReferenceNo ?: string;
    deductibleValue ?: number;
    policyPremium ?: number;
    basePremium ?: number;
    taxableAmount ?: number;
    totalAdditionalBenefits ?: number;
    totalDiscounts ?: number; 
    benefits?: Benefit[];
}

