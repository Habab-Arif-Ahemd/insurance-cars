export enum LocallyStoredItemsKeys {
   /* App */
   JWT = 'app:jwt',
   AppLanguage = 'app:language',
   ActiveErrorType = 'app:errorType',
   /* Insurance */
   InsuranceCurrentStepNumber = 'insurance:currentStepNumber',
   UserQuoteRequest = 'insurance:quoteRequest',
   UserQuoteResponse = 'insurance:quoteResponse',
   UserAdditionalDrivers = 'insurance: additionalDrivers',
   InsuranceCurrentStepData = 'insurance:currentStepData',
   DriverToEdit = 'driverToEdit',
   /* Quotes */
   Quotes = 'quote:quotesList',
   SelectedQuote = 'quote:selectedQuote',
   AlteredQuotes = 'quote:alteredQuotesList',
   AlteredProducts = 'quote:alteredQuotesList',
   PreviewQuoteResponse = 'quote:previewQuoteResponse',
   PreviewQuoteRequest = 'quote:previewQuoteRequest',
   /* User */
   VerificationUserId = 'verification:userId',
   VerificationPhoneNumber = 'verification:phone', 
   VerificationlastPhoneDigits = 'verification:lastPhoneDigits',
   VerificationUserEmail = 'verification:email',
   ProfileData = 'user:profileInfo',
   /* Checkout */
   CheckoutReturnState = 'checkout:returnStateData',
   driverToEdit = 'driver:driverToEdit',
   FormManager='ngFormsManager',
   PurchaseResponse = 'checkout:PreviewpurchaseResponse',
   /* Profile */
   ProfileForm="ProfileForm"
}
