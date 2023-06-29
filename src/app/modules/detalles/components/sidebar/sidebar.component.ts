import { Component } from '@angular/core';

import { DashboardService } from '../../services/dashboard/dashboard.service';
import { CardMapper, StringCardMapper } from '../../models/mappers/card.mapper';
import { CardModel } from '../../models/card.model';

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

  constructor(
    public dashboardService: DashboardService
  ) { }

  addCardToDashboard(card: CardModel | null) {
    this.dashboardService.addCard(card!);
  }

  addAllCardsToDashboard() {
    this.cardTypes.forEach((type) => {
      //this.addCardToDashboard(type);
    });
  }

  removeAllCardsFromDashboard() {
    this.cardTypes.forEach((type) => {
      //this.dashboardService.deleteCard(this.stringCardMapper.mapFrom(type)).subscribe();
    })
  }

}
