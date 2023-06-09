import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CompactType, GridType, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterItemComponentInterface } from 'angular-gridster2';
import { CardModel } from '../../models/card.model';
import { CardComponent } from '../cards/card/card.component';
import { CardMapper } from '../../models/mappers/card.mapper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { PrintableDirective } from 'src/app/modules/shared/directives/printable/printable.directive';
import { PrintService } from '../../services/print/print.service';

@Component({
  selector: 'app-gridster-test',
  templateUrl: './gridster-test.component.html',
  styleUrls: ['./gridster-test.component.css', '../cards/cards.css']
})
export class GridsterTestComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild(PrintableDirective, {static: true}) 
  printableArea!: PrintableDirective;

  options!: GridsterConfig;
  dashboard!: Array<GridsterItem>;
  itemToPush!: GridsterItemComponentInterface;

  cardMapper: CardMapper = new CardMapper();

  constructor(
    public vcf: ViewContainerRef,
    public dashboardService: DashboardService,
    public printService: PrintService) { }

  ngOnInit() {
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.CompactUp,
      minCols: 12,
      maxCols: 12,
      pushItems: true,
      draggable: { enabled: true },
      resizable: { enabled: true },
      disableScrollHorizontal: true
    };

    this.dashboardService.cardAdded.subscribe((card) => {
      this.loadCard(card, this.vcf)
    })

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
  }

  ngAfterViewInit(): void {
    this.printService.printableObject = this.printableArea;
  }

  ngOnDestroy(): void {
    this.dashboardService.destroy();
  }

  /*
  
  initItem(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    let cardElement = this.loadCard(this.cardMapper.mapFrom("Datos personales"), this.vcf).instance.hostElement.nativeElement;
    itemComponent.el.appendChild(cardElement);
    //this.itemToPush.el = this.loadCard(this.cardMapper.mapFrom("Datos personales"), this.vcf).instance.hostElement.nativeElement;

    //itemComponent.el = this.loadCard(this.cardMapper.mapFrom("Datos personales"), this.vcf).instance.hostElement.nativeElement;
  }
  

  addItem() {
    this.dashboard.push(
      { 
        x: 0, 
        y: 0, 
        cols: 1, 
        rows: 1,
      });
  }

  loadCard(card:CardModel, viewContainerRef:ViewContainerRef) {
    const cardComponent = viewContainerRef.createComponent(CardComponent);
    //cardComponent.instance.setSize(card.x, card.y);
    //cardComponent.instance.setContent(card.component);
    cardComponent.instance.card = card;
    
    return cardComponent;
  }
  */
  

  
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
          console.log(itemComponent.el);
        })
      });
    
    //return cardComponent;
  }
  
}
