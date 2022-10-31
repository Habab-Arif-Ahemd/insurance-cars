export interface QuoteSelectReq {
   quotationReqtId: string,
   clientId: string,
   quotationProductId: string,
   insuranceCompanyId: number,
   requestId: string,
   insurQuotationId: string,
   quotationStartDate: string,
   quotationEndDate: string,
   additionalProductBenefits: string[];
}
