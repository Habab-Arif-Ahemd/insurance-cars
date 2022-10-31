/**
 * Sent to the API inorder to obtain a payment checkout ID
 *
 * @export
 * @interface CheckoutIdRequest
 */
export interface CheckoutIdRequest {
   /**
    * The ordered quote referenceID
    *
    * @type {string}
    * @memberof CheckoutIdRequest
    */
   clientQuoteId: string;
   /**
    * The user's IBAN
    *
    * @type {string}
    * @memberof CheckoutIdRequest
    */
   iban: string;
   /**
    * The bank ID of the master table
    *
    * @type {number}
    * @memberof CheckoutIdRequest
    */
   bankId: number;
   /**
    * The bank's code derived from the IBAN
    *
    * @type {number}
    * @memberof CheckoutIdRequest
    */
   bankCode: number;
}
