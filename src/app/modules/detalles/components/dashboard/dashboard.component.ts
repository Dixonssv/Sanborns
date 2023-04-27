import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, AfterViewInit  } from '@angular/core';

import { AddDirective } from 'src/app/modules/shared/directives/add/add.directive';

import { CardModel } from '../../models/card.model';

import { CardComponent } from '../cards/card/card.component';
import { CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { DashboardService } from '../../services/dashboard.service';
import { DragAndDropService } from '../../services/drag-and-drop.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild(AddDirective, {static: true}) adHost!: AddDirective;

  @ViewChild(CdkDropListGroup, {static: false}) dashboard!: CdkDropListGroup<CdkDropList>;

  loadedCards:any;

  constructor(
    public dashboarService: DashboardService,
    public dragAndDropService: DragAndDropService) {  

  }

  ngOnInit(): void {

    console.log("Adhost: " + this.adHost);

    const viewContainerRef = this.adHost.viewContainerRef;

    this.dashboarService.cardsChanged.pipe().subscribe(() => {
      
      viewContainerRef.clear();

      this.dashboarService.getCards().subscribe((card) => {
        this.loadCard(card, viewContainerRef);
      });
    });
    
    this.dashboarService.cardInDashboard.pipe().subscribe((index: number) =>  {
      let card = this.getDropListAt(index);
      //console.log("Shake!");
      //this.router.navigate([], {fragment: card});

      // SHAKE ANIMATION
      card.element.nativeElement.classList.add("shake");
      setTimeout(() => {
        card.element.nativeElement.classList.remove("shake");
      },200);
      
    });

    this.dragAndDropService.itemsMoved.pipe().subscribe((positions) => {
      this.dashboarService.moveCard(positions.from_index, positions.to_index + 1).subscribe();
    })
  }

  ngOnDestroy():void {
    this.dashboarService.destroy();
  }

  ngAfterViewInit(): void {
    this.dragAndDropService.dropListGroup = this.dashboard;
  }

  loadCard(card:CardModel, viewContainerRef:ViewContainerRef) {
    const cardComponent = viewContainerRef.createComponent(CardComponent);
    //cardComponent.instance.setSize(card.x, card.y);
    //cardComponent.instance.setContent(card.component);
    cardComponent.instance.setCard(card);

    //this.loadedCards.push(cardComponent.instance);
  }

  dropListEnterPredicate() {
    return false;
    //return this.dragAndDropRepository.canDrop().subscribe((result:boolean) => result) ;
  }

  getDropListAt(index: number) {
    let i = -1;
    let dropList:any;

    this.dashboard._items.forEach((card:any) => {
      if(i == index) {
        dropList = card;
      }

      i++;
    });

    return dropList;
  }
  



  /*
  @Input() ads: AdItem[] = [];

  currentAdIndex = -1;

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  interval: number|undefined;

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
  */

  //---------------------------------------------------------------------------------------------------

  
}
