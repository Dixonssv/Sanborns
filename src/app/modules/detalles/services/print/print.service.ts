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
  private readonly paperType = {
    LETTER: (dpi: number) => {
      return {
        width:  dpi * 8.5,
        height: dpi * 11,
      }
    },
  }

  constructor() { 

  }

  print() {
    this.setPrintStyle();
    this.printableObject.onPrintStart.emit();
    this.printBtn.print();
    this.printableObject.afterPrintStart.emit();
  }

  setPrintTitle(title: string) {
    this.printBtn.printTitle = title;
  }

  setPrintStyle() {
    let scale = this.calculatePrintScale();
    //console.log("scale: " + scale);

    this.printBtn.printStyle = { 
      'body': {
        'transform': 'scale(' + scale + ')', 
        'transform-origin': 'left top',
      }
    };
  }

  private calculatePrintScale() {
    const paperWidth = this.paperType.LETTER(this.printResolution).width;

    let objectWidth = this.printableObject.getWidth();

    return paperWidth / objectWidth;
  }
}
