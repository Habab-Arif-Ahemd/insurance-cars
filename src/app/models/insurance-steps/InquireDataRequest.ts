export interface InquireDataRequest {
   insuredIdentityNumber?: number;
   insuredIdentityTypeId?: number;
   vehicleId?: number;
   vehicleIdTypeId?: number;

   // inquire from profile page
   phoneNumber?: string;
   email?: string;
}
