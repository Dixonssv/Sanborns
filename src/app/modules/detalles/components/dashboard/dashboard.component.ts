import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, AfterViewInit  } from '@angular/core';

import { AddDirective } from 'src/app/modules/shared/directives/add/add.directive';

import { CardModel } from '../../models/card.model';

import { CardComponent } from '../cards/card/card.component';
import { CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { PrintableDirective } from 'src/app/modules/shared/directives/printable/printable.directive';
import { PrintService } from '../../services/print/print.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild(AddDirective, {static: true}) adHost!: AddDirective;

  @ViewChild(CdkDropListGroup, {static: false}) dashboard!: CdkDropListGroup<CdkDropList>;

  @ViewChild("dashboard") dashboardElement!: ElementRef;

  @ViewChild(PrintableDirective, {static: true}) printableArea!: PrintableDirective;

  loadedCards:any;

  // Suscripciones
  private subscriptions:Subscription[];

  constructor(
    public dashboarService: DashboardService,
    public dragAndDropService: DragAndDropService,
    public printService: PrintService) {  
      this.subscriptions = [];
  }

  ngOnInit(): void {

    const viewContainerRef = this.adHost.viewContainerRef;

    this.subscriptions.push(
      // Cards Changed
      this.dashboarService.cardsChanged.pipe().subscribe(() => {
      
        viewContainerRef.clear();
  
        this.dashboarService.updateCardIndexes();

        this.dashboarService.getCards().subscribe((card) => {
          this.loadCard(card, viewContainerRef);
        });
      }),
      // Card in Dashboard 
      this.dashboarService.cardInDashboard.pipe().subscribe((index: number) =>  {
        let card = this.getDropListAt(index);
  
        this.shake(card);
      }),
      // Items Moved
      this.dragAndDropService.itemsMoved.pipe().subscribe((positions) => {
        //console.log("Move " + positions.from_index + " to " + positions.to_index);
        this.dashboarService.moveCard(positions.from_index, positions.to_index).subscribe();

        this.dashboarService.updateCardIndexes();
      })
    );
  }

  ngOnDestroy():void {
    this.dashboarService.destroy().subscribe();

    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

  ngAfterViewInit(): void {
    this.dragAndDropService.dropListGroup = this.dashboard;

    this.printService.printableObject = this.printableArea;
  }

  loadCard(card:CardModel, viewContainerRef:ViewContainerRef) {
    const cardComponent = viewContainerRef.createComponent(CardComponent);
    //cardComponent.instance.setSize(card.x, card.y);
    //cardComponent.instance.setContent(card.component);
    cardComponent.instance.setCard(card);
  }

  dropListEnterPredicate() {
    return false;
  }

  getDropListAt(index: number) {
    /*
    let i = 0;
    let dropList:any;

    this.dashboard._items.forEach((card:any) => {
      if(i == index) {
        dropList = card;
      }

      i++;
    });
    */

    let dropList = this.dashboardElement.nativeElement.children.item(index); //HTMLElement

    return dropList;
  }

  shake(element: any) {
      // SHAKE ANIMATION
      element.classList.add("shake");
      setTimeout(() => {
        element.classList.remove("shake");
      },200);
  }
    
}
