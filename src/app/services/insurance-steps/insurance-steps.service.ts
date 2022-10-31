import { Identity } from 'src/app/models/profile/Identity';
import { Injectable } from "@angular/core";
import { NgFormsManager } from "@ngneat/forms-manager";
import { BehaviorSubject } from "rxjs";
import { first } from "rxjs/operators";
import { LocallyStoredItemsKeys } from "src/app/models/app/LocallyStoredItemsKeys";
import { ManagedForms, ManagedFormsTypes } from "src/app/models/insurance-steps/ManagedFormsTypes";
import { previousQuotationData } from "src/app/models/insurance-steps/previousQuotationData";
import { InsuranceStepsData } from "src/app/models/master-table/InsuranceStepsData";
import { Vehicle,  } from 'src/app/models/profile/Vehicle';


@Injectable({
   providedIn: "root"
})

export class InsuranceStepsService {

   insuranceStepsData: BehaviorSubject<InsuranceStepsData> = new BehaviorSubject<InsuranceStepsData>({} as InsuranceStepsData);
   
   previousQuotationData: BehaviorSubject<previousQuotationData> = new BehaviorSubject<previousQuotationData>({} as previousQuotationData);

   
   constructor(private formsManager: NgFormsManager<ManagedFormsTypes>) { }

  
   /**
    * Set the insurance steps data master tables data
    * @param insuranceStepsData Steps data
    */
   public setInsuranceStepsData(insuranceStepsData: InsuranceStepsData): void {
      this.insuranceStepsData.next(insuranceStepsData);
      localStorage.setItem(LocallyStoredItemsKeys.InsuranceCurrentStepData, JSON.stringify(insuranceStepsData));
   }


   /**
    * Returns the current insurance data
    */
   public getInsuranceStepsData(): BehaviorSubject<InsuranceStepsData> {
      // Get from local storage
       const storedStepsData = localStorage.getItem(LocallyStoredItemsKeys.InsuranceCurrentStepData);
      // // If exists in local storage then set it's value on the subject
      if (storedStepsData && storedStepsData.length > 0) {
         this.setInsuranceStepsData(JSON.parse(storedStepsData));
      }
      return this.insuranceStepsData;
   }


   public addInsuranceStepsObject(res: any, field: string): void {
      // Get current steps
      const tempStepsData = this.getInsuranceStepsData().value;
      // Add the object
      tempStepsData[field] = res;
      // Set the steps
      this.setInsuranceStepsData(tempStepsData);
   }

   // check form validitiy 

   public isValidFormManager() {
      let formStatus: { formName: string, isValid: boolean } = { formName: '', isValid: false };
      let formsStatus: [{ formName: string, isValid: boolean }] = [{ formName: '', isValid: false }];
      this.formsManager.validityChanges(ManagedForms.MainDriverInsuranceForm).pipe(first()).subscribe(isValid => {
         formStatus.formName = ManagedForms.MainDriverInsuranceForm;
         formStatus.isValid = isValid;
         if (formStatus.isValid) {
            formsStatus.push(formStatus);
         } else {
            this.formsManager.markAllAsTouched(ManagedForms.MainDriverInsuranceForm);
            formsStatus.push(formStatus);
         }
      })

      this.formsManager.validityChanges(ManagedForms.VehicleInsuranceForm).pipe(first()).subscribe(isValid => {
         formStatus.formName = ManagedForms.VehicleInsuranceForm;
         formStatus.isValid = isValid;
         if (formStatus.isValid) {
            formsStatus.push(formStatus);
         } else {
            this.formsManager.markAllAsTouched(ManagedForms.VehicleInsuranceForm);
            formsStatus.push(formStatus);
         }
      })

      return formsStatus;
   }
/* 
   setPreviousQuotationData(previousQuotationData:any) {
      let tempPreviousQuotationData: previousQuotationData = {} as previousQuotationData;
      console.log("Object.keys( this.getPreviousQuotationData().value).length === 0", Object.keys(this.getPreviousQuotationData().value).length === 0)
      if (Object.keys(this.getPreviousQuotationData().value).length === 0) {
         tempPreviousQuotationData.identities = previousQuotationData;

      } else {
         tempPreviousQuotationData.vehicles = previousQuotationData;
         tempPreviousQuotationData = Object.assign(tempPreviousQuotationData, this.getPreviousQuotationData().value);

      }
      this.previousQuotationData.next(tempPreviousQuotationData);
      console.log("in vichle", this.getPreviousQuotationData().value)
   }

   getPreviousQuotationData() {
      return this.previousQuotationData;
   }
 */
   
   /* -------------------------------------------------------------------------- */

   /*                             Getters and Setters                            */

   /* -------------------------------------------------------------------------- */



   setSelectVehicle(PreviousQuotationData) {

      let tempPreviousQuotationData = this.previousQuotationData.value;
      tempPreviousQuotationData.vehicles = PreviousQuotationData;
      this.previousQuotationData.next(tempPreviousQuotationData)

   }



   setSelectIdentity(PreviousQuotationData) {

      let tempPreviousQuotationData = this.previousQuotationData.value;

      tempPreviousQuotationData.identities = PreviousQuotationData;

      this.previousQuotationData.next(tempPreviousQuotationData)

   }

   
   setIsVehicleOwnerTransfer(): void {
      let tempPreviousQuotationData = this.previousQuotationData.value;
      tempPreviousQuotationData.vehicles.isVehicleOwnerTransfer = false;
      this.previousQuotationData.next(tempPreviousQuotationData)
   }
   clearSelectVehicle(){
      let tempPreviousQuotationData = this.previousQuotationData.value;
      tempPreviousQuotationData.vehicles = Object.assign({})
      this.previousQuotationData.next(tempPreviousQuotationData)
   }
   

   getSelectIdentity(): BehaviorSubject<previousQuotationData> {

      return this.previousQuotationData;

   }

   

   getSelectVehicle(): BehaviorSubject<previousQuotationData> {

      return this.previousQuotationData;

   } 

   
   
}
