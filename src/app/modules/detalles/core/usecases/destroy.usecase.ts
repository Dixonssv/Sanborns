import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CardModel } from '../domain/card.model';

@Injectable({
    providedIn: 'root'
})
export class destroy implements UseCase<void, void> {
    execute(params: void): Observable<void> {
        throw new Error('Method not implemented.');
    }
}