import { Component, HostBinding, Type, ViewChild, ViewEncapsulation, ViewContainerRef, HostListener} from '@angular/core';
import { DashboardComponentsService } from 'src/app/detalles/services/dashboard-components.service';

import {
  CdkDrag,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup, 
  moveItemInArray,
  CdkDragDrop,
} from "@angular/cdk/drag-drop";

import { Card } from '../card';
import { CardContentDirective } from '../card-content.directive';
import { DraggableDirective } from '../draggable.directive';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', '../../cards.css'],
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    //{directive: DraggableDirective},
    CdkDropList,
  ]
})
export class CardComponent {

  @HostBinding('class') classAttribute: string;

  @ViewChild(CardContentDirective, {static: true}) CardContent!: CardContentDirective;

  card: any;
  x: number;
  y: number;
  content: any;

  constructor(public dashboard: DashboardComponentsService) {
    this.x = 0;
    this.y = 0;  
    this.classAttribute = "";
  }

  setCard(card: Card) {
    this.card = card;
    this.setSize(this.card.x, this.card.y);
    this.setContent(this.card.component);
  }

  setSize(x:number, y:number) {
    this.x = x;
    this.y = y;
    this.classAttribute = 'dash-card-x' + this.x + ' dash-card-y' + this.y + ' ';
  }

  setContent(component:Type<any>) {

    this.content = component;

    const viewContainerRef:ViewContainerRef = this.CardContent.viewContainerRef;

    viewContainerRef.createComponent(this.content);
  }

  removeFromDashboard() {
    console.log("Remove");
    this.dashboard.deleteCard(this.card);
  }

  addClass(styleClass: string) {
    this.classAttribute += styleClass;
  }

  removeClass(styleClass: string) {
    var re = new RegExp(styleClass);
    this.classAttribute = this.classAttribute.replace(re, "");
  }

}
