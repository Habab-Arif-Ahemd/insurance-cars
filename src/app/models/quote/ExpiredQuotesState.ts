import { Quote } from './Quote';

export interface ExpiredQuotesState {
   totalQuotes: number;
   expiredQuotes: Quote[];
   hasAllQuotesExpired: boolean;
}
