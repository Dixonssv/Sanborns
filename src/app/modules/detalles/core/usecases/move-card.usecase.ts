import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';

@Injectable({
    providedIn: 'root'
})
export class moveCardUseCase implements UseCase<{from_index: number, to_index:number}, void> {
    constructor(public dashboardRepository: DashboardRepositoryImplService) { }

    execute(params: { from_index: number; to_index: number; }): Observable<void> {
        return this.dashboardRepository.moveCard(params.from_index, params.to_index);
    }
}