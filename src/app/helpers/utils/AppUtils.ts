import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export default class AppUtils {

   public static delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
   }


   public static addDays(date: Date, numOfDays: number) {
      date = new Date(new Date().getTime() + (86400000 * numOfDays));
      return date;
   }


   public static searchItemTerm(term: string, item: any) {
      console.log(term, item)
      // Convert the input term to lowercase
      term = term.toLocaleLowerCase();
      // Return search result
      return item.name.toLocaleLowerCase().indexOf(term) > -1 ||
      item.nameAr.toLocaleLowerCase().indexOf(term) > -1;
   }

   public static scrollToTarget(elementId: string) {

      let element = document.getElementById(elementId);

      var bodyRect = document.body.getBoundingClientRect(),
      elemRect = element.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top - 300;
  
      window.scrollTo({top: offset, behavior: "smooth"});

   }


   public static scrollToTargetElm(el: HTMLElement, offsetTop?: number | 0, offsetBottom?: number | 0) {

      var bodyRect = document.body.getBoundingClientRect(),
      elemRect = el.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top - 300;
  
      window.scrollTo({top: offset - offsetTop + offsetBottom, behavior: "smooth"});

   }


   public static disableScrolling() {
      let x = window.scrollX;
      let y = window.scrollY;
      window.onscroll = function() { window.scrollTo(x, y); };
   }


   public static enableScrolling() {
      window.onscroll = function() {};
   }

   public static formatDate(d: NgbDate): string {
      if (d === null) {
        return null;
      }
  
      return [
        d.day < 10 ? "0" + d.day : d.day,
        d.month < 10 ? "0" + d.month : d.month,
        d.year,
      ].join("-");
    }
     /**  @param compareFn 
    used to add and remove violation and medical condition and vehichle specification */
   public static addQuoteCheckBoxs(id: number, addedValue: string): string {
      // search selected id in added value and get the index of the value
      let index = addedValue.search(id.toString());
      if (index === -1) {
         // if lenght is 0 which mean first added value concat the string id with current string
        addedValue.length == 0 ? addedValue = addedValue.concat(id.toString()) :
         // if not the first index contcat the string id with ','
          addedValue = addedValue.concat(',', id.toString());
          return addedValue;
      } else if (index == 0) {
        let addedValueArr = addedValue.split('');
        addedValueArr.splice(index, 2);
        addedValue = addedValueArr.join('')
        return addedValue;
      } else {
        let addedValueArr = addedValue.split('');
        addedValueArr.splice(index - 1, 2);
        addedValue = addedValueArr.join('')
        return addedValue;
      }
    }

    public static uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
   }
}
