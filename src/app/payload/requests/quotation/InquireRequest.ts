export interface InquireRequest {
   insuredIdentityNumber?: number;
   insuredIdentityTypeId?: number;
   vehicleId?: number;
   vehicleIdTypeId?: number;
   phoneNumber?: string; // inquire from profile page
   email?: string;
}
