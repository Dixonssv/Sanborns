import { Component } from '@angular/core';

import { DashboardService } from '../../services/dashboard/dashboard.service';
import { CardMapper, StringCardMapper } from '../../models/mappers/card.mapper';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  readonly cardTypes = [
    "Datos personales",
    "Curriculum",
    "Estudios",
    "Contrato",
    "Horario",
    "Documentos",
    "Nomina",
    "Actas",
    "Trayectoria",
    "Cursos",
  ]

  stringCardMapper : StringCardMapper = new StringCardMapper();

  constructor(private dashboardService: DashboardService) { }

  addCardToDashboard(component:string) {
    this.dashboardService.addCard(component).subscribe();
  }

  addAllCardsToDashboard() {
    this.cardTypes.forEach((type) => {
      this.addCardToDashboard(type);
    });
  }

  removeAllCardsFromDashboard() {
    this.cardTypes.forEach((type) => {
      this.dashboardService.deleteCard(this.stringCardMapper.mapFrom(type)).subscribe();
    })
  }

}
