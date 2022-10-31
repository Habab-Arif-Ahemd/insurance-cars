import { ApiResponse } from "../ApiResponse";

export interface PurchaseResponse extends ApiResponse{
    vehicleDescription: string;
    vehicleChassieNo: string;
    vehicleColor: string;
    vehicleSumInsured: number;
    vehicleIdTypeId: number;
    vehicleId: number;
    vehicleRepairMethod: string;
    insuranceCompanyName: string;
    insuranceCompanyNameAr: string;
    insuranceCompanyLogo: string;
    productName: string;
    productNameAr: string;
    policyNumber: string;
    policyIssueDate: Date;
    policyEffectiveDate: Date;
    policyExpiryDate: Date;
    policyPremium: number;
    taxableAmount: number;
    basePremium: number;
    totalAdditionalBenefits: number;
    totalDiscounts: number;
    netPremiumWithoutBenefits:number;
    totalVATAmount:number;
    documents?:Documents[]
 }

  interface Documents {
    id: number,
    name: string,
    nameAr: string,
    url: string
}