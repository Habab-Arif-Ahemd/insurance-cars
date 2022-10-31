import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import AppUtils from "src/app/helpers/utils/AppUtils";
import { AppLanguage } from 'src/app/models/app/AppLanguage';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { LoadingPageTypes } from 'src/app/models/app/LoadingPageTypes';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { AppService } from 'src/app/services/app/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isChangingLang: boolean = false;
  isAr: boolean;
  isAtProfile: boolean= false;
  appLanguage: any;
  isAtLanding: boolean;
  isAtquote:boolean;
  isAtCheckout: boolean;
  isOnMidScreen: boolean = false;
  hasScrolledBanner: boolean;
  isNavbarOpen: boolean;
  isNavbarCollapsed: boolean = false;
  isLoggedIn: boolean;
  userEmail: string;
  AppRoutes: any = AppRoutes;
  toggleSideBar: boolean = false;
  isCollapsed: boolean = true;
  
  constructor(private appService: AppService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkIfAtLanding();
    this.checkIfAtProfile();
    this.getScreenSize();
    this.getCurrentAppLanguage();
    this.watchLoginState();
    this.initUserData();

  }

  private getCurrentAppLanguage(): void {
    // Get current language from local storage
    this.appLanguage = localStorage.getItem(LocallyStoredItemsKeys.AppLanguage);
    // Get it from the observable if doesn't exist on local storage
    if (!this.appLanguage) {
      this.appLanguage = this.appService.getAppLang().value;
    }
    // Set the header lang link
    this.isAr = this.appLanguage === 'ar' ? true : false;
    // Watch for language changes
    this.appService.getAppLang().subscribe((lang) => (this.appLanguage = lang));
  }

  async switchLang() {
    console.log(this.appLanguage);
    // Set the active loader type to language switch
    this.appService.setActiveLoadingPageType(LoadingPageTypes.LanguageSwitch);
    // Show loader
    this.isChangingLang = !this.isChangingLang;
    // Delay until animation ends, also switch document direction
     await AppUtils.delay(2800);
    // Switch the language
    if (!this.appLanguage || this.appLanguage === AppLanguage.ENGLISH) {
      this.appService.setLanguage(AppLanguage.ARABIC);
      this.isAr = true;
      this.isChangingLang = !this.isChangingLang;
    } else {
      this.appService.setLanguage(AppLanguage.ENGLISH);
      this.isAr = false;
      this.isChangingLang = !this.isChangingLang;
    }
  }

  private checkIfAtProfile(): void {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationStart) {
        this.isAtProfile = event.url.startsWith('/user/');
        console.log('isAtProfilewwwwwwww',this.isAtProfile);
      }
      // else{
      //   this.isAtProfile = false;
      //   console.log(event.url, this.isAtProfile);
      // } 
    })
  }

  private checkIfAtLanding(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isAtLanding = event.url === '/';
        this.isAtquote = (event.url === '/request/quotes' ||  event.url === '/request/checkout');
        console.log(event.url);
      }
    });
  }

 /* CC(){
  window.location.reload();
  
 }
 */

  /* -------------------------------------------------------------------------- */
   /*                                  Listeners                                 */
   /* -------------------------------------------------------------------------- */

   /**
    * Watches authentication status changes and gets the user data from jwt that'll be displayed on navbar
    *
    * @private
    * @memberof HeaderComponent
    */
    private initUserData(): void {
      // Watch for login
      this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          // Get user data from access token
          this.userEmail = this.authService.getDecodedToken().sub;
          // TODO: Uncomment when user's full name is added to jwt claims
          /* this.userFullName = this.authService.getDecodedToken().FullName;
              this.userFullNameAr = this.authService.getDecodedToken().FullNameAr; */
        }
      });
    }

   private watchLoginState(): void {
    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
 }

  // Listen for window size changes
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): void {
    // If browser window is resized below mid screen size width
    window.innerWidth <= 858
      ? (this.isOnMidScreen = true)
      : (this.isOnMidScreen = false);
  }

  // Window scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (window.pageYOffset > 100) this.hasScrolledBanner = true;
    else this.hasScrolledBanner = false;
  }
  onNavLinkClick() {
    // Close the navbar
    this.isNavbarOpen = false;
  }

   displayAuthModal() {
       this.authService.setIsAuthModalShown(true);
   }
 /**
    * Unauthenticates the user
    *
    * @memberof HeaderComponent
    */
   logout(): void {
    this.authService.logout();
 }


  /* Navigation To Home Sectione */
  toWhyUs() {
    document.getElementById("Why-Us").scrollIntoView({behavior:"smooth"});
  }

  toInsuranceCoverage() {
    document.getElementById("Insurance-Coverage").scrollIntoView({behavior:"smooth"});
  }

  toParteners() {
    document.getElementById("Parteners").scrollIntoView({behavior:"smooth"});
  }

  toCallBack() {
    document.getElementById("Call-Back").scrollIntoView({behavior:"smooth"});
  }

  toFaq() {
    document.getElementById("FAQ").scrollIntoView({behavior:"smooth"});
  }

 
}
