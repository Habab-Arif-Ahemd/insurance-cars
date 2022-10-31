import { AbstractControl } from '@angular/forms';


export function NationalIdValidator(control: AbstractControl): { [key: string]: boolean } | null {
  
   let  id = control.value;
   if(id !== null) {
      id = id.toString().trim();
   }
   if (isNaN(parseInt(id, 10))) {
      return { isValidNationalId: false };
   }

   if (id.length !== 10) {
      return { isValidNationalId: false };
   }

   const type: string = id.substr(0, 1);

   if (type !== '2' && type !== '1' && type !== '7') {
      return { isValidNationalId: false };
   }

   let sum = 0;

   for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
         const ZFOdd = String('00' + String(Number(id.substr(i, 1)) * 2)).slice(-2);
         sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
      } else {
         sum += Number(id.substr(i, 1));
      }
   }

   if ((sum % 10 !== 0) && (type == '7')) { // Invalid nationalId but Company Id (starts with 7)
      return null;
   }

   if (sum % 10 !== 0) { // Invalid
      return { isValidNationalId: false };
   } else {
      return null;
   }

}
