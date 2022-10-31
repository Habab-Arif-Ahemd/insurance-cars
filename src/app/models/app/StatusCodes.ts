/**
 * Contains the custom HTTP status codes and their descriptions for various processes
 *
 * @export
 * @enum {number}
 */
 export enum StatusCodes {
   /**
    * Email was not sent on backend during request
    */
   EmailNotSent = 700,
   /**
    * SMS was not sent on backend during request
    */
   SmsNotSend = 701,
   /**
    * No insurance company has provided any quotation (no response from all insurance companies)
    */
   QuotationsUnavailable = 711,
 
   UnVerifiedAccount = 702,
   /*  invalid email/password */
   UnAuthorize = 401,
   /* Failure to query the insured data from the Yakken service  */
   DriverNotFound = 721,
   /* Failure to query additional driver data from the Yakken service  */
   AdditionalDriverNotFound = 722,
   /* Failure to query vehicle information  */
   QueryAccindentFaild = 723,
   /* Failure to query the national address from the Saudi Post service  */
   QueryAdressFaild = 724,
   /* same quotation send before */
   QuotatationSavedBefore = 712,
   /* Yakeen missing data */
   YakeenMissisngData = 725,
  /* Avoid multi client registeration */
  AvoidMultiClientRegistration = 714,
  /* Invalid Input Validation  */
  InvalidInputValidation = 703

 }
 