import { Component } from '@angular/core';
import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';

@Component({
  selector: 'app-test-dashboard',
  templateUrl: './test-dashboard.component.html',
  styleUrls: ['./test-dashboard.component.css']
})
export class TestDashboardComponent {
  constructor(public dashboardRepository: DashboardRepositoryImplService) {
    
  }

  addCard(type: string) {
    this.dashboardRepository.addCard(type).subscribe();
  }
}
