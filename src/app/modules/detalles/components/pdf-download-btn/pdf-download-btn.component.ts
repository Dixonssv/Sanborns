import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
import { NgxPrintDirective } from 'ngx-print';

@Component({
  selector: 'app-pdf-download-btn',
  templateUrl: './pdf-download-btn.component.html',
  styleUrls: ['./pdf-download-btn.component.css']
})
export class PdfDownloadBtnComponent implements AfterViewInit{

  public printScale: number = 1;

  @ViewChild(NgxPrintDirective, {static: true}) printDirective!: NgxPrintDirective;

  constructor(public printService: PrintService) {
    
  }

  ngAfterViewInit(): void {
    this.setPrintStyle();
  }

  @HostListener('window:resize', ['$event']) 
  setPrintStyle() {
    let scale = this.printService.calculatePrintScale();

    this.printDirective.printStyle = { 
      'main': {
        'transform': 'scale(' + scale + ')', 
        'transform-origin': 'left top',
      }
    };
  }
}
