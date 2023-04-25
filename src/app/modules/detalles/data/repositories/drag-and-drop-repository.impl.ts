import { Injectable } from '@angular/core';
import { DragAndDropRepository } from '../../core/repositories/drag-and-drop.repository';
import { CdkDragStart, CdkDragMove, CdkDragEnd, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Observable, from } from 'rxjs';
import { ViewportRuler } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropRepositoryImplService extends DragAndDropRepository {

  dropListGroup!: CdkDropListGroup<CdkDropList>;

  private dragItem: any;
  private dropItem: any;

  private currentDropItem: any;

  constructor(private viewportRuler: ViewportRuler) {
    super();
  }

  override dragStarted(event: CdkDragStart<any>): Observable<void> {
    return new Observable<void>(observable => {
      let point = this.getPointerPositionOnPage(event.event);

      this.dropListGroup._items.forEach((dropList: any) => {
        if (this.isInsideDropList(dropList, point.x, point.y)) {
          this.dragItem = dropList;
          return;
        }
      });

      this.currentDropItem = this.dragItem;
    });
  }

  override dragMoved(event: CdkDragMove<any>): Observable<void> {
    return new Observable<void>(observable => {
      let point = this.getPointerPositionOnPage(event.event);

      this.dropListGroup._items.forEach((dropList: any) => {
        if (this.isInsideDropList(dropList, point.x, point.y)) {
          this.dropItem = dropList;
          return;
        }
      });

      if (this.dragItem == this.dropItem) {
        this.currentDropItem == this.dragItem;
      }

      if (this.currentDropItem != this.dropItem && this.dropItem != this.dragItem) {
        this.moveItem(this.dragItem, this.dropItem);
      }
    });
  }

  override moveItem<CdkDropList>(dragItem: CdkDropList, dropItem: CdkDropList): Observable<{ from_index: number; to_index: number; }> {
    let drag = (dragItem as any).element.nativeElement;
    let drop = (dropItem as any).element.nativeElement;
    let parent = drop.parentElement;

    let dragIndex = this.indexOf(parent, drag) - 1;
    let dropIndex = this.indexOf(parent, drop) - 1;

    dragIndex < 0 ? 0 : dragIndex;
    dropIndex < 0 ? 0 : dropIndex;

    //parent.insertBefore(drag, dropIndex == 0 ? drop.nextSibling : drop);
    //parent.insertBefore(drag, dragIndex < dropIndex ? drop.nextSibling : drop);
    //parent.insertBefore(drag, drop);
    parent.insertBefore(drag, drop.nextSibling);

    this.currentDropItem = this.dropItem;

    return new Observable<{ from_index: number; to_index: number; }>(observable => {
      observable.next({from_index: dragIndex, to_index: dropIndex});
    })
  }

  override onDropped(event: CdkDragEnd<any>): Observable<void> {
    return new Observable<void>(observable => {
      observable.next();
    })
  }

  override canDrop(): boolean {
    return false;
  }
  /*
  override canDrop(): Observable<boolean> {
    return new Observable<boolean>(observable => observable.next(false)).pipe((canDrop) => canDrop);
  }
  */

  private getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
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

  private indexOf(collection: any, node: any) {
    let index = Array.from(collection.children).indexOf(node);

    // verifica si el nodo esta fuera de la coleccion (indice -1)
    // si es asi, regresa el indice sobrecargado de la collecion
    return index == -1 ? collection.children.length : index;
  }

  private isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
  }

  private isInsideDropList(dropList: CdkDropList, x: number, y: number) {
    const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right;
  }


}
