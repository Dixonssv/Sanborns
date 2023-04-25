import { Injectable } from '@angular/core';
import { DashboardRepository } from '../../core/repositories/dashboard.repository';
import { Observable, Subject, from, map } from 'rxjs';
import { CardModel } from '../../core/domain/card.model';
import { CardMapper } from '../mappers/card.mapper';

@Injectable({
  providedIn: 'root'
})
export class DashboardRepositoryImplService extends DashboardRepository {

  private cards: CardModel[];

  private cardMapper: CardMapper;

  cardsChanged = new Subject<boolean>();
  cardInDashboard = new Subject<number>();

  constructor() {
    super();

    this.cards = [];

    this.cardMapper = new CardMapper();
  }

  override getCards(): Observable<CardModel> {
    return from(this.cards).pipe((cards) => cards);
  }

  override getCardsCount(): Observable<number> {
    return new Observable<number>(observable => {
      observable.next(this.cards.length)
    }).pipe((count) => count);
  }

  override addCard(type: string): Observable<void> {
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

  override moveCard(from_index: number, to_index: number): Observable<void> {
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

  override deleteCard(card: CardModel): Observable<void> {
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

  override searchCard(searchCard: CardModel): Observable<number> {

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

  override destroy(): Observable<void> {
    return new Observable<void>(observable => {
      this.cards = [];
    });
  }


}
