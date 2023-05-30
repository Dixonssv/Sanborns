import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private scrollX:number;
  private scrollY:number;

  constructor() { 
    this.scrollX = 0;
    this.scrollY = 0;
  }

  scroll(scroll?: {scrollX: number, scrollY: number}) {
    console.log("Scroll: " + this.scrollX + ", " + this.scrollY);
    window.scrollTo(
      scroll ? scroll.scrollX : this.scrollX, 
      scroll ? scroll.scrollY : this.scrollY);
  }

  softScroll(scroll?: {scrollX: number, scrollY: number}) {
    window.scrollTo({
      top: scroll ? scroll.scrollY : this.scrollY,
      left: scroll ? scroll.scrollX : this.scrollX,
      behavior: "smooth",
    });
  }

  scrollToBottom() {
    window.scroll(this.scrollX, 100);
  }

  setCurrentScroll() {
    this.scrollX = window.scrollX;
    this.scrollY = window.scrollY;
  }
}
