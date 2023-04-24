import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CardModel } from '../domain/card.model';

@Injectable({
    providedIn: 'root'
})
export class getCardsUseCase implements UseCase<void, CardModel> {
    execute(params: void): Observable<CardModel> {
        throw new Error('Method not implemented.');
    }
}