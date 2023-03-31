import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, AfterViewInit  } from '@angular/core';

import { AddDirective } from '../../directives/add/add.directive';

import {DashboardComponentsService} from 'src/app/detalles/services/dashboard-components.service'

import { Card } from '../cards/card/card';

import { CardComponent } from '../cards/card/card/card.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  @ViewChild(AddDirective, {static: true}) adHost!: AddDirective;

  @ViewChild('dashboard') dashboard!: ElementRef;

  constructor(private dashboardService : DashboardComponentsService) {  

  }

  ngOnInit(): void {
    const viewContainerRef = this.adHost.viewContainerRef;

    this.dashboardService.cardsChanged.pipe().subscribe(() => {
      
      viewContainerRef.clear();

      let cards = this.dashboardService.getCards();

      cards.forEach(card => {
          this.loadCard(card, viewContainerRef);
      });
    })
  }

  ngAfterViewInit() {
    console.log(this.dashboard);
  }

  ngOnDestroy(): void {
    
  }

  loadCard(card:Card, viewContainerRef:ViewContainerRef) {
    const cardComponent = viewContainerRef.createComponent(CardComponent);
    //cardComponent.instance.setSize(card.x, card.y);
    //cardComponent.instance.setContent(card.component);
    cardComponent.instance.setCard(card);
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

  drop(event: CdkDragDrop<string[]>) {
    //this.dashboard.nativeElement.removeChild(event.);
    //parent.appendChild(phElement);
    //parent.insertBefore(this.source.element.nativeElement, parent.children

    let cards = this.dashboardService.getCards();

    moveItemInArray(cards, event.previousIndex, event.currentIndex);

    this.dashboardService.cardsChanged.next(true);
  }
}
