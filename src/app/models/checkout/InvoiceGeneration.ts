import { Invoice } from './Invoice';

export interface InvoiceGeneration {
   invoice: Invoice;
   outputType: 'save' | 'print';
}
