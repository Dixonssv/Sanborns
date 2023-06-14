import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CompactType, DisplayGrid, GridType, GridsterComponent, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridsterPush } from 'angular-gridster2';
import { CardModel } from '../../models/card.model';
import { CardComponent } from '../cards/card/card.component';
import { CardMapper } from '../../models/mappers/card.mapper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { PrintableDirective } from 'src/app/modules/shared/directives/printable/printable.directive';
import { PrintService } from '../../services/print/print.service';
import { Subscription } from 'rxjs';
import { GridsterCompact } from 'angular-gridster2/lib/gridsterCompact.service';

@Component({
  selector: 'app-gridster-test',
  templateUrl: './gridster-test.component.html',
  styleUrls: ['./gridster-test.component.css', '../cards/cards.css']
})
export class GridsterTestComponent implements OnInit, AfterViewInit, OnDestroy{
  private subscriptions:Subscription[];

  @ViewChild(PrintableDirective, {static: true}) 
  printableArea!: PrintableDirective;

  @ViewChild(GridsterComponent, {static: true})
  gridster!: GridsterComponent;

  dashboard!: Array<GridsterItem>;
  options!: GridsterConfig;
  itemToPush!: GridsterItemComponentInterface;

  cardMapper: CardMapper = new CardMapper();

  constructor(
    public vcf: ViewContainerRef,
    public dashboardService: DashboardService,
    public printService: PrintService,
    public elementRef: ElementRef) { 
      this.subscriptions = []
    }

  ngOnInit() {
    this.dashboard = [
      //{cols: 4, rows: 2, y: 0, x: 0, initCallback: this.initItem.bind(this)},
      //{cols: 4, rows: 2, y: 0, x: 0, initCallback: (item, itemComponent) => {
      //  this.initItem(item, itemComponent);
      //}},
      /*{cols: 2, rows: 2, y: 0, x: 2},
      {cols: 1, rows: 1, y: 0, x: 4},
      {cols: 3, rows: 2, y: 1, x: 4},
      {cols: 1, rows: 1, y: 4, x: 5},
      {cols: 1, rows: 1, y: 2, x: 1},
      {cols: 2, rows: 2, y: 5, x: 5},
      {cols: 2, rows: 2, y: 3, x: 2},
      {cols: 2, rows: 1, y: 2, x: 2},
      {cols: 1, rows: 1, y: 3, x: 4},
      {cols: 1, rows: 1, y: 0, x: 6}*/
    ];

    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.CompactUp,
      displayGrid: DisplayGrid.None,
      pushItems: true,
      pushDirections: {
        north: true,
        east: false,
        south: true,
        west: false
      },
      minCols: 12,
      maxCols: 12,
      draggable: { 
        enabled: true,
        start: this.onDragStarted.bind(this),
        stop: this.onDragEnded.bind(this),
       },
      resizable: { enabled: true },
      disableScrollHorizontal: true,
      swap: false,
      swapWhileDragging: false,
      itemChangeCallback: this.onItemChanged.bind(this),
      itemValidateCallback: this.onItemValidate.bind(this),
    };

    this.subscriptions.push(
      this.dashboardService.cardAdded.subscribe((card) => {
        this.loadCard(card, this.vcf)
      }),
      this.dashboardService.cardDeleted.pipe().subscribe((card) => {
        setTimeout(() => {
          this.unloadCard(card);
        }, 0);
      })
    )
    
  }

  ngAfterViewInit(): void {
    this.printService.printableObject = this.printableArea;
  }

  ngOnDestroy(): void {

    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })

    this.dashboardService.destroy();
  }
  
  loadCard(card:CardModel, viewContainerRef:ViewContainerRef) {

    this.dashboard.push(
      { 
        x: 0, 
        y: 0, 
        cols: card.x, 
        rows: card.y,
        initCallback: ((item, itemComponent) => {
          const cardComponent = viewContainerRef.createComponent(CardComponent).instance;
          cardComponent.card = card;

          itemComponent.el.appendChild(cardComponent.hostElement.nativeElement);
        })
      });
    
    //return cardComponent;
  }

  unloadCard(card: CardModel) {
    this.dashboard.splice(card.index!, 1);
  }

  onItemChanged(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log("Items changed");
    //console.log("x: " + item.x + ", y: " + item.y);

  }

  onItemValidate(item: GridsterItem) {
    console.log("Item validate");

    //console.log(this.gridster.grid);

    //console.log("x: " + item.x + ", y: " + item.y);
    
    //this.gridster.checkCollision(item);

    return true;
  }

  onDragStarted(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log("Drag started");
    console.log("x: " + item.x + ", y: " + item.y);

    itemComponent.el.style.zIndex = "10";

    item.compactEnabled = false;

    console.log("Compact: " + item.compactEnabled);
    itemComponent.$item.compactEnabled;

    console.log(this.gridster.compact.checkCompact());
  }

  onDragEnded(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log("Drag ended");
    console.log("x: " + item.x + ", y: " + item.y);

    itemComponent.el.style.zIndex = "1";
  }
  
}
