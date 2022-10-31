import { AbstractControl } from '@angular/forms';
import { Driver } from 'src/app/models/insurance-steps/Driver';
import { DriversService } from '../../services/insurance-steps/drivers.service';
export function NonRepetitionIdValidator(control: AbstractControl): { [key: string]: boolean } | null {
   let driversService: DriversService = DriversService.injector.get(DriversService);
   let id = control.value;
   if (id.length == 10) {
      let currentDrivers: Driver[] = driversService.getUserQuoteReqDrivers().value;
      console.log("control",parseInt(id))
      // console.log(" currentDrivers from NonRepetitionIdValidator",currentDrivers)
      if (currentDrivers == null) { currentDrivers = [] }
      console.log("currentDrivers from  NonRepetitionIdValidator ",currentDrivers[0].identityNumber)
      for(let i=0; i<currentDrivers.length;i++){
         if(currentDrivers[i].identityNumber == parseInt(id)) {
            console.log("currentDrivers["+ i +"].identityNumber",currentDrivers[i].identityNumber)

            return {duplicateNationalId: true} 
         }
      }
      return null;
   } 
}

export function DrivingPercentageValidator(control: AbstractControl): { [key: string]: boolean } | null {
   let driversService: DriversService = DriversService.injector.get(DriversService);
   let percentage = control.value;
   let currentDrivers = driversService.getUserQuoteReqDrivers().value;
   let percentagesSum = 0; // Indicates the sum of all additional drivers percentages in the array
   
   for(let i = 0 ; i < currentDrivers.length; i ++) {
      if(currentDrivers[i].typeId == 1) {
         continue;
      } else  {
         percentagesSum += currentDrivers[i].drivingPercentageId;
      }
   }
     // add percentage comming from control
     percentagesSum += percentage;
//   percentagesSum=percentagesSum-percentage;
   // Check if the selected percentage and previous percentages sum exceeds 100
   if (percentagesSum > 100) {
      // Show validation error
      return { drivingPercentageComplete: true };
   } else {
      null;
   }
}