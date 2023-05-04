import { Injectable } from '@angular/core';
import { CardModel } from '../../models/card.model';
import { CardMapper } from '../../models/mappers/card.mapper';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  /* 1rem = 16px */
  readonly gridCellHeight: number = 48; //px = 3rem
  readonly gridGap: number        = 16; //px = 1rem

  private cards: CardModel[];

  private cardMapper: CardMapper;

  cardsChanged = new Subject<boolean>();
  cardInDashboard = new Subject<number>();

  constructor() {
    this.cards = [];

    this.cardMapper = new CardMapper();
  }

  getCards(): Observable<CardModel> {
    return from(this.cards).pipe((cards) => cards);
  }

  getCardsCount(): Observable<number> {
    return new Observable<number>(observable => {
      observable.next(this.cards.length)
    }).pipe((count) => count);
  }

  addCard(type: string): Observable<void> {
    return new Observable<void>(observable => {

      let card = this.cardMapper.mapFrom(type);

      this.searchCard(card).subscribe((index) => {
        if (index == -1) {
          this.cards.push(card);

          this.cardsChanged.next(true);
        } else {
          this.cardInDashboard.next(index);
        }
      });

      //console.log(this.cards);
      //this.getCardsCount().subscribe((count) => console.log("Card count: " + count));
      //this.getCards().subscribe((card) => console.log(card));
    });
  }

  moveCard(from_index: number, to_index: number): Observable<void> {
    return new Observable<void>(observable => {
      // CASO: insertar carta al final
      if (to_index == this.cards.length) {
        let card = this.cards.splice(from_index, 1);
        this.cards.push(card[0]);
        return;
      }

      // CASO: insertar carta en medio
      // remueve la carta del arreglo
      let card = this.cards.splice(from_index, 1);

      // inserta la carta en la nueva posicion
      // Se suma 1 debido a que en la linea anterior, el tamanio del arreglo se disminuyo en uno. Esto solo afecta
      // cuando la carta se inserta en una posicion anterior.
      if (from_index < to_index) {
        this.cards.splice(to_index - 1, 0, card[0]);
      } else {
        this.cards.splice(to_index, 0, card[0]);
      }
    });
  }

  deleteCard(card: CardModel): Observable<void> {
    return new Observable<void>(observable => {
      this.searchCard(card).subscribe((index) => {
        if (index >= 0) {
          // Se encuentra en el array

          this.cards.splice(index, 1);

          this.cardsChanged.next(true);
        }
      });
    });
  }

  searchCard(searchCard: CardModel): Observable<number> {

    return new Observable<number>(observable => {
      let i = 0;
      let index = -1;

      this.cards.forEach(card => {
        if (card.component == searchCard.component) {
          index = i;
        }
        i++;
      });

      observable.next(index);
    });
  }

  destroy(): Observable<void> {
    return new Observable<void>(observable => {
      this.cards = [];
    });
  }
}
