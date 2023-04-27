import { Component } from '@angular/core';

import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private dashboardService: DashboardService) { }

  addCardToDashboard(component:string) {
    this.dashboardService.addCard(component).subscribe();
  }

}
