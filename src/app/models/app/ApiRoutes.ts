export const ApiRoutes =  {

    Account:  {
        Register: "account/register",
        Login: "account/login",
        VerifyPhone: "account/verify",
        PasswordResetRequest: "account/resetpassword",
        PasswordReset: "account/confirmpasswordreset",
        ResendVerfication: "account/sendcode"
    },

    MasterTable:
    {
        VehicleDetails: "master/VehicleDetails",
        ProductType: "master/products",
        Benefit: "master/benefits",
        Violation: "master/violations",
        DiscountTypes: "master/DiscountTypes",
        PremiumBreakdown: "master/PremiumBreakdowns",
        PromoCode: "master/PromoCodes",
        NCDFreeYear: "master/NCDFreeYears",
        IdentityType: "master/IdentityTypes",
        Gender: "master/Genders",
        EducationLevel: "master/EducationLevels",
        SocialStatus: "master/SocialStatus",
        Occupations: "master/Occupations",
        Countries: "master/Countries",
        Region: "master/Regions",
        Cities: "master/Cities",
        LicenseType: "master/LicenseTypes",
        DriverType: "master/DriverTypes",
        DrivingPercentage: "master/DrivingPercentages",
        MedicalCondition: "master/MedicalConditions",
        Mileage: "master/Mileages",
        VehicleIdType: "master/VehicleIdTypes",
        VehicleMaker: "master/VehicleMakers",
        VehicleModel: "master/VehicleModels",
        VehiclePlateType: "master/VehiclePlateTypes",
        VehiclePlateLetter: "master/VehiclePlateLetters",
        TransmissionType: "master/TransmissionTypes",
        VehicleBodyType: "master/VehicleBodyTypes",
        VehicleAxlesWeight: "master/VehicleAxlesWeights",
        VehicleColor: "master/VehicleColors",
        VehicleEngineSize: "master/VehicleEngineSizes",
        VehicleSpecifications: "master/VehicleSpecifications",
        VehicleUse: "master/VehicleUses",
        VehicleRepairMethod: "master/VehicleRepairMethods",
        ParkingLocation: "master/ParkingLocations",
        PaymentMethod: "master/PaymentMethods",
        Bank: "master/Banks",
        Attachment: "master/Attachments",
        Relation: "master/relations"
    },

    Quotation:{
        PreviewQuote: "quotation/preview",
        PreviewAttachment: "quotation/preview/attachment",
        RequestQuote: "quotation/request",
        saveOrder: "quotation/Save",
        InquireDriver: "quotation/getdriverinfo",
    },
    Service:{
        contactus:"service/contactus",
        callback:"service/callback",
        smsShare:"service/sms",
        emailShare:"service/email"

    },
    Policy: {
      checkout: "policy/checkout",
      issue: "policy/issue",
      purchase: "policy/purchase",
      print: "policy/print/"
       
    },

    Profile:{
        PasswordChangeRequest : "user/changepassword",
        PasswordChange : "user/confirmpasswordchange",
        UsernameChangeRequest : "user/changeusername",
        UsernameChange : "user/confirmusernamechange",
        PhoneNumberChangeRequest : "user/changephonenumber",
        PhoneNumberChange : "user/confirmphonenumberchange",
        ChangeLanguage : "user/changelanguage",
        GetAccountinfo : "user/accountinfo",
        GetVehiclesList : "user/client/vehicles",
        UserQuote: "user/Quotes",
        UserQuotes: "user/Quote",
        UserInvoices: "user/invoices",
        UserTickets : "user/support",
        Dashboard: "user/dashboard",
        Policy: "user/policies/",
        GetUserIdentities:"user/identities",
        Invoices: "user/invoices",
        PrintInvoice: "user/invoice/print/",
        DownloadPolicy: "user/Policy/print/"
    },

    Tickets: {
      ticketsList: "tickets",
      ticketsTypes: "tickets/Types",
      ticketsCreate: "tickets/create",
      ticketDetails: "tickets/Details",
      ticketFollowUp: "tickets/FollowUp",
      ticketStatus: "tickets/status",
      totalUnReadFollowup: "tickets/totalunreadmessages",
      changeStatus: "tickets/ChangeStatus"
  }

}
