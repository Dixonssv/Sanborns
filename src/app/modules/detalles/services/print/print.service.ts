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
  printResolution = 120;

  // Tamanios de papel
  readonly paperType = {
    LETTER: (dpi: number) => {
      return {
        width:  dpi * 8.5,
        height: dpi * 11,
      }
    },
  }

  constructor() { 

  }

  printingPreprocess() {
    this.printableObject.printing(true);
  }

  calculatePrintScale() {
    const paperWidth = this.paperType.LETTER((this.printResolution)).width;

    let objectWidth = this.printableObject.getWidth();

    return paperWidth / objectWidth;
  }
}
