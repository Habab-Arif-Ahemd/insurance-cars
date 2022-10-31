import { Component, OnInit,Output ,EventEmitter, Input} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})

export class AccountSettingsComponent implements OnInit {
  
   /* editButton toggle*/

   emailBTN:boolean = true;
   passwordBTN:boolean = true;
   phoneBTN:boolean = true;
   languageBTN:boolean = true;


   showEditEmail: boolean = false;
   showEditPassword: boolean = false;
   showEditPhone: boolean = false;
   showEditLang: boolean = false;
   isLoggedIn:boolean; 
   userEmail:any;
   userPhone:any;
   userLang:any;
  constructor(   private authService: AuthService
  ) { }

  ngOnInit(): void {
     this.watchLoginState();
   }


 
   private watchLoginState(): void {
      this.authService.getIsLoggedIn().subscribe(isLoggedIn => {
         this.isLoggedIn = isLoggedIn;
         if (isLoggedIn) {
            // Get user data from access token
            this.userEmail = this.authService.getDecodedToken().sub;
            this.userPhone=this.authService.getTokenUserPhoneNum();
            this.userLang=this.authService.getTokenUserLang();

         }
      });
   }
  /* ------------------------------------------------------------------------------------------------------------ */
   /*                         configration for intraction  form show and hide for user                            */
   /* ----------------------------------------------------------------------------------------------------------- */
  displayEmail() {
   this.showEditEmail = true;
   this.showEditPassword = false;
   this.showEditPhone = false;
   this.showEditLang = false
 /* BTN hide/show */
 this.emailBTN = false;
 this.passwordBTN = true;
 this.phoneBTN = true;
 this.languageBTN = true;
 }
 displayPassword() {
   this.showEditEmail = false;
   this.showEditPassword = true;
   this.showEditPhone = false;
   this.showEditLang = false
/* BTN hide/show */
      this.emailBTN = true;
      this.passwordBTN = false;
      this.phoneBTN = true;
      this.languageBTN = true;
 }
 displayPhone() {
   this.showEditEmail = false;
   this.showEditPassword = false;
   this.showEditPhone = true;
   this.showEditLang = false
   /* BTN hide/show */
   this.emailBTN = true;
   this.passwordBTN = true;
   this.phoneBTN = false;
   this.languageBTN = true;
 }
 displayLang() {
   this.showEditEmail = false;
   this.showEditPassword = false;
   this.showEditPhone = false;
   this.showEditLang = true
   /* BTN hide/show */
   this.emailBTN = true;
   this.passwordBTN = true;
   this.phoneBTN = true;
   this.languageBTN = false;
 }
 closeEmail(){
  this.showEditEmail = false;
  this.emailBTN = true;
 }
 
 closePassword(){
  this.showEditPassword = false;
  this.passwordBTN = true;
 }
 closePhone(){
  this.showEditPhone = false;
  this.phoneBTN = true;
 }
 closeLanguage(){
  this.showEditLang = false;
  this.languageBTN = true;
 }
}
