import { InsuranceCarrier } from './InsuranceCarrier';
import { Benefit } from './Benefit';
import { Deductible } from './Deductible';


export interface Product {
   quotationProductId?: string;
   productTypeId: number; // 1, ( 3, 5 (tawuniya)) = Third Party, 2 = Comprehensive
   name: string;
   nameAr: string;
   conditionUrl: string;
   insurQuotationId?: string;

   policyEffectiveDate: string;
   policyExpiryDate: string;
   
   benefits: Benefit[];
   deductibles?: Deductible[];
   //totalPrice?: number;
   isUnderComparison?: boolean;
   insuranceCarrier?: InsuranceCarrier;
   hasExtraBenefits?: boolean;
   hasFreeBenefits?: boolean
   isSelected?: boolean;
   selectedDeductible?: Deductible;
   previousTotalPremium?: number;
}
