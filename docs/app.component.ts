import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
//import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AuthService } from './services/auth/auth.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
 
export class AppComponent implements OnInit {
    isAtProfile: boolean;
    // Reference modal variable inside Component
    @ViewChild('template') template: ElementRef;
  
    constructor(private router: Router, private authService: AuthService, private modalService:NgbModal, private config: NgbModalConfig) { }
    ngOnInit() {
        this.checkIfAtProfile();
        this.watchAuthModal();
         // customize default values of modals used by this component tree
         this.config.size= "lg";
         this.config.windowClass= "auth-modal"
    }

   
  private checkIfAtProfile(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
        this.isAtProfile = event.url.startsWith('/user/')
     });
  }

 
    /**
       * Opens the authentication modal
       *
       * @memberof AuthModalComponent
       */
 
    watchAuthModal() {
        this.authService.getIsAuthModalShown().subscribe(modalShown => {
            modalShown? this.displayAuthModal(this.template) : this.closeAuthModal();
        })
    }

    displayAuthModal(template: ElementRef<any>): void {
      this.modalService.open(template);
    }

    closeAuthModal(){

        this.modalService.dismissAll()
    }

}
