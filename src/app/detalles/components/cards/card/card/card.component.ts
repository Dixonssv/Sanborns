import { Component, HostBinding, Type, ViewChild, ViewEncapsulation, ViewContainerRef} from '@angular/core';

import { CardContentDirective } from '../card-content.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', '../../cards.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {

  @HostBinding('class') classAttribute: string;

  @ViewChild(CardContentDirective, {static: true}) CardContent!: CardContentDirective;

  x: number;
  y: number;
  content: any;

  constructor() {
    this.x = 0;
    this.y = 0;  
    this.classAttribute = "";
  }

  setSize(x:number, y:number) {
    this.x = x;
    this.y = y;
    this.classAttribute = 'dash-card dash-card-x' + this.x + ' dash-card-y' + this.y + ' bg-red-100';
  }

  setContent(component:Type<any>) {

    this.content = component;

    const viewContainerRef:ViewContainerRef = this.CardContent.viewContainerRef;

    viewContainerRef.createComponent(this.content);
  }
}
