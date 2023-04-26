import { Component } from '@angular/core';

import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';
import { addCardUseCase } from '../../core/usecases/add-card.usecase';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private addCard: addCardUseCase) {

  }

  addCardToDashboard(component:string) {
    this.addCard.execute(component).subscribe();
  }

}
