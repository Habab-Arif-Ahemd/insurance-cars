import { Component, Input, OnInit,  EventEmitter,Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/services/app/app.service';
import { TicketFollowUp, TicketResponse, TicketsParms } from "../../../../models/profile/tickets";
import { map } from 'rxjs/internal/operators/map';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  /* Captcha */
  @Output() showTicketsAnaltics = new EventEmitter();
  @Input() ticketId: string;
  @Input() statusBgColor: string;

   /* UI */
   ticket: TicketResponse = <TicketResponse>{};
   lang: any;
   message: string = "";
   ticketFollowUp: TicketFollowUp[] = [];
   isLoadingTicket: boolean = false;
   isSending: boolean;
   closeTicketAlert: boolean = false;
   closeTicketLoader: boolean = false;
   state: Observable<object>;


  constructor(
    private profileService: ProfileService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getAppLang();
     this.getTicketById();

  }

  getAppLang() {
    this.appService.getAppLang().subscribe((lang) => (this.lang = lang));
  }
  getTicketById() {
    this.isLoadingTicket = true;
    const ticketId = localStorage.getItem("ticketId");
    console.log("ticketId From ticketdetails =>", ticketId);
    this.profileService.getTicket(ticketId).subscribe(
      (ticket: any) => {
        this.ticket = ticket.ticket;
        this.ticketFollowUp = ticket.ticketFollowUp;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.isLoadingTicket = false;
        /* this.ticketFollowUp.forEach((f,i) => {
            if(i % 2 !== 0) {
                f.sender = 'Support Team'
            }
        }) */
      }
    );
  }

  changeStatus(ticketId: string, statusId: number) {
    const status = { ticketId: ticketId, statusId: statusId };
    console.log(status);
    this.closeTicketLoader = true;
    this.profileService.changeStatus(status).subscribe(
      (res: any) => {
        if (res.isSuccess) {
          this.closeTicketAlert = true;
          setTimeout(() => {
            this.closeTicketAlert = false;
          }, 4000);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.closeTicketLoader = false;
      }
    );
  }

  sendfollowUp() {
    this.isSending = true;
    const message: { message: string; ticketId: string } = {
      message: this.message,
      ticketId: this.ticketId,
    };

    this.profileService.sendfollowUp(message).subscribe(
      (res: any) => {
        console.log(res);
        if (res.isSuccess) {
          this.ticketFollowUp.push({
            createdDate: new Date().toString(),
            message: message.message,
            sender: "client",
            newMessage: true,
          });
        }
        this.ticketFollowUp.forEach((followUp) => {
          if (followUp.newMessage) {
            setTimeout(() => {
              followUp.newMessage = false;
            }, 2000);
          }
        });
        this.message = "";
      },
      (err) => {
        console.log(err);
        this.isSending = false;
      },
      () => {
        this.isSending = false;
      }
    );
  }
   timeSince(date) {
    Date.parse(date);
    if (typeof date !== 'object') {
        date = new Date(date);
      }
      var seconds = Math.floor((new Date().valueOf() - date) / 1000);
      var intervalType;

      var interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = 'year';
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = 'month';
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = 'day';
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += 's';
      }

      return interval + ' ' + intervalType;
    }
}
