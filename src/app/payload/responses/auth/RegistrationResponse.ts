import { ApiResponse } from '../ApiResponse';

export interface RegistrationResponse extends ApiResponse {
   userId: string;
   phoneNumber: string;
}
