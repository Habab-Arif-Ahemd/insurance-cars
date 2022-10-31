import { ApiValidationError } from 'src/app/models/app/ApiValidationError';

export interface ApiResponse {
   isSuccess?: boolean;
   responseMessage?: string;
   statusCode?: number;
   validationErrors?: ApiValidationError[];
}
