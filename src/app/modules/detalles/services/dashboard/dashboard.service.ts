import { Injectable } from '@angular/core';
import { CardModel } from '../../models/card.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService { 

  public readonly cards = {
    DATOS_PERSONALES: {
      title: "Datos personales",
      selector: "app-datos-personales",
      w: 4, h: 1,
    } as CardModel,
    CURRICULUM: {
      title: "Curriculum",
      selector: "app-curriculum",
      w: 2, h: 3,
    } as CardModel,
    ESTUDIOS: {
      title: "Estudios",
      selector: "app-estudios",
      w: 4, h: 3,
    } as CardModel,
    CONTRATO: {
      title: "Contrato",
      selector: "app-contrato",
      w: 2, h: 2,
    } as CardModel,
    HORARIO: {
      title: "Horario",
      selector: "app-horario",
      w: 8, h: 1,
    } as CardModel,
    DOCUMENTOS: {
      title: "Documentos",
      selector: "app-documentos",
      w: 4, h: 4,
    } as CardModel,
    NOMINA: {
      title: "Nomina",
      selector: "app-nomina",
      w: 2, h: 1,
    } as CardModel,
    ACTAS: {
      title: "Actas",
      selector: "app-actas",
      w: 4, h: 1,
    } as CardModel,
    
  }

  private loadedCards: CardModel[];

  /* EVENTOS */
  cardsChanged = new Subject<boolean>();
  cardInDashboard = new Subject<number>();
  cardAdded = new Subject<CardModel>();
  cardDeleted = new Subject<CardModel>();

  public cardsCount = () => {
    return this.loadedCards.length;
  }

  constructor() {
    this.loadedCards = [];
  }

  getCards(): CardModel[] {
    return this.loadedCards;
  }
  
  addCard(card: CardModel, emmitEvent: boolean = true): void {
    if(this.isIndashboard(card)) {
      if(emmitEvent) {
        this.cardInDashboard.next(1);
      }
    } else {
      this.loadedCards.push(card);

      if(emmitEvent) {
        this.cardsChanged.next(true);
        this.cardAdded.next(card);
      }
    }
  }

  isIndashboard(card: CardModel) {
    let result = false;

    this.loadedCards.forEach((loadedCard: CardModel) => {
      if(card === loadedCard) {
        result = true;
      }
    });

    return result;
  }

  deleteCard(card: CardModel, emmitEvent: boolean = true): void {
    if(this.isIndashboard(card)) {
      let index = this.loadedCards.indexOf(card);

      let deletedCard = this.loadedCards.splice(index, 1)[0];

      if(emmitEvent) {
        this.cardsChanged.next(true);
        this.cardDeleted.next(deletedCard);
      }
    }
  }

  destroy(): Observable<void> {
    return new Observable<void>(observable => {
      this.loadedCards = [];
    });
  }
}
