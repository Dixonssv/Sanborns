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

  private emptyThreshold = 16; // Distancia que revisa al rededor del cursor para determinar un espacio vacio.

  private dragItem: any;
  private dropItem: any;

  //private lastDropItem: any;

  // Evita el parpadeo
  private canMove = false;

  constructor(private viewportRuler: ViewportRuler) { }

  dragStarted(event: CdkDragStart<any>): Observable<void> {
    return new Observable<void>(observable => {
      this.canMove = false;
      //this.lastDropItem = null;

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

      if(this.isInsideEmptySpace(point)) {
        this.dropItem = this.getClosestToEmptySpace(point);
      } else {
        this.dropListGroup._items.forEach((dropList: any) => {
          if (this.isInsideDropList(dropList, point)) {
            this.dropItem = dropList;
            return;
          }
        });
      }

      // Se prepara para desplazar
      if(this.dropItem == null || this.dropItem == this.dragItem) {
        this.canMove = true;
      } else {
        if (this.canMovePredicate()) {
          // Mueve el elemento
          this.moveItem(this.dragItem, this.dropItem, this.isInsideEmptySpace(point));
        } 

        // Evita el parpadeo
        this.canMove = false;
      }
    });
  }

  canMovePredicate(): boolean {
    /*
      En computacion, un predicado es una pregunta que puede responderse como verdadera o falsa.
      En este caso, se evaluan un conjunto de reglas que determinan si el dragItem puede
      o no cambiar su posicion.
    */

    return (
      this.dropItem != this.dragItem     && 
      this.dropItem != null              && 
      this.canMove == true
      );
  }

  moveItem<CdkDropList>(dragItem: CdkDropList, dropItem: CdkDropList, after?: boolean) {
    let drag = (dragItem as any).element.nativeElement;
    let drop = (dropItem as any).element.nativeElement;
    let parent = drop.parentElement;

    let dragIndex = this.indexOf(this.dragItem);
    let dropIndex = this.indexOf(this.dropItem);

    //parent.insertBefore(drag, drop);
    //parent.insertBefore(drag, drop.nextSibling);
    if(dragIndex < dropIndex || after) {
      // insert after
      parent.insertBefore(drag, drop.nextSibling);
    } else {
      // insert before
      parent.insertBefore(drag, drop);
    }

    if(dragIndex > dropIndex && after) {
      dropIndex += 1;
    }

    //parent.insertBefore(drag, dragIndex < dropIndex || after ? drop.nextSibling : drop);
    this.itemsMoved.next({from_index: dragIndex, to_index: dropIndex});
  }

  /*
  moveItemToBegining(dragItem: CdkDropList) {
    let dropItem: any = null;

    // Obtiene el primer dropList
    this.dropListGroup._items.forEach((dropList) => {
      if(dropItem == null) {
        dropItem = dropList;
      }
    });

    this.moveItem(dragItem, dropItem);
  }

  moveItemToEnd(dragItem: CdkDropList) {
    let dropItem: any = null;

    // Obtiene el ultimo droplist
    this.dropListGroup._items.forEach((dropList) => {
      dropItem = dropList;
    });

    this.moveItem(dragItem, dropItem, true);
  }
  */

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

  isInsideDropListGroup(point: {x: number, y: number}, border? : number) {
    let rect = this.dragItem.element.nativeElement.parentElement.getBoundingClientRect();

    return (
      point.x >= rect.left   + (border ? border : 0) &&
      point.x <= rect.right  - (border ? border : 0) &&
      point.y >= rect.top    + (border ? border : 0) &&
      point.y <= rect.bottom - (border ? border : 0));
  }

  isAboveDropListGroup(point: {x: number, y: number}, border? : number): boolean {
    let rect = this.dragItem.element.nativeElement.parentElement.getBoundingClientRect();

    return (point.y < rect.top + (border ? border : 0));
  }

  isBelowDropListGroup(point: {x: number, y: number}, border? : number): boolean {
    let rect = this.dragItem.element.nativeElement.parentElement.getBoundingClientRect();

    return (point.y > rect.bottom - (border ? border : 0));
  }

  isInsideEmptySpace(point: {x: number, y: number}) {

    if(!this.isInsideDropListGroup(point, this.emptyThreshold)) {
      return false;
    }

    let result = true;
    this.dropListGroup._items.forEach((dropList) => {
      if (!(
        !this.isInsideDropList(dropList, {x: point.x - this.emptyThreshold, y: point.y}) && // No hay cartas a la izquierda
        !this.isInsideDropList(dropList, {x: point.x + this.emptyThreshold, y: point.y}) && // No hay cartas a la derecha
        !this.isInsideDropList(dropList, {x: point.x, y: point.y - this.emptyThreshold}) && // No hay cartas arriba
        !this.isInsideDropList(dropList, {x: point.x, y: point.y + this.emptyThreshold})    // No hay cartas abajo
      )) {
        // Hay una carta cerca
        result = false;
      }
    });
    return result;
  }

  getClosestToEmptySpace(point: {x: number, y: number}) {
    let closestDropList = null;

    // Revisa a la izquierda
    let newPoint = {x: point.x, y: point.y};
    while(this.isInsideDropListGroup(newPoint) && closestDropList == null) {
      newPoint.x--;

      this.dropListGroup._items.forEach((dropList) => {
        if(this.isInsideDropList(dropList, newPoint)) {
          closestDropList = dropList;
        }
      });
    };

    // Revisa a la derecha
    newPoint = {x: point.x, y: point.y};
    while(this.isInsideDropListGroup(newPoint) && closestDropList == null) {
      newPoint.x++;

      this.dropListGroup._items.forEach((dropList) => {
        if(this.isInsideDropList(dropList, newPoint)) {
          closestDropList = dropList;
        }
      });
    };

    return closestDropList;
  }
}
