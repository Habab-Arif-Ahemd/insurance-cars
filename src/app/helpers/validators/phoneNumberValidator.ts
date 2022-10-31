import { AbstractControl } from '@angular/forms';

export function phoneNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {

   const phoneNumber = control.get('phoneNumberCtrl').value;

   if (phoneNumber.toString().startsWith('5')) {
      return null;

   } else {
      control.get('phoneNumberCtrl').setErrors({ phoneNumberIsNotStartWithFive: true })
   }
}