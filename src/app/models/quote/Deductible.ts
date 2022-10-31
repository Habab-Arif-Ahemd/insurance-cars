import { PremiumBreakDown } from './PremiumBreakDown';
import { Discount } from './Discount';


export interface Deductible {
   productDeductibleId: string;
   deductibleReferenceNo: string;
   deductibleValue: number;
   policyPremium: number;
   basePremium: number;
   taxableAmount: number;
   totalAdditionalBenefits: number;
   totalDiscounts: number;
   premiumBreakdowns: PremiumBreakDown[];
   discounts: Discount[];
}
