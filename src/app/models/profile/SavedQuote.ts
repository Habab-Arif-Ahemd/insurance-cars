import {TimerProperties} from '../quote/TimerProperties'
export interface SavedQuote {
   data?: SavedQuote[],
   id: string,
   insurCompany: string,
   insurCompanyAr:  string,
   quoteReferenceId: string,
   vehicleId: number,
   vehiclePlateNumber: number,
   vehiclePlateFirstLetter: string,
   vehiclePlateSecondLetter: string,
   vehiclePlateThirdLetter: string,
   vehiclePlateFirstLetterAr: string,
   vehiclePlateSecondLetterAr:string,
   vehiclePlateThirdLetterAr: string,
   vehicleModelYear: number,
   vehicleModelAr:string,
   vehicleMakerAr: string,
   vehicleLogo: string,
   vehicleMajorColor:string,
   vehicleMajorColorAr:string,
   quotationStartDate:string,
   quotationEndDate: string,
   productType: string,
   productTypeAr: string,
   status: string,
   deductibleValue: number,
   totalPremium: number,
   createdDate: string,
  // for showing button loader if select the quote
  btnLoader?: boolean;
  // timer form calculate reminning days for ending quotation
  timer?: TimerProperties;
}

