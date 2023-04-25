import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CardModel } from '../domain/card.model';
import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';

@Injectable({
    providedIn: 'root'
})
export class searchCardUseCase implements UseCase<CardModel, number> {
    constructor(public dashboardRepository: DashboardRepositoryImplService) { }
    
    execute(params: CardModel): Observable<number> {
        return this.dashboardRepository.searchCard(params);
    }
}