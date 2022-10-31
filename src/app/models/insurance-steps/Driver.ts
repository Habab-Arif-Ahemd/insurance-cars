import { DriverLicense } from "./DriverLicense";

export interface Driver {
 
  typeId?: number,
  identityNumber?: any,
  birthDateG?: string,
  birthDateH?: string,
  genderId?: number,
  firstName?: string,
  middleName?: string,
  thirdName?: string,
  lastName?: string,
  firstNameAr?: string,
  middleNameAr?: string,
  thirdNameAr?: string,
  lastNameAr?: string,
  identityIssuePlaceId?: number,
  identityNumberExpiry?: string,
  nationalityId?: number, 
  occupationId?: number,
  drivingPercentageId?: number,
  educationLevelId?: number,
  socialStatusId?: number, 
  relationId?: number,
  childrenUnder16Years?: number,
  isSameInsuredAddress?: boolean, // in main driver isSameInsuredAdress = true
  medicalConditions?: string,
  driverViolations?: string,

  driverLicenses?: DriverLicense[],
  driverId?: string,
  isEditing?: boolean;
  isSaudi?: boolean;
  
}
