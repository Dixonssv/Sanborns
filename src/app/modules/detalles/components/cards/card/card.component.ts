import { Component, HostBinding, Type, ViewChild, ViewEncapsulation, ViewContainerRef, HostListener} from '@angular/core';

import { CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList } from "@angular/cdk/drag-drop";

import { CardModel } from '../../../models/card.model';
import { CardContentDirective } from 'src/app/modules/shared/directives/card-content/card-content.directive';
import { DashboardService } from '../../../services/dashboard.service';
import { DragAndDropService } from '../../../services/drag-and-drop.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
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

  constructor(
    public dashboardService: DashboardService,
    public dragAndDropService: DragAndDropService) {
    this.x = 0;
    this.y = 0;  
    this.classAttribute = "";
  }

  cardDragStart(event: CdkDragStart<any>) {
    this.dragAndDropService.dragStarted(event).subscribe();
  }

  cardDragMoved(event: CdkDragMove<any>) {
    this.dragAndDropService.dragMoved(event).subscribe();
  }

  cardDropped(event: CdkDragEnd) {
    this.dragAndDropService.onDropped(event).subscribe();
  }

  setCard(card: CardModel) {
    console.log("Set card:");
    console.log(card);
    console.log("Size: " + card.x + ", " + card.y);

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

    console.log(this.CardContent);

    const viewContainerRef:ViewContainerRef = this.CardContent.viewContainerRef;

    let container = viewContainerRef.createComponent(this.content);
  
  }

  removeFromDashboard() {
    console.log("Remove");
    this.dashboardService.deleteCard(this.card).subscribe();
  }

  addClass(styleClass: string) {
    this.classAttribute += styleClass;
  }

  removeClass(styleClass: string) {
    var re = new RegExp(styleClass);
    this.classAttribute = this.classAttribute.replace(re, "");
  }

}
