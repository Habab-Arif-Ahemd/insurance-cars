import {Component, EventEmitter, Injectable, Input, OnInit, Output} from "@angular/core";
import {NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import { InsuranceStepsService } from 'src/app/services/insurance-steps/insurance-steps.service';

const WEEKDAYS = ["ن", "ث", "ر", "خ", "ج", "س", "ح"];
const MONTHS = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number) {
    return WEEKDAYS[weekday - 1];
  }

  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-higri-datepicker',
  templateUrl: './higri-datepicker.component.html',
  styleUrls: ['./higri-datepicker.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
  ],
})
export class HigriDatepickerComponent implements OnInit {
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
  //  previousQuoteDriverBirthDate comming from parent component
  @Input() previousQuoteDriverBirthDate: { driverTypeId: number; birthDate: string; };

  date: NgbDateStruct;
  startDateYear: number;
  maxDateYear: number;
  constructor( private calendar: NgbCalendar, private insuranceStep: InsuranceStepsService ) { }

  ngOnInit(): void {
    this.setStartAndMinDate();
     if(this.previousQuoteDriverBirthDate?.driverTypeId === 1) {this.getPreviousQuoteDate()}
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

  
  setStartAndMinDate() {
    var currentHijriYear: any = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
      year: "numeric",
    }).format(Date.now());

    var currentYear = parseInt(currentHijriYear.substring(0, 4));
    this.startDateYear = currentYear - 103;
    this.maxDateYear = currentYear - 17;
  }

  pickedDate(date: any) {
    this.onDatePicked.emit(date);
  }

}
