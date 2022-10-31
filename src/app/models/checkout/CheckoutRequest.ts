import { PreviewPageRequest } from "./PreviewPageRequest";

export interface CheckoutRequest extends  PreviewPageRequest {
 
    iban?: string,
    bankId?: number,
    bankCode?: number,
    email?: string,
    phoneNumber?: string,
    isContactUpdated?: boolean,
}
