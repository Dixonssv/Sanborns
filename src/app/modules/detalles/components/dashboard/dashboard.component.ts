import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GridItemHTMLElement, GridStack } from 'gridstack';
import { GridstackComponent, NgGridStackWidget, NgGridStackOptions } from 'gridstack/dist/angular';
import { CardComponent } from '../cards/card/card.component';
import { CardMapper, StringCardMapper, WidgetCardMapper } from '../../models/mappers/card.mapper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { CardModel } from '../../models/card.model';
import { Subscription } from 'rxjs';
import { PrintableDirective } from 'src/app/modules/shared/directives/printable/printable.directive';
import { PrintService } from '../../services/print/print.service';
import { WebStorageMethods, WebStorageService } from 'src/app/modules/shared/services/webStorage/web-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit, WebStorageMethods{
  @ViewChild(PrintableDirective, {static: true}) 
  printableArea!: PrintableDirective;

  grid!: GridStack;

  serializedData: any;

  gridOptions: NgGridStackOptions = {
    margin: 5,
    minRow: 1,
  }

  stringCardMapper: StringCardMapper = new StringCardMapper();
  widgetCardMapper: WidgetCardMapper = new WidgetCardMapper();
  
  // Suscripciones
  private subscriptions:Subscription[];

  constructor(
    public dashboardService: DashboardService, 
    public printService: PrintService,
    private webStorageService: WebStorageService
  ) {
    this.subscriptions = [];

    GridstackComponent.addComponentToSelectorType([CardComponent]);
  }

  webStorageOnInit(): void {
    let serializedData = this.grid.save();

    this.webStorageService.storeData("dashboardSerializedData", serializedData);
  }

  webStorageAfterInit(): void {
    let serializedData = this.webStorageService.getData("dashboardSerializedData");

    console.log(serializedData);

    if(serializedData !== null) {
      this.grid.load(serializedData);
    }
  }

  webStorageOnDestroy(): void {
    this.webStorageService.removeData("dashboardSerializedData");
    this.webStorageService.getData("dashboardSerializedData");
  }

  ngOnInit(): void {
    
    /* SUSCRIPCIONES */
    this.subscriptions.push(
      // Card Added
      this.dashboardService.cardAdded.pipe().subscribe((card) => {
        this.loadCard(card);
        //this.webStorageOnInit()
      }),
      // Card Deleted
      this.dashboardService.cardDeleted.pipe().subscribe((card) => {
        this.unloadCard(card);
        //this.webStorageOnInit()
      })
    )
  }

  ngAfterViewInit(): void {
    this.grid = GridStack.init();

    this.grid.on("change", () => {
      console.log("Changed");
      //this.webStorageOnInit()
    });
    
    this.printService.printableObject = this.printableArea;

    this.webStorageAfterInit();
  }

  ngOnDestroy(): void {
    this.dashboardService.destroy().subscribe();

    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });

    this.webStorageOnDestroy();
  }

  loadCard(card: CardModel) {
    let widget = this.widgetCardMapper.mapTo(card);

    let el= this.grid.addWidget(widget);
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

  saveGrid() {
    console.log("Saving...");
    
    this.serializedData = this.grid.save(false);
    console.log(this.serializedData);
    

    this.webStorageOnInit();
  }

  loadGrid() {
    console.log("Loading...");
    //console.log(this.serializedData);

    //if(this.serializedData !== undefined) {
      //this.grid.load(this.serializedData);

      this.webStorageAfterInit();
    //}
  }


}
