import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CdkDragStart } from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root'
})
export class dragStarted implements UseCase<CdkDragStart, void> {
    execute(params: CdkDragStart<any>): Observable<void> {
        throw new Error('Method not implemented.');
    }
}