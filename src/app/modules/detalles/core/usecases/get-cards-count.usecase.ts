import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CardModel } from '../domain/card.model';

@Injectable({
    providedIn: 'root'
})
export class getCardsCountUseCase implements UseCase<void, number> {
    execute(params: void): Observable<number> {
        throw new Error('Method not implemented.');
    }
}