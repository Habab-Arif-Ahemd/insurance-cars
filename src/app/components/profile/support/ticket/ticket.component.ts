import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';import { NgForm } from '@angular/forms';
import { TicketsParms } from 'src/app/models/profile/tickets';
import { AppService } from 'src/app/services/app/app.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {

  showTicketAnaltics: boolean = true;
  showTicketDetails: boolean = false;
  showTicketCreation: boolean = false;
  isLoadingTickets: boolean = false;
  showStatus: boolean = false;
  ticketsList;
  TicketsParms: TicketsParms = <TicketsParms>{};
  ticketId: string;
  statusBgColor: string;
  lang: string;
  ticketStatus: any[] = [];

  constructor(
    private profileService: ProfileService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAppLang();
    this.getTicketsList();
    this.getTicketStatus();
  }
  getAppLang() {
    this.appService.getAppLang().subscribe((lang) => (this.lang = lang));
    console.log(this.lang);
  }

  getTicketsList() {
    this.isLoadingTickets = true;
    if (Object.keys(this.TicketsParms).length == 0) {
      this.TicketsParms.ticketStatusId = null;
      this.TicketsParms.pageNumber = 1;
      this.TicketsParms.pageSize = 10;
    }
    this.profileService.getTicketsList(this.TicketsParms).subscribe(
      (tickets: any) => {
        this.ticketsList = tickets;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.isLoadingTickets = false;
        window.scroll(0, 0);
        // console.log(this.isLoadingTickets)
      }
    );
  }

  getTicketStatus() {
    this.profileService.getTicketStatus().subscribe((status: any) => {
      this.ticketStatus = status;
    });
  }

  getStatusColor(ticketStatus) {
    let status = this.ticketStatus.filter(status => status.name == ticketStatus)[0];
   return status.bgColor;
  }

  changePagenumber(pageNumber) {
    this.TicketsParms.pageNumber = pageNumber;
    this.getTicketsList();
  }

  /* Ticket page Navigation */
  showAnaltics() {
    this.showTicketAnaltics = true;
    this.showTicketDetails = false;
    this.showTicketCreation = false;
  }

  showDetails(ticketId, statusBgColor) {
    console.log(ticketId)
    // this.ticketId = ticketId;
    // this.statusBgColor = statusBgColor;
    this.showTicketAnaltics = false;
    this.showTicketDetails = true;
    this.showTicketCreation = false;
    localStorage.setItem('ticketId', ticketId);
    this.router.navigateByUrl("/user/support/details");

  }

  showCreation() {
    this.showTicketAnaltics = false;
    this.showTicketDetails = false;
    this.showTicketCreation = true;
  }


}
