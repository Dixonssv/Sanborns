import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CardModel } from '../domain/card.model';
import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';

@Injectable({
    providedIn: 'root'
})
export class getCardsUseCase implements UseCase<void, CardModel> {

    constructor(public dashboardRepository: DashboardRepositoryImplService) { }

    execute(params: void): Observable<CardModel> {
        return this.dashboardRepository.getCards();
    }
}