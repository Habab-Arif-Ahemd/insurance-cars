import { Driver } from "./Driver";

export interface QuoteRequest {
  insuredIdentityTypeId?: number; // First digit from 'insuredIdentityNumber' (1 or 2)
  insuredIdentityNumber?: any; // ((landing form) National ID)
  vehicleIdTypeId?: number;  // ((landing form) form=1, customcard=2)
  vehicleId?: number;
  policyEffectiveDate?:  string; // Next day
  insuredBirthDate?: string;
  insuredEducationLevelId?: number;
  childrenUnder16Years?: number;
  occupationId?: number;
  promoCode?: string;
  vehicleSumInsured?: number;
  vehicleUseId?: number;
  vehicleModelYear?: number;
  vehicleTransmissionTypeId?: number;
  vehicleParkingLocationId?: number;
  isVehicleModified?: boolean;
  vehicleModificationDetails?: string;
  isVehicleOwnerTransfer?: boolean;
  vehicleRepairMethodId?: number;
  vehicleOwnerIdentityNumber?: number;
  vehicleSpecifications?: string;
  drivers?: Driver[];
  phoneNumber?: string;
  email?: string;
  action?: string;
  missingInfo?: any;
}
