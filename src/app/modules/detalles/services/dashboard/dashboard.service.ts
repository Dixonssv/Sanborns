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
    TRAYECTORIA: {
      title: "Trayectoria",
      selector: "app-trayectoria",
      w: 2, h: 2,
    } as CardModel,
    CURSOS: {
      title: "Cursos",
      selector: "app-cursos",
      w: 6, h: 1,
    } as CardModel
    
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

  getCard(selector: string): CardModel | null {
    let cardKey: keyof typeof this.cards;

    for(cardKey in this.cards) {
      if(this.cards[cardKey].selector === selector) {
        return this.cards[cardKey];
      }
    }

    return null;
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

  deleteCard(card: CardModel, emmitEvent: boolean = true): void {
    console.log("Delete card: ");
    console.log(card);

    console.log("IsIndashboard: " + this.isIndashboard(card));

    if(this.isIndashboard(card)) {
      let index = this.indexOf(card);
      console.log("Index:" + index);

      let deletedCard = this.loadedCards.splice(index, 1)[0];

      if(emmitEvent) {
        this.cardsChanged.next(true);
        this.cardDeleted.next(deletedCard);
      }
    }
  }

  cardEquals(card1: CardModel, card2: CardModel): boolean {
    let propKey: keyof CardModel;

    for(propKey in card1) {
      if(card1[propKey] != card2[propKey]) {
        return false;
      }
    }

    return true;
  }

  isIndashboard(card: CardModel) {
    //return this.indexOf(card) >= 0;

    return this.indexOf(card) >= 0;
  }

  indexOf(card: CardModel): number {
    let index = -1;

    let count = 0;
    this.loadedCards.forEach((loadedCard) => {
      if(this.cardEquals(card, loadedCard)) {
        index = count;
      }
      count ++;
    })

    return index;
  }

  destroy(): Observable<void> {
    return new Observable<void>(observable => {
      this.loadedCards = [];
    });
  }
}
