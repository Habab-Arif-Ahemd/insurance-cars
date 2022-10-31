
import { AbstractControl, ValidationErrors } from '@angular/forms';
export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('passwordCtrl').value;
    let confirmPassword = control.get('confirmPasswordCtrl').value;
    if (password != confirmPassword) {
      control.get('confirmPasswordCtrl').setErrors({ ConfirmPassword: true });
    }
    else {
      return null;
    }
  }
}

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

   let value: string = control.value || '';
 
   if (!value) {
     return null
   }
 
   if(value){
     var passwordStrength
   let upperCaseCharacters = /[A-Z]+/g
   if (upperCaseCharacters.test(value) === false) {
     return { passwordStrength: `text has to contine Upper case characters` };
   }
 
   let lowerCaseCharacters = /[a-z]+/g
   if (lowerCaseCharacters.test(value) === false) {
     return { passwordStrength: `text has to contine lower case characters` };
   }
 
 
   let numberCharacters = /[0-9]+/g
   if (numberCharacters.test(value) === false) {
     return { passwordStrength: `text has to contine number characters` };
   }
 
   let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
   if (specialCharacters.test(value) === false) {
     return { passwordStrength: `text has to contine special character` };
   }
  return passwordStrength
  }
   return null;
  /* 
   let upperCaseCharacters = /[A-Z]+/g
   let lowerCaseCharacters = /[a-z]+/g
   let numberCharacters = /[0-9]+/g
   let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

   let b1=upperCaseCharacters.test(value) === false;
   let b2=lowerCaseCharacters.test(value) === false;
   let b3=numberCharacters.test(value) === false;
   let b4=specialCharacters.test(value) === false;

   let t1=`text has to contine Upper case characters`
   let t2=`text has to contine lower case characters`
   let t3=`text has to contine number characters`
   let t4=`text has to contine special character`
 */
 /*  if (b1 && b2 && b3 && b4) {
     return { passwordStrength: [t1,t2,t3,t4]};
   }else if(b1 && b2 && b3

   )return { passwordStrength: [t1,t2,t3]};
   else if(b1 && b2 && b3

    )return { passwordStrength: [t1,t2,t3]};
    else if(b1 && b2 && b3

      )return { passwordStrength: [t1,t2,t3]};
     
 */



     /*  var x = "";

   if (lowerCaseCharacters.test(value) === false) {

  
    x +="text has to contine lower case characters "
   }
 
 
   if (numberCharacters.test(value) === false) {
    x +="text has to contine number characters "
   }
 
   if (specialCharacters.test(value) === false) {
    x +="text has to contine special character "
   } 
   return {passwordStrength :x};
  */
}