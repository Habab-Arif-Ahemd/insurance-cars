import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-gregorian-datepicker',
  templateUrl: './gregorian-datepicker.component.html',
  styleUrls: ['./gregorian-datepicker.component.css']
})
export class GregorianDatepickerComponent implements OnInit {
   // onDatepicker event sending from child componenet to parent component
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
   // driver type id comming from parent component
  @Input() previousQuoteDriverBirthDate: { driverTypeId: number; birthDate: string; };
  date: NgbDateStruct;
  startDateYear;
  maxDateYear;
  stepNum: number;

  constructor() {}
  ngOnInit() {
    this.setStartAndMinDate();
/*     if(this.previousQuoteDriverBirthDate) {this.getPreviousQuoteDate()}
 */    if(this.previousQuoteDriverBirthDate?.driverTypeId === 2) {this.getPreviousQuoteDate()}

  }

  getPreviousQuoteDate() {
    var strDate = this.previousQuoteDriverBirthDate.birthDate
    if (strDate) {
      var DateParts = strDate.split("-");
      var dt = new Date(
        Number(DateParts[2]),
        Number(DateParts[1]) - 1,
        Number(DateParts[0])
      );
      this.date = {
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
      };
      this.pickedDate(this.date);
    }
   
  }

  pickedDate(date: any) {
    this.onDatePicked.emit(date);
  }

  setStartAndMinDate() {
    var currentMeladiDate = new Date();
    var currentYear = currentMeladiDate.getFullYear();
    this.startDateYear = currentYear - 90;
    this.maxDateYear = currentYear - 17;
  }
}

