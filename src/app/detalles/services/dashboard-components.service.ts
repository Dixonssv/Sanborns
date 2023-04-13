/*
  Referencia: https://stackblitz.com/run?file=src%2Fapp%2Fad-banner.component.ts,src%2Fapp%2Fad.component.ts,src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fhero-job-ad.component.ts,src%2Fapp%2Fad-item.ts
*/

import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';

import { Card } from '../components/cards/card/card';

import { CurriculumComponent } from '../components/cards/curriculum/curriculum.component';
import { EstudiosComponent } from '../components/cards/estudios/estudios.component';
import { ContratoComponent } from '../components/cards/contrato/contrato.component';
import { HorarioComponent } from '../components/cards/horario/horario.component';
import { DocumentosComponent } from '../components/cards/documentos/documentos.component';
import { NominaComponent } from '../components/cards/nomina/nomina.component';
import { ActasComponent } from '../components/cards/actas/actas.component';
import { TrayectoriaComponent } from '../components/cards/trayectoria/trayectoria.component';
import { CursosComponent } from '../components/cards/cursos/cursos.component';
import { DatosPersonalesComponent } from '../components/cards/datos-personales/datos-personales.component';
import { TestComponent } from '../components/cards/test/test.component';


@Injectable({
  providedIn: 'root'
})
export class DashboardComponentsService {

  public dashboard: any;
  
  private cards:Card[];

  cardsChanged = new Subject<boolean>();
  cardInDashboard = new Subject<number>();

  //----- Drag and Drop -----
  private dragIndex = 0;
  private dropIndex = 0;

  private dragItem: any;
  private dropItem: any;

  private currentDropItem: any;

  constructor(private viewportRuler: ViewportRuler) {
    this.cards = [];
  }

  addCard(type: string) {
    let card:any;

    switch(type) {
      case "Datos personales": {
        card = new Card(DatosPersonalesComponent, 2, 2);
        break;
      }
      case "Curriculum": {
        card = new Card(CurriculumComponent, 1, 3);
        break;
      }
      case "Estudios": {
        card = new Card(EstudiosComponent, 2, 3);
        break;
      }
      case "Contrato": {
        card = new Card(ContratoComponent, 1, 2);
        break;
      }
      case "Horario": {
        card = new Card(HorarioComponent, 4, 1);
        break;
      }
      case "Documentos": {
        card = new Card(DocumentosComponent, 2, 4);
        break;
      }
      case "Nomina": {
        card = new Card(NominaComponent, 1, 1);
        break;
      }
      case "Actas": {
        card = new Card(ActasComponent, 2, 1);
        break;
      }
      case "Trayectoria": {
        card = new Card(TrayectoriaComponent, 4, 2);
        break;
      }
      case "Cursos": {
        card = new Card(CursosComponent, 3, 1);
        break;
      }
      case "Test": {
        card = new Card(TestComponent, 1, 1);
        this.cards.push(card);
        break;
      }
    }

    let i = this.isInDashboard(card);

    if(i == -1) {
      this.cards.push(card);
      this.cardsChanged.next(true);      
    } else {
      this.cardInDashboard.next(i);
    }

    // Llamada al observer
    
  }

  getCards() {
    return this.cards;
  }

  isInDashboard(newCard: Card) {
    // Regresa el indice si se encuentra en el arreglo. Si no, -1.

    let i = 0;
    let index = -1;

    this.cards.forEach(card => {
      if(card.component == newCard.component) {
        index = i;
      }
      i++;
    });

    return index;
  }

  deleteCard(card: Card) {
    let index = this.isInDashboard(card);

    if(index >= 0) {
      // Se encuentra en el array

      this.cards.splice(index, 1);

      this.cardsChanged.next(true);
    }
  }

  cardsCount() {
    return this.cards.length;
  }

  //------------------ DRAG AND DROP ---------------------------

  canDrop() {
    return false;
  }

  dragStarted(e: CdkDragStart) {
    let point = this.getPointerPositionOnPage(e.event);

    this.dashboard._items.forEach((dropList: any) => {
      if (this.isInsideDropList(dropList, point.x, point.y)) {
        this.dragItem = dropList;
        return;
      }
    });

    this.currentDropItem = this.dragItem;

    console.log(this.cards);
    console.log("dragIndex = " + this.indexOf(this.dragItem.element.nativeElement.parentElement, this.dragItem.element.nativeElement));
  }

  dragMoved(e: CdkDragMove) {
    let point = this.getPointerPositionOnPage(e.event);

    this.dashboard._items.forEach((dropList: any) => {
      if (this.isInsideDropList(dropList, point.x, point.y)) {
        this.dropItem = dropList;
        return;
      }
    });

    if(this.dragItem == this.dropItem) {
      this.currentDropItem == this.dragItem;
    }

    
    if(this.currentDropItem != this.dropItem && this.dropItem != this.dragItem) {

      let drag = this.dragItem.element.nativeElement;
      let drop = this.dropItem.element.nativeElement;
      let parent = drop.parentElement;

      let dragIndex = this.indexOf(parent, drag) - 1;
      let dropIndex = this.indexOf(parent, drop) - 1;

      dragIndex < 0 ? 0 : dragIndex;
      dropIndex < 0 ? 0 : dropIndex;

      this.moveCard(dragIndex, dropIndex + 1);

      //parent.insertBefore(drag, dropIndex == 0 ? drop.nextSibling : drop);
      //parent.insertBefore(drag, dragIndex < dropIndex ? drop.nextSibling : drop);
      //parent.insertBefore(drag, drop);
      parent.insertBefore(drag, drop.nextSibling);

      //console.log("Switch: " + (dragIndex) + ", " + (dropIndex));
      //console.log(this.cards);

      this.currentDropItem = this.dropItem;
    } 
    
  }

  moveCard(from_index: number, to_index:number) {
    // CASO: insertar carta al final
    if(to_index == this.cards.length) {
      let card = this.cards.splice(from_index, 1);
      this.cards.push(card[0]);
      return;
    }

    // CASO: insertar carta en medio
    // remueve la carta del arreglo
    let card = this.cards.splice(from_index, 1);

    // inserta la carta en la nueva posicion
    // Se suma 1 debido a que en la linea anterior, el tamanio del arreglo se disminuyo en uno. Esto solo afecta
    // cuando la carta se inserta en una posicion anterior.
    if(from_index < to_index) {
      this.cards.splice(to_index - 1, 0, card[0]);
    } else {
      this.cards.splice(to_index, 0, card[0]);
    }
  }

  dropped(event: CdkDragEnd<any>) {

    console.log("Dropped!");

    this.cardsChanged.next(true);
    
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

  indexOf(collection: any, node: any) {
    let index = Array.from(collection.children).indexOf(node);

    // verifica si el nodo esta fuera de la coleccion (indice -1)
    // si es asi, regresa el indice sobrecargado de la collecion
    return index == -1 ? collection.children.length : index;
  }

  /** Determines whether an event is a touch event. */
  isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
  }
  
  isInsideDropList(dropList: CdkDropList, x: number, y: number) {
    const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right;
  }
  
  intersects(card: CdkDrag, dropList: CdkDropList) {
    let A = card.element.nativeElement.getBoundingClientRect();
    let B = dropList.element.nativeElement.getBoundingClientRect();

    if ((A.left <= B.right || A.right >= B.left) && (A.bottom >= B.top || A.top <= B.bottom)) {
      console.log("Intersect!");
      return true;
    };

    return false;
  }

  //----------- PDF -------------------------
  print() {
    //this.dashboard
  }
}
