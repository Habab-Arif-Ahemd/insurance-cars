import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class Scroll {
/* Scroll To element */
  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
