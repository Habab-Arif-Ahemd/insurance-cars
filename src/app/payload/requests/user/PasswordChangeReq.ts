export interface PasswordChangeRequest {
   userId: string;
   oldPassword: string;
   newPassword: string;
   confirmNewPassword: string;
}
