import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  
  isTicket: boolean = true;
  isTicketDetails: boolean = false;
  isTicketSupportForm:boolean=false;
  

  constructor() { }

  ngOnInit(): void {
 
  }

  Ticket()
  {
    this.isTicket = true;
    this.isTicketDetails = false;
    this.isTicketSupportForm=false;
  }
  TicketDetail(){
  
    this.isTicket = false;
    this.isTicketDetails = true;
    this.isTicketSupportForm=false;
  }
  TicketSupportForm(){
    this.isTicket = false;
    this.isTicketDetails = false;
    this.isTicketSupportForm=true;

  }

 

  }
