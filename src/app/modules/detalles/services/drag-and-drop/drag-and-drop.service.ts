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

      this.currentDropIndex = this.indexOf(this.dragItem);
    });
  }

  dragMoved(event: CdkDragMove<any>): Observable<void> {
    return new Observable<void>(observable => {

      /*
      let point = this.getPointerPositionOnPage(event.event);

      this.dropListGroup._items.forEach((dropList: any) => {
        if (this.isInsideDropList(dropList, point)) {
          this.dropItem = dropList;
          return;
        }
      });
      */
     console.log(event.source.getFreeDragPosition());
      let intersections = this.getIntersections(event.source);
      console.log("Intersecciones: " + intersections.length);

      // Obtiene la interseccion con el indice mas pequeño
      let index = Number.MAX_SAFE_INTEGER;
      this.dropItem = null;
      intersections.forEach((dropList) => {
        if (this.indexOf(dropList) < index) {
          index = this.indexOf(dropList);
          this.dropItem = dropList;
        }
      });

      if (this.dropItem != this.lastDropItem) {
        this.lastDropItem = null;
      }

      if (this.dropItem != this.dragItem && this.dropItem != this.lastDropItem) {
        try {
          //this.moveItem(this.dragItem, this.dropItem);
          //this.lastDropItem = this.dropItem;
        } catch { }
      }
    });
  }

  moveItem(dragItem: CdkDropList, dropItem: CdkDropList) {
    let drag = (dragItem as any).element.nativeElement;
    let drop = (dropItem as any).element.nativeElement;
    let parent = drag.parentElement;

    let dragIndex = this.indexOf(dragItem);
    let dropIndex = this.indexOf(dropItem);

    //parent.insertBefore(drag, dropIndex == 0 ? drop.nextSibling : drop);
    if (this.currentDropIndex != dropIndex) {
      parent.insertBefore(drag, dragIndex < dropIndex ? drop.nextSibling : drop);

      this.itemsMoved.next({ from_index: dragIndex, to_index: dropIndex });

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

  indexOf(dropList: CdkDropList) {
    let node = dropList.element.nativeElement;
    let collection = dropList.element.nativeElement.parentElement;

    let index = Array.from(collection!.children).indexOf(node);

    // verifica si el nodo esta fuera de la coleccion (indice -1)
    // si es asi, regresa el indice sobrecargado de la collecion
    return index == -1 ? collection!.children.length : index;
  }

  isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
  }

  isInsideDropList(dropList: CdkDropList, point: { x: number, y: number }) {
    const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
    return point.y >= top && point.y <= bottom && point.x >= left && point.x <= right;
  }

  getIntersections(dragItemPreview: any) {

    let intersections: CdkDropList[] = [];

    this.dropListGroup._items.forEach((dropList: any) => {
      if (this.intersects(dragItemPreview, dropList)) {
        intersections.push(dropList);
      }
    });

    return intersections;
  }

  intersects(item1: any, item2: any): boolean {
    let rect1 = item1.element.nativeElement.getBoundingClientRect();
    let rect2 = item2.element.nativeElement.getBoundingClientRect();

    console.log(rect1);
    //return ((rect1.bottom > rect2.top || rect1.top < rect2.bottom) && (rect1.right > rect2.left || rect1.left < rect2.right));
    return !(rect1.right < rect2.left || 
      rect1.left > rect2.right || 
      rect1.bottom < rect2.top || 
      rect1.top > rect2.bottom);
  }
}
