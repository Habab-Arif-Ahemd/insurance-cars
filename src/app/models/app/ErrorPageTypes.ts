/**
 * Contains types of errors that would be displayed on the error page to dynamically load its contents based on error type
 *
 * @export
 * @enum {number}
 */
export enum ErrorPageTypes {
   /**
    * 5xx errors
    */
   ServerError = 'ServerError',
   /**
    * No insurance company has provided any quotation (no response from all insurance companies)
    */
   QuotationsUnavailable = 'QuotationsUnavailable'
}
