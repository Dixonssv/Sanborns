import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, AfterViewInit  } from '@angular/core';

import { AddDirective } from '../../directives/add/add.directive';

import {DashboardComponentsService} from 'src/app/detalles/services/dashboard-components.service'

import { Card } from '../cards/card/card';

import { CardComponent } from '../cards/card/card/card.component';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild(AddDirective, {static: true}) adHost!: AddDirective;

  @ViewChild(CdkDropListGroup, {static: false}) dashboard!: CdkDropListGroup<CdkDropList>;

  constructor(public dashboardService : DashboardComponentsService) {  

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

  ngAfterViewInit(): void {
    this.dashboardService.dashboard = this.dashboard;
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

  
}
