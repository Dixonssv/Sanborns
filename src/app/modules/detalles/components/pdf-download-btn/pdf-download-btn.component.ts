import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-pdf-download-btn',
  templateUrl: './pdf-download-btn.component.html',
  styleUrls: ['./pdf-download-btn.component.css']
})
export class PdfDownloadBtnComponent {

  constructor() {
    
  }

  @HostListener("window:beforeprint", ["$event"])
    async beforePrint($event: any) {
        await console.log("Printing");
    }
}
