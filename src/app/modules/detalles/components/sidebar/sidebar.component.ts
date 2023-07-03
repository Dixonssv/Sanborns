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
    let cardlist = this.dashboardService.cards;

    let cardKey: keyof typeof cardlist;

    for(cardKey in this.dashboardService.cards) {
      this.addCardToDashboard(cardlist[cardKey]);
    }

    /* 
    // Tambien funciona:
    Object.entries(this.dashboardService.cards).forEach((card) => {
      this.addCardToDashboard(card[1]);
    })
    */
  }

  removeAllCardsFromDashboard() {
    let cardlist = this.dashboardService.cards;

    let cardKey: keyof typeof cardlist;

    for(cardKey in this.dashboardService.cards) {
      //console.log("Deleta card: ");
      //console.log(cardlist[cardKey]);

      this.dashboardService.deleteCard(cardlist[cardKey]);
    }

    console.log("Loaded Cards:");
    console.log(this.dashboardService.getCards()); 
  }

}
