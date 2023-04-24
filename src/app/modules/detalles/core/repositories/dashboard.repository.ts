import { Observable } from "rxjs";
import { CardModel } from "../domain/card.model";

export abstract class DashboardRepository {
    abstract getCards():                                    Observable<CardModel>
    abstract getCardsCount():                               Observable<number>;
    abstract addCard(type:string):                          Observable<void>;
    abstract moveCard(from_index: number, to_index:number): Observable<void>;
    abstract deleteCard(card: CardModel):                   Observable<void>;
    abstract searchCard(card: CardModel):                   Observable<number>; // isInDashboard()
    abstract destroy():                                     Observable<void>;
}