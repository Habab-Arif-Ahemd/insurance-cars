import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { Driver } from 'src/app/models/insurance-steps/Driver';
import {
   LandingForm,
   VehicleForm
} from 'src/app/models/insurance-steps/ManagedFormsTypes';
import { QuoteRequest } from 'src/app/models/insurance-steps/QuoteRequest';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DriversService } from 'src/app/services/insurance-steps/drivers.service';



export default class QuoteUtils {
  
   /**
     * Construct Quotation Request
     */
    public static constructQuoteRequest(): QuoteRequest {

        let authService: AuthService = AuthService.injector.get(AuthService);
        let driverService: DriversService = DriversService.injector.get(DriversService);
  
        let formsData = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.FormManager));
        let landingInfo: LandingForm = formsData.LandingForm.value;
        let vehicleInfo: VehicleForm = formsData.VehicleInsuranceForm.value;
        let drivers: Driver[] = driverService.getUserQuoteReqDrivers().value;
        let mainDriver: Driver = drivers.filter(driver => driver.typeId == 1)[0];
        mainDriver.drivingPercentageId = driverService.getCalculatedPercentage();
        let mainDriverMoreDetails : any = formsData.DriversMoreDetails.value;
        mainDriver.medicalConditions = mainDriverMoreDetails.MedicalConditions;
        mainDriver.driverViolations = mainDriverMoreDetails.DriverViolations;
        mainDriver.driverLicenses =  [{licenseTypeId: 3, countryId: 0, numberOfYears: 1, licenseExpiryDate: "09-11-1443"}]
        let isVehicleTrasfer = landingInfo.vehicleOwnerIdentityNumber
/*      let isVehicleTrasfer =  localStorage.getItem('isVehicleTrasfer'.toLowerCase());
 */      console.log("isVehicleTrasfer isVehicleTrasfer isVehicleTrasfer isVehicleTrasfer",isVehicleTrasfer)
        let quotationReq: QuoteRequest = Object.assign({
           email: authService.getDecodedToken().sub,
           phoneNumber: authService.getTokenUserPhoneNum(),
           vehicleSumInsured: parseInt(vehicleInfo.vehicleSumInsured.toString().replace(/,/g, "")),
           vehicleUseId: vehicleInfo.vehicleUseId,
           vehicleTransmissionTypeId: vehicleInfo.vehicleTransmissionTypeId,
           vehicleParkingLocationId: vehicleInfo.vehicleParkingLocationId,
           isVehicleModified: vehicleInfo.isVehicleModified,
           vehicleRepairMethodId: vehicleInfo.vehicleRepairMethodId,
           vehicleModificationDetails: vehicleInfo.vehicleModificationDetails,
           vehicleCurrentMileage: 1000,
           insuredIdentityTypeId: parseInt(landingInfo.insuredIdentityNumber.toString()[0]),
           insuredIdentityNumber: parseInt(landingInfo.insuredIdentityNumber),
           vehicleOwnerIdentityNumber: isVehicleTrasfer ? parseInt(landingInfo.vehicleOwnerIdentityNumber ) : parseInt(landingInfo.insuredIdentityNumber) ,
           occupationId: mainDriver.occupationId,
           vehicleIdTypeId: landingInfo.vehicleIdTypeId,
           vehicleId: parseInt(landingInfo.vehicleId),
           vehicleModelYear: parseInt(landingInfo.vehicleModelYear),
           // Construct the policy effective date format
           policyEffectiveDate: new Date(
              landingInfo.policyEffectiveDate.year,
              landingInfo.policyEffectiveDate.month - 1,
              landingInfo.policyEffectiveDate.day + 1
           ).toISOString(),
           nationalityId: 0,
  
           InsuredEducationLevelId: mainDriver.educationLevelId,
           childrenUnder16Years: mainDriver.childrenUnder16Years,
           promoCode: null,
           isVehicleOwnerTransfer: landingInfo.isVehicleOwnerTransfer,
           vehicleSpecifications: vehicleInfo.vehicleSpecifications,
        });
        if (mainDriver.identityNumber.toString().startsWith("2")) {
           quotationReq.insuredBirthDate = mainDriver.birthDateG;
        } else {
           quotationReq.insuredBirthDate = mainDriver.birthDateH;
        }
        drivers.forEach(driver => delete driver.isSaudi);
        console.log(mainDriver)
        quotationReq.drivers = drivers;
        quotationReq.missingInfo = JSON.parse(localStorage.getItem('yakeenInfoForm'));
        localStorage.removeItem('yakeenInfoForm');
        quotationReq.action = 'New';
        return quotationReq;
     }
  
}
