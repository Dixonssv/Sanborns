import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CardModel } from '../domain/card.model';

@Injectable({
    providedIn: 'root'
})
export class moveCardUseCase implements UseCase<{from_index: number, to_index:number}, void> {
    execute(params: { from_index: number; to_index: number; }): Observable<void> {
        throw new Error('Method not implemented.');
    }
}