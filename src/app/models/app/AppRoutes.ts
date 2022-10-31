/**
 * Contains the client side application routes
 */
export const AppRoutes = {
   landing: '',
   termandconditions: 'terms-and-conditions',
   QuestionsComponent:'QuestionsComponent',
   privacyPolicy: 'privacy-policy',
   paymentStatus: "checkout/status",
   ContactUs:"Contact-Us",
   error: "error",  
   authentication: 'account/login',
   verification: 'account/verify',
   passwordReset: 'account/reset',
   commonQestions: 'commonQestions',
   MotorRoutes : {
      request: 'request',
      insuredInfo: 'insured-info',
      vehicleInfo: 'vehicle-info',
      quotes: 'quotes',
      insuranceSteps: 'quotation',
      checkout: 'checkout',
      paymentStatus: 'status',
      
   },
   profile: {
       profileMain: 'user',
       newPolicy:{
        main: 'newPolicy',
        vehicle:'vehicle',
        addVehicle:'add-vehicle'
       },
       policies: 'policies',
       vehicles: 'vehicles',
       savedQuote: 'saved-quote',
       invoice: 'invoices',
       support : {
         main: 'support',
         add: 'add',
         details:'details'
       },  newQuotation: {
         main: 'new-quotation',
         vehicle: 'select-vehicle',
         identity: ''
       },
       account:{
        main: 'account',
        email:'email',
        password: 'password',
        language:'language',
        phone:'phone'
      },
       claim: {
         main:'claims',
         new:'new',
         details:'details'
       },

   }
   /* controlPanel: {
      main: 'user',
      quotes: 'previous-quotes',
      policies: {
         uri: 'user/policies',
         main: 'policies',
         bought: 'bought',
         expiring: 'expiring',
         expired: 'expired',
         support: 'support'
      },
      vehicles: 'new-quote/select-vehicle',
      vehiclesList: 'vehicles',
      accountSettings: {
         uri: 'user/account',
         main: 'account',
         email: {
            main: 'user/account/email',
            verify: 'user/account/email/verify'
         },
         password: {
            main: 'user/account/password',
            verify: 'user/account/password/verify'
         },
         phone: {
            main: 'user/account/phone',
            verify: 'user/account/phone/verify'
         },
         misc: 'user/account/miscellaneous'
      }
   } */
};
