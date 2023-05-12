import { CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  itemsMoved = new Subject<{ from_index: number; to_index: number; }>();

  dropListGroup!: CdkDropListGroup<CdkDropList>;

  private dragItem: any;
  private dropItem: any;

  private currentDropIndex: any;
  private lastDropItem!: CdkDropList | null;

  constructor(private viewportRuler: ViewportRuler) { }

  dragStarted(event: CdkDragStart<any>): Observable<void> {
    return new Observable<void>(observable => {
      let point = this.getPointerPositionOnPage(event.event);

      this.dropListGroup._items.forEach((dropList: any) => {
        if (this.isInsideDropList(dropList, point)) {
          this.dragItem = dropList;
          return;
        }
      });

      let drag = (this.dragItem as any).element.nativeElement;
      let parent = drag.parentElement;
      this.currentDropIndex = this.indexOf(parent, drag);
    });
  }

  dragMoved(event: CdkDragMove<any>): Observable<void> {
    return new Observable<void>(observable => {
      
      let point = this.getPointerPositionOnPage(event.event);

      this.dropListGroup._items.forEach((dropList: any) => {
        if (this.isInsideDropList(dropList, point)) {
          this.dropItem = dropList;
          return;
        }
      });

      if(this.dropItem != this.lastDropItem) {
        this.lastDropItem = null;
      }

      if (this.dropItem != this.dragItem && this.dropItem != this.lastDropItem) {
        try {
          this.moveItem(this.dragItem, this.dropItem);
          this.lastDropItem = this.dropItem;
        } catch {}
      }
    });
  }

  moveItem<CdkDropList>(dragItem: CdkDropList, dropItem: CdkDropList) {
    let drag = (dragItem as any).element.nativeElement;
    let drop = (dropItem as any).element.nativeElement;
    let parent = drop.parentElement;

    //let dragIndex = this.indexOf(parent, drag) - 1;
    //let dropIndex = this.indexOf(parent, drop) - 1;

    let dragIndex = this.indexOf(parent, drag);
    let dropIndex = this.indexOf(parent, drop);

    //dragIndex < 0 ? 0 : dragIndex;
    //dropIndex < 0 ? 0 : dropIndex;

    //parent.insertBefore(drag, dropIndex == 0 ? drop.nextSibling : drop);
    if(this.currentDropIndex != dropIndex) {
      parent.insertBefore(drag, dragIndex < dropIndex ? drop.nextSibling : drop);

      this.itemsMoved.next({from_index: dragIndex, to_index: dropIndex});

      this.currentDropIndex = dropIndex;
    } else {
      throw Error();
    }

    
    
    //parent.insertBefore(drag, drop);
    //parent.insertBefore(drag, drop.nextSibling);

    /*
    dragIndex < dropIndex ? 
    this.itemsMoved.next({from_index: dragIndex, to_index: dropIndex}) :
    this.itemsMoved.next({from_index: dragIndex, to_index: dropIndex - 1 < 0 ? 0 : dropIndex - 1});
    */
  }

  onDropped(event: CdkDragEnd<any>): Observable<void> {
    return new Observable<void>(observable => {
      observable.next();
    })
  }

  canDrop(): boolean {
    return false;
  }
  /*
  override canDrop(): Observable<boolean> {
    return new Observable<boolean>(observable => observable.next(false)).pipe((canDrop) => canDrop);
  }
  */

  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
    const point = this.isTouchEvent(event)
      ? event.touches[0] || event.changedTouches[0]
      : event;
    const scrollPosition = this.viewportRuler.getViewportScrollPosition();

    return {
      x: point.pageX - scrollPosition.left,
      y: point.pageY - scrollPosition.top,

      //x: point.pageX,
      //y: point.pageY,
    };
  }

  indexOf(collection: any, node: any) {
    let index = Array.from(collection.children).indexOf(node);

    // verifica si el nodo esta fuera de la coleccion (indice -1)
    // si es asi, regresa el indice sobrecargado de la collecion
    return index == -1 ? collection.children.length : index;
  }

  isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
  }

  isInsideDropList(dropList: CdkDropList, point: {x: number, y: number}) {
    const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
    return point.y >= top && point.y <= bottom && point.x >= left && point.x <= right;
  }
}
