export interface DashboardResponse {
  profilePoliciesMotorDto: ProfilePoliciesMotor[];
  totalAlmostExpried: number;
  totalExpiry: number;
  totalPendingNajm: number;
  totalPursharedPolicy: number;
}

export interface ProfilePoliciesMotor {
  id: number;
  VehicleId: string;
  InsuranceCompany: string;
  insuranceCompanyAr: string;
  productType: string;
  ProductTypeA: string;
  policyNumber: string;
  policyEffectiveDate: string;
  policyExpiryDate: string;
  policyIssueDate: string;
  deductibleAmount: number;
  totalPremium: number;
}
