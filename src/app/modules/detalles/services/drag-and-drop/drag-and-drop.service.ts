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

  // Evita el parpadeo
  private canMove = false;

  constructor(private viewportRuler: ViewportRuler) { }

  dragStarted(event: CdkDragStart<any>): Observable<void> {
    return new Observable<void>(observable => {
      this.canMove = false;

      let point = this.getPointerPositionOnPage(event.event);

      // Obtiene el DragItem
      this.dropListGroup._items.forEach((dropList: any) => {
        if (this.isInsideDropList(dropList, point)) {
          this.dragItem = dropList;
          return;
        }
      });
    });
  }

  dragMoved(event: CdkDragMove<any>): Observable<void> {
    return new Observable<void>(observable => {
      
      let point = this.getPointerPositionOnPage(event.event);

      // Obtiene el DropItem
      this.dropItem = null;
      this.dropListGroup._items.forEach((dropList: any) => {
        if (this.isInsideDropList(dropList, point)) {
          this.dropItem = dropList;
          return;
        }
      });

      // Se prepara para desplazar
      if(this.dropItem == null || this.dropItem == this.dragItem) {
        this.canMove = true;
      } else {
        if (this.canMovePredicate()) {
          this.moveItem(this.dragItem, this.dropItem);
        }

        // Evita el parpadeo
        this.canMove = false;
      }
    });
  }

  moveItem<CdkDropList>(dragItem: CdkDropList, dropItem: CdkDropList) {
    let drag = (dragItem as any).element.nativeElement;
    let drop = (dropItem as any).element.nativeElement;
    let parent = drop.parentElement;

    let dragIndex = this.indexOf(this.dragItem);
    let dropIndex = this.indexOf(this.dropItem);

    /*
    // Despazar
    if(dragIndex < dropIndex) {
      // Desplazar a la derecha
      parent.insertBefore(drag, drag.nextSibling.nextSibling);
    } else {
      // Desplazar a la izquierda
      parent.insertBefore(drag, drag.previousElementSibling);
    }
    */

    //parent.insertBefore(drag, drop);
    //parent.insertBefore(drag, drop.nextSibling);
    parent.insertBefore(drag, dragIndex < dropIndex ? drop.nextSibling : drop);

    this.itemsMoved.next({from_index: dragIndex, to_index: dropIndex});
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

  canMovePredicate(): boolean {
    return (
      this.dropItem != this.dragItem  && 
      this.dropItem != null           && 
      //Math.abs(this.indexOf(this.dropItem) - this.indexOf(this.dragItem)) <= 1 &&
      this.canMove == true
      );
  }

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

  indexOf(item: CdkDropList) {
    let child = item.element.nativeElement;
    let parent = child.parentElement;

    let index = Array.from(parent!.children).indexOf(child);

    // verifica si el nodo esta fuera de la coleccion (indice -1)
    // si es asi, regresa el indice sobrecargado de la collecion
    return index == -1 ? parent!.children.length : index;
  }

  isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
  }

  isInsideDropList(dropList: CdkDropList, point: {x: number, y: number}) {
    const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
    return point.y >= top && point.y <= bottom && point.x >= left && point.x <= right;
  }
}
