import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLogin } from 'src/app/payload/requests/auth/UserLogin';
import { tap, catchError } from 'rxjs/operators';
import { UserRegistration } from 'src/app/payload/requests/auth/UserRegistration';
import { LoginResponse } from 'src/app/payload/responses/auth/LoginResponse';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { ApiRoutes } from 'src/app/models/app/ApiRoutes';
import { AccessToken } from 'src/app/models/app/AccessToken';
import { UserVerification } from 'src/app/payload/requests/auth/UserVerification';
import { RegistrationResponse } from 'src/app/payload/responses/auth/RegistrationResponse';
import { Injector } from "@angular/core";
// import { Resetpassword } from 'src/app/payload/requests/auth/Resetpassword';
import { PasswordResetRequest } from 'src/app/payload/requests/auth/PasswordResetRequest';
import { PasswordReset } from 'src/app/payload/requests/auth/Resetpassword';


@Injectable({
   providedIn: 'root'
})


export class AuthService {
   static injector: Injector;
   apiUrl: string = environment.apiUrl;
   isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
   isAuthModalShown = new BehaviorSubject<boolean>(false);
   authFormActive = new BehaviorSubject<string>("");
   jwtHelper = new JwtHelperService();
   constructor(private router: Router, private http: HttpClient) { }
   /* Authentication */
   login(userLogin: UserLogin) {
      return this.http.post(this.apiUrl + ApiRoutes.Account.Login, userLogin).pipe(
         tap((res: LoginResponse) => {
            if (res.isSuccess) {
               localStorage.setItem(LocallyStoredItemsKeys.JWT, res.accessToken);
               this.setIsLoggedIn(true);
               console.log(this.getDecodedToken());
            }
         })
      );
   }
   async logout(): Promise<any> {
      // Clear JWT from localstorage
      await localStorage.removeItem(LocallyStoredItemsKeys.JWT);
      // Update logged in status
      this.setIsLoggedIn(false);
      // Navigate user back to home page
      await this.router.navigate([AppRoutes.landing]);
   }
   register(userRegistration: UserRegistration) {
      return this.http.post(this.apiUrl + ApiRoutes.Account.Register, userRegistration);
   }
   /* send reset password request */

   PasswordResetRequest(passwordResetRequest: PasswordResetRequest) {
      return this.http.post(this.apiUrl + ApiRoutes.Account.PasswordResetRequest, passwordResetRequest);
   }
   /* confirm password  reset*/
   resetpassword(resetpassword: PasswordReset) {
      return this.http.post(this.apiUrl + ApiRoutes.Account.PasswordReset, resetpassword);
   }
   /* verfication */
   sendVerificationCode(verificationCode: number) {
      // Get verification data from local storage
      const verificationUserId = localStorage.getItem(LocallyStoredItemsKeys.VerificationUserId);
      const verificationPhoneNum = localStorage.getItem(LocallyStoredItemsKeys.VerificationPhoneNumber);
      // Construct verification request body
      const verificationReq: UserVerification = {
         userId: verificationUserId,
         phoneNumber: verificationPhoneNum,
         code: verificationCode.toString()
      };

      // Send the verification request
      return this.http.post(this.apiUrl + ApiRoutes.Account.VerifyPhone, verificationReq).pipe(
         tap((res: LoginResponse) => {
            if (res.isSuccess) {
               localStorage.setItem(LocallyStoredItemsKeys.JWT, res.accessToken);
               this.setIsLoggedIn(true);
            }
         })
      );
   }

   resendVerficationCode(UserVerificationData: RegistrationResponse) {
      // Send the verification request
      return this.http.post(this.apiUrl + ApiRoutes.Account.ResendVerfication, UserVerificationData);
   }

   /* Access Token */

   public getDecodedToken(): AccessToken {
      const token = localStorage.getItem(LocallyStoredItemsKeys.JWT);
      return this.jwtHelper.decodeToken(token);
   }


   private isTokenAvailable(): boolean {
      return !!localStorage.getItem(LocallyStoredItemsKeys.JWT);
   }


   /* Access Token Claims */

   public getTokenUserId(): string {
      return this.getDecodedToken().jti;
   }


   public getTokenClientId(): string {
      return this.getDecodedToken().cid;
   }


   public getTokenUserPhoneNum(): string {
      return this.getDecodedToken().tel;
   }


   public getTokenUserLang(): string {
      return this.getDecodedToken().lng;
   }


   /* Getters and Setters  */

   setIsLoggedIn(isLoggedIn: boolean): void {
      this.isLoggedIn.next(isLoggedIn);
   }


   getIsLoggedIn(): BehaviorSubject<boolean> {
      return this.isLoggedIn;
   }

   /* login model form */

   setIsAuthModalShown(isAuthModalShown: boolean): void {
      this.isAuthModalShown.next(isAuthModalShown);
   }


   getIsAuthModalShown(): BehaviorSubject<boolean> {
      return this.isAuthModalShown;
   }

   setAuthModalActive(activeForm: string): void {
      this.authFormActive.next(activeForm)
   }

   getAuthModalActive(): BehaviorSubject<string> {
      return this.authFormActive
   }
 
   
}
