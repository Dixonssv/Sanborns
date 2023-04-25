import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';

@Injectable({
    providedIn: 'root'
})
export class getCardsCountUseCase implements UseCase<void, number> {
    constructor(public dashboardRepository: DashboardRepositoryImplService) { }
    
    execute(params: void): Observable<number> {
        return this.dashboardRepository.getCardsCount();
    }
}