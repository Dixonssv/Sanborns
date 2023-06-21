import { AfterViewInit, EventEmitter, HostListener, Injectable, OnInit } from '@angular/core';
import { NgxPrintDirective } from 'ngx-print';
import { PrintableDirective } from 'src/app/modules/shared/directives/printable/printable.directive';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  printableObject!: PrintableDirective;
  printBtn!: NgxPrintDirective;

  // 96 es el DPI clasico. Buscar otra manera de calcularlo para evitar Hard-coding
  printResolution = 96;

  // Tamanios de papel
  readonly papers = {
    LETTER: {
      width: (dpi: number) => {
        switch(dpi) {
          case 72:
            return 612;
          case 96:
            return 816;
          case 150:
            return 1276;
          case 200:
            return 1701;
          case 300:
            return 2551;
          default:
            return 816;
        }
      }, 
      height: 791}
  }

  constructor() { 

  }

  printingPreprocess() {
    //let printElement = this.printableObject.element;
    //printElement.style.transform = "scale(" + this.calculatePrintScale() + ")";
    //printElement.style.transformOrigin = "left top";

    this.printableObject.print();
  }

  calculatePrintScale() {
    const paperWidth = this.papers.LETTER.width(this.printResolution);

    let objectWidth = this.printableObject.getWidth();

    return paperWidth / objectWidth;
  }
}
