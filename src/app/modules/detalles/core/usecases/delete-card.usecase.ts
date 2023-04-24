import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CardModel } from '../domain/card.model';

@Injectable({
    providedIn: 'root'
})
export class addCardUseCase implements UseCase<CardModel, void> {
    execute(params: CardModel): Observable<void> {
        throw new Error('Method not implemented.');
    }
}