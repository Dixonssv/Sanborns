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

          //this.cards.at(this.cards.length - 1)!.index = this.cards.length - 1;

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

  swapCards(from_index: number, to_index: number): Observable<void> {
    return new Observable<void>(observable => {
      if(to_index < from_index) {
        let tmp_index = from_index;

        from_index = to_index;
        to_index = tmp_index;
      }

      console.log("From: " + from_index + " to: " + to_index);

      // Se extraen las dos cartas
      let toCard    = this.cards.splice(to_index, 1)[0];
      let fromCard  = this.cards.splice(from_index, 1)[0];

      // Se insertan en sus correspondientes indices
      this.cards.splice(from_index, 0, toCard);
      this.cards.splice(to_index, 0, fromCard);
    })
  }

  moveCard(from_index: number, to_index: number): Observable<void> {
    return new Observable<void>(observable => {

      let card = this.cards.splice(from_index, 1)[0];

      /*
      // CASO: insertar carta al final
      if (to_index == this.cards.length) {
        this.cards.push(card);
        return;
      }
      */

      // CASO: insertar carta en medio     
      // inserta la carta en la nueva posicion
      // Se suma 1 debido a que en la linea anterior, el tamanio del arreglo se disminuyo en uno. Esto solo afecta
      // cuando la carta se inserta en una posicion anterior.
      if (from_index < to_index) {
        this.cards.splice(to_index, 0, card);
      } else {
        this.cards.splice(to_index + 1, 0, card);
      }
      
      
      //this.cards.splice(to_index, 0, card);
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

  updateCardIndexes() {
    let i = 0;
    this.cards.forEach((card) => {
      card.index = i;
      i++;
    });
  }
}
