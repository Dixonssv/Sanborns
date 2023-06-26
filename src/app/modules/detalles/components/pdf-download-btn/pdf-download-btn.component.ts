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

  public printScale: number = 1;

  @ViewChild(NgxPrintDirective, {static: true}) printDirective!: NgxPrintDirective;

  constructor(
    public expedienteService: ExpedienteService,
    public printService: PrintService) {
    
  }

  ngAfterViewInit(): void {
    this.printService.printBtn = this.printDirective;

    let title = "Expediente digital de " + this.expedienteService.getEmpleado().nombre;
    this.printService.setPrintTitle(title);
  }

  triggerPrint() {
    this.printService.print();
  }
}
