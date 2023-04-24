import { CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs";

export abstract class DragAndDropRepository {
    abstract dragStarted(event: CdkDragStart):      Observable<void>;
    abstract dragMoved(event: CdkDragMove):         Observable<void>;
    abstract onDropped(event: CdkDragEnd):          Observable<void>;
    abstract canDrop():                             Observable<boolean>;
    abstract moveItem<I>(dragItem: I, dropItem: I): Observable<{from_index: number, to_index: number}>;
    //abstract getPointerPositionOnPage(event: MouseEvent | TouchEvent):      Observable<{x: number, y: number}>;
    //abstract isInsideDropList(dropList: CdkDropList, x: number, y: number): Observable<boolean>;
}