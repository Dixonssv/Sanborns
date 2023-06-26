import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GridItemHTMLElement, GridStack } from 'gridstack';
import { GridstackComponent, NgGridStackWidget, NgGridStackOptions } from 'gridstack/dist/angular';
import { CardComponent } from '../cards/card/card.component';
import { CardMapper } from '../../models/mappers/card.mapper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { CardModel } from '../../models/card.model';
import { Subscription } from 'rxjs';
import { PrintableDirective } from 'src/app/modules/shared/directives/printable/printable.directive';
import { PrintService } from '../../services/print/print.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild(PrintableDirective, {static: true}) 
  printableArea!: PrintableDirective;

  grid!: GridStack;

  gridOptions: NgGridStackOptions = {
    margin: 5,
    minRow: 1,
  }

  cardMapper: CardMapper = new CardMapper();
  
  // Suscripciones
  private subscriptions:Subscription[];

  constructor(
    public dashboardService: DashboardService, 
    public printService: PrintService
  ) {
    this.subscriptions = [];

    GridstackComponent.addComponentToSelectorType([CardComponent]);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // Card Added
      this.dashboardService.cardAdded.pipe().subscribe((card) => {
        this.loadCard(card);
      }),
      // Card Deleted
      this.dashboardService.cardDeleted.pipe().subscribe((card) => {
        this.unloadCard(card);
      })
    )
  }

  ngOnDestroy(): void {
    this.dashboardService.destroy().subscribe();

    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

  ngAfterViewInit(): void {
    this.grid = GridStack.init();
    
    this.printService.printableObject = this.printableArea;
  }

  loadCard(card: CardModel) {
    let w: NgGridStackWidget = {
      id: card.title,
      x: 0,
      y: 0,
      autoPosition: true,
      minW: card.x,
      minH: card.y,
      selector: 'app-card',
      input: {card: card}
    }

    let el= this.grid.addWidget(w);
  }

  unloadCard(card: CardModel) {
    let widget = this.getCardWidget(card);

    this.grid.removeWidget(widget);
  }

  getCardWidget(card: CardModel) {
    let widget: any;

    this.grid.getGridItems().forEach((el) => {
      if(el.gridstackNode?.id === card.title) {
        widget = el;
      }
    })

    return widget;
  }

  setComputedStyles(el: GridItemHTMLElement) {
    let computedStyles = getComputedStyle(el);

    el.style.height   = computedStyles.height;
    el.style.top      = computedStyles.top;
    el.style.left     = computedStyles.left;

    /* Grid item content */
    let content = el.firstChild as any;
    content.style.inset = "5px";
    content.style.overflow = "hidden";
  }

  setAllComputedStyles() {
    console.log("Setting styles...");
    this.grid.getGridItems().forEach((item: any) => {
      this.setComputedStyles(item);
    });
    console.log("Styles set");
  }

  removeStyles(el: GridItemHTMLElement) {
    el.removeAttribute("style");
  }

  removeAllStyes() {
    console.log("Removing styles...");
    this.grid.getGridItems().forEach((item: any) => {
      this.removeStyles(item);

      let content = item.firstChild as any;
      this.removeStyles(content);
    });
    console.log("Styles removed");
  }



}
