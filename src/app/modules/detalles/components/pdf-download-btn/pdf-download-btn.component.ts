import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
import { NgxPrintDirective } from 'ngx-print';
import { ExpedienteService } from 'src/app/modules/shared/services/expediente/expediente.service';

@Component({
  selector: 'app-pdf-download-btn',
  templateUrl: './pdf-download-btn.component.html',
  styleUrls: ['./pdf-download-btn.component.css']
})
export class PdfDownloadBtnComponent implements AfterViewInit{

  @ViewChild(NgxPrintDirective, {static: true}) printDirective!: NgxPrintDirective;

  constructor(
    public expedienteService: ExpedienteService,
    public printService: PrintService) {
  }

  ngAfterViewInit(): void {
    this.printDirective.printTitle = "Expediente digital de " + this.expedienteService.getEmpleado().nombre;
  }

  startPrinting() {
    let scale = this.printService.calculatePrintScale();
    this.printDirective.printStyle = { 
      'gridster': {
        'transform': 'scale(' + scale + ')', 
        'transform-origin': 'left top'
      }
    };

    this.printService.printingPreprocess();

  }

  @HostListener('window:resize', ['$event']) 
  setPrintStyle() {
    //this.printService.printingPreprocess();

    //let scale = this.printService.calculatePrintScale();
    //console.log("scale: " + scale);

    /*
    this.printDirective.printStyle = { 
      'gridstack': {
        'transform': 'scale(' + scale + ')', 
        'transform-origin': 'left top'
      }
    };
    */
  }
}
