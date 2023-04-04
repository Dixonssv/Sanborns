/*
  Referencia: https://stackblitz.com/run?file=src%2Fapp%2Fad-banner.component.ts,src%2Fapp%2Fad.component.ts,src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fhero-job-ad.component.ts,src%2Fapp%2Fad-item.ts
*/

import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

import { CdkDrag, CdkDragDrop, CdkDragMove, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
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

    if(this.isInDashboard(card) == -1) {
      this.cards.push(card);      
    }

    // Llamada al observer
    this.cardsChanged.next(true);
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

    if(this.currentDropItem != this.dropItem) {

      let drag = this.dragItem.element.nativeElement;
      let drop = this.dropItem.element.nativeElement;
      let parent = drop.parentElement;

      let dragIndex = this.indexOf(parent, drag);
      let dropIndex = this.indexOf(parent, drop);

      //console.log("DragIndex = " + dragIndex);
      //console.log("DropIndex = " + dropIndex);

      //parent.insertBefore(drag, dropIndex == 0 ? drop.nextSibling : drop);
      //parent.insertBefore(drag, dragIndex < dropIndex ? drop.nextSibling : drop);
      parent.insertBefore(drag, drop.nextSibling);
      //parent.insertBefore(drag, drop);

      moveItemInArray(this.cards, dragIndex, dropIndex);

      this.currentDropItem = this.dropItem;
    } 
  }

  drop(event: CdkDragDrop<string[]>) {
    //this.dashboard.nativeElement.removeChild(event.);
    //parent.appendChild(phElement);
    //parent.insertBefore(this.source.element.nativeElement, parent.children

    
    this.dashboard.insertBefore(
      event.previousContainer,
      this.dashboard.children[event.currentIndex]
    );
    

    //moveItemInArray(this.cards, event.previousIndex, event.currentIndex);

    //this.cardsChanged.next(true);
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
    return Array.from(collection.children).indexOf(node);
  }

  /** Determines whether an event is a touch event. */
  isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
  }

  isInsideDropList(dropList: CdkDropList, x: number, y: number) {
    const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right;
  }
}
