import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';

@Injectable({
    providedIn: 'root'
})
export class addCardUseCase implements UseCase<string, void> {
    constructor(public dashboardRepository: DashboardRepositoryImplService) { }
    
    execute(params: string): Observable<void> {
        return this.dashboardRepository.addCard(params);
    }
}