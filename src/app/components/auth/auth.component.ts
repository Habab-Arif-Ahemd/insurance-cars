import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  displayForm = {
    login: false,
    signup: false,
    forgetPassword: false,
    verfication: false,
    verficationRestpassword: false,
  };
 
  constructor(private authService: AuthService) {}
 
  ngOnInit(): void {
    this.watchActiveForm();
  }
 
  displayActiveForm(formType: string) {
    for (var key of Object.keys(this.displayForm)) {
      this.displayForm[key] = false;
    }
 
    for (var key of Object.keys(this.displayForm)) {
      if (key === formType) this.displayForm[key] = true;
    }
    console.log(this.displayForm)
  }
 
  closeActiveModal() {
    this.authService.setIsAuthModalShown(false);
    
  }

  watchActiveForm(){
   this.authService.getAuthModalActive().subscribe(activeForm => {
    this.displayActiveForm(activeForm);
   })
  }

}