export interface Invoices {
    data?: Invoices[];
    id: string,
    invoiceRefId: string,
    invoiceDate: string,
    insuredIdentityNumber: number,
    vehicleId: number,
    productType: string,
    productTypeAr: string,
    totalAmount: number
}
