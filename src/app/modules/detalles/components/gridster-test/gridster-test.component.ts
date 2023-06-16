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

  dragItem!: GridsterItem;

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
      }),
      this.gridster.previewStyle$.subscribe((item) => {
        /*
        this.dashboard.forEach((item) => {
          const pusher = new GridsterPush(this.gridster.getItemComponent(item)!);
          console.log(pusher.pushItems(pusher.fromNorth));
        })
        */
       //this.gridster.compact.checkCompact();
       
       /*
       this.dashboard.forEach((item) => {
        this.gridster.autoPositionItem(this.gridster.getItemComponent(item)!);
        });
        */

        console.log("Moving item:");
        console.log(item);

        /*
        console.log("Items:");
        this.gridster.grid.forEach((itemComponent) => {
          console.log(itemComponent.item);
        })
        */
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
    
  }

  onItemValidate(k: GridsterItem) {
    //console.log("Item validate");

    //this.compactUp(item);

    //console.log(item);

    this.dashboard.forEach((item) => {
      if(item !== this.dragItem) {
        //this.compactUp(item);
      } 
    })

    return true;
  }

  onDragStarted(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log("Drag started");
    //console.log("x: " + item.x + ", y: " + item.y);

    itemComponent.el.style.zIndex = "10";

    this.dragItem = item;
    //console.log(this.dragItem);
  }

  onDragEnded(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log("Drag ended");
    //console.log("x: " + item.x + ", y: " + item.y);

    itemComponent.el.style.zIndex = "1";

    //this.options.api?.optionsChanged?.();
  }

  /*
  compactUp() {
    this.dashboard.forEach((item) => {
      while(!this.gridster.checkCollision(item)) {
        item.y -= 1;
      }
      item.y += item.y < 0 ? 1 : 0;
      console.log("x: " + item.x + ", y: " + item.y);

      this.gridster.updateGrid();
      this.options.api?.optionsChanged?.();
    })
  }
  */

  compactUp(item: GridsterItem) {
    //console.log(item);

    while(!this.gridster.checkCollision(item) && item.y > 0) {
      console.log(item);
      item.y -= 1;
    }
  }

  checkCollision(item: GridsterItem) {
    // Omite el dragItem
    let collition = false;

    if(item == this.dragItem) {
      return;
    }

    this.dashboard.forEach((dashboardItem) => {
      if(dashboardItem !== this.dragItem && dashboardItem !== item) {
        if(this.collides(item, dashboardItem)) {
          collition = true;
        }
      }
    })

    return collition;
  }

  collides(itemA: GridsterItem, itemB: GridsterItem): boolean {
    return (
      !(itemA.x + itemA.cols < itemB.x) && // no esta a la izquierda
      !(itemA.x > itemB.x + itemB.cols) && // no esta a la derecha
      !(itemA.y + itemA.rows < itemB.y) && // no esta arriba
      !(itemA.y > itemB.y + itemB.rows)    // no esta abajo
    );
  }
  
}
