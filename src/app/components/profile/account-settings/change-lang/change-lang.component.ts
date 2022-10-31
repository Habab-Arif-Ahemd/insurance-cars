import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from 'src/app/models/app/StatusCodes';
import { ApiResponse } from 'src/app/payload/responses/ApiResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
@Component({
  selector: 'app-change-lang',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.css']
})
export class ChangeLangComponent implements OnInit {
  @Output() closeLanguages = new EventEmitter();

   showEditLang:boolean=false;
   changeLangForm :FormGroup;
   isLoading:boolean=false;
  constructor(
   private formBuilder: FormBuilder,
   private ProfileService:ProfileService, 
   private authService: AuthService
  ) { }
/* -------------------------------------------------------------------------- */
   /*                           INITIALIZATION                                */
   /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
   this.initform();
  }
  initform(){
  this.changeLangForm = this.formBuilder.group({
   language:  ['',Validators.required],

  });
  }
/* -------------------------------------------------------------------------- */
   /*                                API / SUBMIT                                */
   /* -------------------------------------------------------------------------- */ 
    changelang(){
      this.isLoading = true;
    this.changeLangForm.value.userId = this.authService.getTokenUserId();
    this.ProfileService.changeLang(this.changeLangForm.value).subscribe(
      (res: ApiResponse) => {
         console.log(res.statusCode);
         // Stop the loader
         this.isLoading = false;
         //this.showVerfication.emit();
         if (res.isSuccess || res.statusCode == StatusCodes.EmailNotSent) {
           
         } else {
           
         }
      },
      (err) => {
         console.log(err.statusCode);
         // Close modal on server error
         if (err.status == 0 || err.status == 500) console.log(err) /* this.closeModal.emit(); */
         // Stop the loader
         this.isLoading = false;
         // Display error alert
         // this.displayAlert('ErrorAlert', err.error);
      }
   );
  }

}
