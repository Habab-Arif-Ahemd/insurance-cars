export interface Benefit {
   benefitId: number;
   benefitTypeId: number; // 1 = Priced, 2 = Free (amount = 0), 3 = Priced (and included) [1,3 => Additional benefit, 3 is checked and cannot be changed because its included in totalPremium]
   referenceId: string; // unkwon
   name: string;
   nameAr: string;
   benefitAmount: number;
   benefitVATAmount: number; // benefitAmout * 0.15  
   /* UI */
   isChecked?: boolean;
   checkBoxId?: boolean;
   isSelected: boolean;
   quoteProductId?: string;
   // if true show all benefit to the user
   showFullBenefit: boolean;
}
