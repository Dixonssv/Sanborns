import { Component } from '@angular/core';

import { DashboardComponentsService } from '../../services/dashboard-components.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private dashboard: DashboardComponentsService) {

  }

  addCardToDashboard(component:string) {
    this.dashboard.addCard(component);
  }

}
