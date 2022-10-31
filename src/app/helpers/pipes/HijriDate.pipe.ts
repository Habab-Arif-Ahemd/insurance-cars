import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({ name: 'HijriDate' })
export class HijriDatePipe implements PipeTransform {

   transform(date: Date | string, format: string = 'EEEE, MMMM d, y', lang: 'ar'): string {

      // if orginal type was a string
      date = new Date(date);
      date.setDate(date.getDate());

      var options = { year: 'numeric', month: 'long', day: 'numeric'};
      let hijriDate = date.toLocaleString(lang + '-u-ca-islamic', options);

      return hijriDate;
   }

}
