import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css',

]
})
export class FooterComponent implements OnInit {
  currentYear: number;
  isAtUserProfile:boolean;
  // AppRoutes: any = AppRoutes;
  termsAndConditions =AppRoutes.termandconditions;
  privacyPolicy = AppRoutes.privacyPolicy;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.getCurrentYear();
    this.checkIfAtUserProfile();
  
  }
  private getCurrentYear(): void {
    this.currentYear = new Date().getFullYear();
 }

//  get if the user at a profile

private checkIfAtUserProfile(): void {
   this.router.events.subscribe((event: any) => {
     if (event instanceof NavigationEnd) {
       this.isAtUserProfile = event.url.startsWith('/user');
     }
   });
 }
}