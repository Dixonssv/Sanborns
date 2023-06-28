import { Component, HostBinding, Type, ViewChild, ViewEncapsulation, ViewContainerRef, HostListener, ElementRef, OnInit, Renderer2, AfterViewInit, Input} from '@angular/core';

import { CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList } from "@angular/cdk/drag-drop";

import { CardModel } from '../../../models/card.model';
import { CardContentDirective } from 'src/app/modules/shared/directives/card-content/card-content.directive';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { DragAndDropService } from '../../../services/drag-and-drop/drag-and-drop.service';
import { BaseWidget } from 'gridstack/dist/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [ ],
})
export class CardComponent extends BaseWidget implements OnInit, AfterViewInit{

  @HostBinding('class') classAttribute: string;

  @ViewChild(CardContentDirective, {static: true}) CardContent!: CardContentDirective;

  @ViewChild(CdkDropList, {static: true}) dropList!: CdkDropList;

  @Input() card!: CardModel;

  index: number = 0;
  //card!: CardModel;
  x: number;
  y: number;
  content: any;

  constructor(
    private renderer: Renderer2,
    public hostElement: ElementRef,
    public dashboardService: DashboardService,
    public dragAndDropService: DragAndDropService) {
      super();
      this.x = 0;
      this.y = 0;  
      this.classAttribute = "";
  }

  ngOnInit(): void {
    //this.setContent(this.card.component);
    this.setContent(this.card.component);
  }

  ngAfterViewInit(): void {

  }

  cardDragStart(event: CdkDragStart<any>) {
    this.dragAndDropService.dragStarted(event).subscribe();
  }

  cardDragMoved(event: CdkDragMove<any>) {
    this.dragAndDropService.dragMoved(event).subscribe();
  }

  cardDropped(event: CdkDragEnd) {
    this.dragAndDropService.onDropped(event).subscribe(() => {
      this.dashboardService.cardsChanged.next(true);
    });
  }

  setCard(card: CardModel) {
    this.card = card;
    //this.setSize(this.card.x, this.card.y);
    this.setContent(this.card.component);
  }

  @HostListener('window:resize', ['$event']) 
  adjustHeight() {
    
    const gridCellHeight  = this.dashboardService.gridCellHeight;
    const gridGap         = this.dashboardService.gridGap;
    const interval        = gridCellHeight + gridGap;

    // 1 - Recalcula la altura segun su contenido
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "height",
      "auto"
    );

    const styles = getComputedStyle(this.hostElement.nativeElement);

    let currentHeight = +styles.height.replace("px", ""); // px
    let adjustedHeight = gridCellHeight;
    let span = 1;

    // 2 - Redondea la altura segun el tamanio de las celdas del grid
    while(adjustedHeight < currentHeight) {
      adjustedHeight += interval;
      span++;
    }

    // 3 - Aplica estilos para la altura y el row-span
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "height",
      adjustedHeight + "px"
    );

    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "grid-row",
      "span " + span + " / " + "span " + span
    );
  }

  setSize(x:number, y:number) {
    this.x = x;
    this.y = y;
    this.classAttribute = "dash-card-x" + this.x + " z-0";
    //this.classAttribute = 'dash-card-x' + this.x + ' dash-card-y' + this.y + ' ';
  }

  setContent(component:Type<any>) {

    this.content = component;

    const viewContainerRef:ViewContainerRef = this.CardContent.viewContainerRef;

    let container = viewContainerRef.createComponent(this.content);
  
  }

  removeFromDashboard() {
    this.dashboardService.deleteCard(this.card).subscribe();
  }

  addClass(styleClass: string) {
    this.classAttribute += styleClass;
  }

  removeClass(styleClass: string) {
    var re = new RegExp(styleClass);
    this.classAttribute = this.classAttribute.replace(re, "");
  }

  getIndex() {
    return this.index;
  }
}
