export interface Dashboard {
  totalPursharedPolicy: number;
  totalAlmostExpried: number;
  totalExpiry: number;
  totalPendingNajm: number;
  totalRemainingPolicy:number;
  policies: Policy[];
}

export interface Policy {
  id: string;
  vehicleId: number;
  plateNumber: number;
  plateFirstLetter: string;
  plateSecondLetter: string;
  plateThirdLetter: string;
  plateFirstLetterAr: string;
  plateSecondLetterAr: string;
  plateThirdLetterAr: string;
  colorAr: string;
  color: string;
  modelYear: number;
  maker: string;
  model: string;
  insuranceCompany: string;
  insuranceCompanyAr: string;
  insurCompLogo?: string;
  productType: string;
  productTypeAr: string;
  policyNumber: string;
  policyEffectiveDate: string;
  policyExpiryDate: string;
  policyIssueDate: string;
  deductibleAmount: number;
  totalPremium: number;
  status: number;
  isNajmUpdated: boolean;
}
