import { CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  itemsMoved    = new Subject<{ from_index: number; to_index: number; }>();
  itemsSwapped  = new Subject<{ from_index: number; to_index: number; }>();

  dropListGroup!: CdkDropListGroup<CdkDropList>;

  private emptyThreshold = 16; // Distancia que revisa al rededor del cursor para determinar un espacio vacio.

  private dragItem: any;
  private dropItem: any;

  private insideEmptySpace: boolean = false;

  private dropListsPositions: any[] = [];

  // Evita el parpadeo
  private canMove = false;

  private animating = false;

  constructor(private viewportRuler: ViewportRuler) { 

    this.itemsMoved.pipe().subscribe(() => {
      this.dropListsPositions = this.getDropListsRects();
    });
    this.itemsSwapped.pipe().subscribe(() => {
      this.dropListsPositions = this.getDropListsRects();
    })
  }

  dragStarted(event: CdkDragStart<any>): Observable<void> {

    return new Observable<void>(observable => {
      this.canMove = false;
      //this.lastDropItem = null;

      let point = this.getPointerPositionOnPage(event.event);

      // Obtiene el DragItem
      this.dragItem = this.getDropListAtPoint(point);
      
    });
  }

  dragMoved(event: CdkDragMove<any>): Observable<void> {
    return new Observable<void>(observable => {
      if(this.dragItem != null) {
        this.getDropItem(event);

        this.movePlaceholder();
      }
    });
  }

  getDropItem(event: CdkDragMove<any>) {
    let point = this.getPointerPositionOnPage(event.event);

      // Obtiene el DropItem
      this.dropItem = null;

      if(this.isInsideEmptySpace(point)) {

        //if(this.insideEmptySpace == false) { // Evita lag
          let closeDropLists = this.getClosestDropListsToPoint(point);

          if(closeDropLists.left == null && closeDropLists.right == null) {
            // Evita parpadeo
            this.canMove = false;
          } else {
            if(closeDropLists.left != null && this.dropItem == null) {
              let lastPeer = this.getLastPeer(closeDropLists.left);
              
              if(lastPeer == closeDropLists.left) {
                // No tiene listas al lado
                //console.log("Close: left");
                this.dropItem = closeDropLists.left;
              }
            }
    
            if(closeDropLists.top != null && this.dropItem == null) {
              //console.log("Close: top");
              this.dropItem = this.getLastPeer(closeDropLists.top);
            }
          }
        //}

        this.insideEmptySpace = true;
        //console.log("Drop List: " + this.indexOf(this.dropItem));
      } else {
        this.insideEmptySpace = false;

        this.dropItem = this.getDropListAtPoint(point);
      }
  }

  canMovePredicate(): boolean {
    /*
      En computacion, un predicado es una pregunta que puede responderse como verdadera o falsa.
      En este caso, se evaluan un conjunto de reglas que determinan si el dragItem puede
      o no cambiar su posicion.
    */

    return (
      this.dropItem != this.dragItem    && 
      this.dropItem != null             && 
      this.animating == false           &&
      this.canMove == true
      );
  }

  movePlaceholder() {
    // Se prepara para desplazar
    if(this.dropItem == null || this.dropItem == this.dragItem) {
      this.canMove = true;
    } else {
      if (this.canMovePredicate()) {
        if(this.insideEmptySpace) {
          this.moveItem(this.dragItem, this.dropItem);
        } else {
          this.swapItems(this.dragItem, this.dropItem);
        }
      } 

      // Evita el parpadeo
      this.canMove = false;
    }
  }

  swapItems(dragItem: CdkDropList, dropItem: CdkDropList) {
    let dragIndex = this.indexOf(this.dragItem);
    let dropIndex = this.indexOf(this.dropItem);
    this.itemsSwapped.next({from_index: dragIndex, to_index: dropIndex});

    let drag = dragItem.element.nativeElement;
    let drop = dropItem.element.nativeElement;
    let parent = drop.parentElement;

    let dragClone = drag.cloneNode();

    parent?.insertBefore(dragClone, drag);

    parent?.insertBefore(drag, drop.nextSibling);
    parent?.insertBefore(drop, dragClone);

    parent?.removeChild(dragClone);

    let i = 0;
    this.dropListGroup._items.forEach((dropList) => {
      let from_position = {
        x: this.dropListsPositions[i].x, 
        y: this.dropListsPositions[i].y
      };

      let to_position = {
        x: dropList.element.nativeElement.getBoundingClientRect().x, 
        y: dropList.element.nativeElement.getBoundingClientRect().y
      };

      this.slideAnimate(dropList, from_position, to_position);

      i++;
    })
  }

  moveItem(dragItem: CdkDropList, dropItem: CdkDropList, after?: boolean) {
    let dragIndex = this.indexOf(this.dragItem);
    let dropIndex = this.indexOf(this.dropItem);
    this.itemsMoved.next({from_index: dragIndex, to_index: dropIndex});
    
    let drag = dragItem.element.nativeElement;
    let drop = dropItem.element.nativeElement;
    let parent = drop.parentElement;

    /*
    //parent.insertBefore(drag, drop);
    //parent.insertBefore(drag, drop.nextSibling);
    if(dragIndex < dropIndex || after) {
      // insert after
      parent!.insertBefore(drag, drop.nextSibling);
    } else {
      // insert before
      parent!.insertBefore(drag, drop);
    }

    if(dragIndex > dropIndex && after) {
      dropIndex += 1;
    }
    */

    parent!.insertBefore(drag, drop.nextSibling);

    let i = 0;
    this.dropListGroup._items.forEach((dropList) => {
      let from_position = {
        x: this.dropListsPositions[i].x, 
        y: this.dropListsPositions[i].y
      };

      let to_position = {
        x: dropList.element.nativeElement.getBoundingClientRect().x, 
        y: dropList.element.nativeElement.getBoundingClientRect().y
      };

      this.slideAnimate(dropList, from_position, to_position);
    })
    
  }

  canDrop(): boolean {
    return false;
  }

  onDropped(event: CdkDragEnd<any>): Observable<void> {
    return new Observable<void>(observable => {
      observable.next();
    })
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
    };
  }

  getDropListAtPoint(point: {x: number, y: number}) {
    let dropListAtPoint = null;

    this.dropListGroup._items.forEach((dropList: any) => {
      if (this.isInsideDropList(dropList, point)) {
        dropListAtPoint = dropList;
        return;
      }
    });

    return dropListAtPoint;
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

  getClosestDropListsToPoint(point: {x: number, y: number}) {
    let newPoint: {x: number, y: number};
    let top:    CdkDropList | null = null;
    let right:  CdkDropList | null = null;
    let bottom: CdkDropList | null = null;
    let left:   CdkDropList | null = null;

    //Revisa hacia arriba
    newPoint = {x: point.x, y: point.y};
    while(this.isInsideDropListGroup(newPoint) && top == null) {
      newPoint.y--;

      top = this.getDropListAtPoint(newPoint);

      if(top == this.dragItem) {
        top = null;
      }
    };

    //Revisa hacia la derecha
    newPoint = {x: point.x, y: point.y};
    while(this.isInsideDropListGroup(newPoint) && right == null) {
      newPoint.x++;

      right = this.getDropListAtPoint(newPoint);

      if(right == this.dragItem) {
        right = null;
      }
    };

    //Revisa hacia la abajo
    newPoint = {x: point.x, y: point.y};
    while(this.isInsideDropListGroup(newPoint) && bottom == null) {
      newPoint.y++;

      bottom = this.getDropListAtPoint(newPoint);

      if(bottom == this.dragItem) {
        bottom = null;
      }
    };

    //Revisa hacia la izquierda
    newPoint = {x: point.x, y: point.y};
    while(this.isInsideDropListGroup(newPoint) && left == null) {
      newPoint.x--;

      left = this.getDropListAtPoint(newPoint);

      if(left == this.dragItem) {
        left = null;
      }
    };

    return {top, right, bottom, left};
  }

  getLastPeer(dropList: CdkDropList) {
    // Obtiene vecino mas a la derecha e izquierda con recursividad
    if(dropList != null) {
      let dropListAtRight = this.getDropListAtRight(dropList);

      while(dropListAtRight != null && dropListAtRight != this.dragItem) {
        dropList = dropListAtRight;
        dropListAtRight = this.getDropListAtRight(dropList);
      }

      return dropList;
    } else {
      return null;
    }
  }

  getDropListAtRight(item: CdkDropList) {
    let rect = item.element.nativeElement.getBoundingClientRect();

    let point = {x: rect.right + this.emptyThreshold, y: rect.top};

    return this.getDropListAtPoint(point);
  }

  slideAnimate(item: CdkDropList, from_position: {x: number, y: number}, to_position: {x: number, y: number}) {
    this.animating = true;
    let xDist = from_position.x - to_position.x;
    let yDist = from_position.y - to_position.y;

    item.element.nativeElement.animate(
      [
        // keyframes
        { 
          /*
          position: "absolute",
          left: from_position.x + "px",
          top: from_position.y + "px",
          */
          
          transform: "translateX(" + xDist + "px) translateY(" + yDist + "px)"
        },
        { 
          /*
          position: "absolute",
          left: to_position.x + "px",
          top: to_position.y + "px",
          */

          transform: "translateX(0px) translateY(0px)" 
        },
      ],
      {
        // timing options
        duration: 200,
        iterations: 1,
        easing: "cubic-bezier(0.42, 0, 0.58, 1)",
      }
    )

    this.animating = false;
  };

  getDropListsRects() {
    let rects: any[] = [];

    this.dropListGroup._items.forEach((dropList) => {
      rects.push(dropList.element.nativeElement.getBoundingClientRect());
    });

    return rects;
  }

}
