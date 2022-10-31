import { ApiResponse } from "src/app/payload/responses/ApiResponse";

export interface ClientVehicles extends ApiResponse {
    data: Vehicle[]
  }
  
  export interface Vehicle {
    id: string
  clientId: string
  clientName: string
  clientNameAr: string
  insuredIdentityNumber: number
  vehicleOwnerIdentityNumber: number
  vehicleOwnerName: string
  vehicleId?: any
  vehicleIdTypeId: number
  vehicleUseId: number
  vehicleSumInsured: number
  vehicleTransmissionTypeId: number
  vehicleParkingLocationId: number
  isVehicleModified: boolean
  vehicleModificationDetails: any
  vehicleRepairMethodId?: string;
  vehicleSpecifications: string
  vehicleIdType: string
  vehicleIdTypeAr: string
  isVehicleOwnerTransfer: boolean
  vehicleModelYear: any
  vehiclePlateNumber: any
  vehiclePlateFirstLetter: any
  vehiclePlateSecondLetter: any
  vehiclePlateThirdLetter: any
  vehiclePlateFirstLetterAr: any
  vehiclePlateSecondLetterAr: any
  vehiclePlateThirdLetterAr: any
  vehicleModel: string
  vehicleModelAr: string
  vehicleMakerAr: string
  vehicleMaker: string
  vehicleLogo: string
  vehicleMajorColor: any
  vehicleMajorColorAr: string
  }
  