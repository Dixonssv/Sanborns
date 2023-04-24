import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/modules/common/core/base/use-case';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root'
})
export class onDropped implements UseCase<CdkDragEnd, void> {
    execute(params: CdkDragEnd<any>): Observable<void> {
        throw new Error('Method not implemented.');
    }
}