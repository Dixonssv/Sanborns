import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';

@Injectable({
    providedIn: 'root'
})
export class destroy implements UseCase<void, void> {
    constructor(public dashboardRepository: DashboardRepositoryImplService) { }

    execute(params: void): Observable<void> {
        return this.dashboardRepository.destroy();
    }
}