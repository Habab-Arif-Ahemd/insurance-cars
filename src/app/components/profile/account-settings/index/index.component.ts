import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import {ChangePhoneComponent} from 'src/app/components/profile/account-settings/change-phone/change-phone.component'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit ,AfterViewInit {
/*  @Input () closePhones:string;
 */
 @ViewChild(ChangePhoneComponent) childChangePhone;
 number
/*   @Input() closePhones: ChangePhoneComponent;
 /   / editButton toggle*/
 closePhones
   emailBTN:boolean = true;
   passwordBTN:boolean = true;
   phoneBTN:boolean = true;
   languageBTN:boolean = true;
   phonenubert;
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
   ngAfterViewInit() {  
    this.number= this.childChangePhone.userPhone;  
    console.log("ddd",this.number ) ;  

    }
   receiveData($event:string){
     this.closePhones=$event
   }
 
   private watchLoginState(): void {
      this.authService.getIsLoggedIn().subscribe(isLoggedIn => {
         this.isLoggedIn = isLoggedIn;
         if (isLoggedIn) {
             // Get user data from localStorage 

             let phoneNumber =  localStorage.getItem('phoneNumber');
             let userLang =  localStorage.getItem('userLang');
             let userEmail =  localStorage.getItem('userEmail');
            // Get user data from access token
            this.userEmail = this.authService.getDecodedToken().sub;
            this.userPhone = this.authService.getTokenUserPhoneNum();
            this.userLang=this.authService.getTokenUserLang();
            /* this.userPhone = phoneNumber ? phoneNumber:this.authService.getTokenUserPhoneNum();
            this.userEmail = userEmail ? userEmail:this.authService.getDecodedToken().sub; */
            console.log("in localStorage",  userEmail,phoneNumber)
            console.log("in token",this.authService.getDecodedToken().sub,this.authService.getTokenUserPhoneNum() )

            this.restLocal;

         }
      });
   }
   /* to reset the local Storge */
   restLocal(){
   
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("userEmail");


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