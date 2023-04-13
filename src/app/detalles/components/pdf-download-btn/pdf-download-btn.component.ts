import { Component } from '@angular/core';
import { DashboardComponentsService } from '../../services/dashboard-components.service';

@Component({
  selector: 'app-pdf-download-btn',
  templateUrl: './pdf-download-btn.component.html',
  styleUrls: ['./pdf-download-btn.component.css']
})
export class PdfDownloadBtnComponent {

  constructor(public dashboardService: DashboardComponentsService) {
    
  }
}
