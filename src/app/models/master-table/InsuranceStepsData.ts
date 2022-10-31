import { City } from './City';
import { DrivingPercentage } from './DrivingPercentage';
import { EducationLevel } from './EducationLevel';
import { LicenseType } from './LicenseType';
import { Mileage } from './Mileage';
import { Nationality } from './Nationality';
import { ParkingLocation } from './ParkingLocation';
import { TransmissionType } from './TransmissionType';
import { VehicleUse } from './VehicleUse';
import { Violation } from './Violation';
import { MedicalCondition } from '../insurance-steps/MedicalCondition';
import { VehicleIdTypes } from './VehicleIdTypeId';


export interface InsuranceStepsData {
   cities: City[];
   drivingPercentages: DrivingPercentage;
   educationLevels: EducationLevel[];
   licenseTypes: LicenseType[];
   mileages: Mileage[];
   nationalities: Nationality[];
   parkingLocations: ParkingLocation[];
   transmissionTypes: TransmissionType[];
   vehicleUses: VehicleUse[];
   violations: Violation[];
   medicalConditions: MedicalCondition[];
   VehicleIdTypes: VehicleIdTypes[];
}
