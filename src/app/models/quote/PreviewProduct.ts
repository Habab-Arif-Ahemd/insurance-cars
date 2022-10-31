import { Benefit } from './Benefit';
import { Deductible } from './Deductible';
import { InsuranceCarrier } from './InsuranceCarrier';


export interface PreviewProduct {
   quotationProductId: string;
   productTypeId: number;
   name: string;
   nameAr: string;
   policyEffectiveDate: string;
   policyExpiryDate: string;
   maxLiability: number;
   benefits: Benefit[];
   deductibles: Deductible;
   totalPrice?: number;
   hasExtraBenefits?: boolean;
   isSelected?: boolean;
}
