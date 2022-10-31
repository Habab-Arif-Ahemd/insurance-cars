import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
export interface IdentityResponse  extends ApiResponse{
    data: Identity[],
}

export interface Identity {
    clientId: string
    identityNumber: number
    fullName: string
    fullNameAr: string
    birthDateH:string
    birthDate: string
    identityTypeId: number
    occupationId: number
    educationLevelId: number
    childrenUnder16Years: number
    promoCode: any
    policyEffectiveDate: any
}
