import { Driver } from './Driver'
import { DriverLicense } from './DriverLicense';
import { DriverViolation } from './DriverViolation';
import { MedicalCondition } from './MedicalCondition';

export enum ManagedForms {
    LandingForm = 'LandingForm',
    VehicleInsuranceForm = 'VehicleInsuranceForm',
    MainDriverInsuranceForm = 'MainDriverInsuranceForm',
    AdditionalDriverInsuranceForm = 'AdditionalDriverInsuranceForm',
    DriversMoreDetails = 'DriversMoreDetails',
    /* Drivers Page */
    DriversList = 'DriverList',
    /*contact us  */
    ContactusFormGroup='ContactusFormGroup',
    ContactusFormGroupHomepage="ContactusFormGroupHomepage",
    SharebyFormGroup="SharebyFormGroup"
 }
 export interface ManagedFormsTypes {
    LandingForm: LandingForm,
    VehicleInsuranceForm: VehicleForm,
    MainDriverInsuranceForm: Driver,
    AdditionalDriverInsuranceForm: Driver,
    DriversMoreDetails: DriversMoreDetails,
    ContactusFormGroup:ContactusFormGroup,
    ContactusFormGroupHomepage:ContactusFormGroupHomepage,
    SharebyFormGroup:SharebyFormGroup
 }

 export interface LandingForm {
   isVehicleOwnerTransfer?: boolean;
   insuredIdentityNumber?: any;
   vehicleId?: string;
   policyEffectiveDate?: any;
   vehicleIdTypeId?: number;
   vehicleOwnerIdentityNumber?: any;
   vehicleModelYear?: string;
   insuredIdentityTypeId?: number;
   captcha?: any;

   
 }

 export interface VehicleForm {
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
 }

 export interface DriversMoreDetails {
   TypeId: number,
   MedicalConditions: string,
   DriverViolations: string,
   DriverLicenses: DriverLicense
 }
 export interface ContactusFormGroup{
    name: string,
    phoneNumber: string,
    email: string,
    message: string
  
 }

 export interface SharebyFormGroup{
   //1 for email, 2 for sms ,3 for whatsapp
/*    type:number,
 */   phoneNumber?: string,
   email?: string,
   message: string
 
}
 export interface ContactusFormGroupHomepage{
   name: string,
   phoneNumber: string,
   insuranceTypeId: number,
   contactType: any,
}