import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GridStack } from 'gridstack';
import { GridstackComponent, gsCreateNgComponents, NgGridStackWidget, nodesCB, BaseWidget, NgGridStackOptions } from 'gridstack/dist/angular';
import { CardComponent } from '../cards/card/card.component';
import { CardMapper } from '../../models/mappers/card.mapper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { CardModel } from '../../models/card.model';
import { Subscription } from 'rxjs';
import { PrintableDirective } from 'src/app/modules/shared/directives/printable/printable.directive';
import { PrintService } from '../../services/print/print.service';

@Component({
  selector: 'app-gridstack-test',
  templateUrl: './gridstack-test.component.html',
  styleUrls: ['./gridstack-test.component.css']
})
export class GridstackTestComponent implements OnInit, OnDestroy, AfterViewInit{

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
    private vcRef: ViewContainerRef, 
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
    console.log(this.printableArea);
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

    this.grid.addWidget(w);
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

}


