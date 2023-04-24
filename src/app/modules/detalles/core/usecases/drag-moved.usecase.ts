import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root'
})
export class dragMoved implements UseCase<CdkDragMove, void> {
    execute(params: CdkDragMove<any>): Observable<void> {
        throw new Error('Method not implemented.');
    }
}