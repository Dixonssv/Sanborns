import { Component,Input, OnDestroy, OnInit, ViewChild, ViewContainerRef  } from '@angular/core';

import { AddDirective } from '../../directives/add/add.directive';

import {DashboardComponentsService} from 'src/app/detalles/services/dashboard-components.service'

import { AdComponent } from '../../services/ad-component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  @ViewChild(AddDirective, {static: true}) adHost!: AddDirective;

  constructor(private dashboardService : DashboardComponentsService) {
    
  }

  ngOnInit(): void {
    const viewContainerRef = this.adHost.viewContainerRef;

    this.dashboardService.addsChanged.pipe().subscribe(() => {
      
      viewContainerRef.clear();

      let components = this.dashboardService.getComponents();

      components.forEach((component:any) => {
        this.loadComponent(component, viewContainerRef);
        //console.log(component.component);
      });
    })
  }

  ngOnDestroy(): void {
    
  }

  loadComponent(component:any, viewContainerRef:ViewContainerRef) {
    viewContainerRef.createComponent<AdComponent>(component.component);
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
}
