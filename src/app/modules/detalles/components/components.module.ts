import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GridstackModule } from 'gridstack/dist/angular';

import { DetallesComponent } from './detalles/detalles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PdfDownloadBtnComponent } from './pdf-download-btn/pdf-download-btn.component';
import { GridstackTestComponent } from './gridstack-test/gridstack-test.component';

import { CardComponent } from './cards/card/card.component';
import { SharedModule } from '../../shared/shared.module';
import { GridsterTestComponent } from './gridster-test/gridster-test.component';
import { GridsterModule } from 'angular-gridster2';


@NgModule({
  declarations: [
    DetallesComponent,
    DashboardComponent,
    SidebarComponent,
    PdfDownloadBtnComponent,
    CardComponent,
    GridstackTestComponent,
    GridsterTestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    NgxPrintModule,
    GridstackModule,
    GridsterModule
  ],
  exports: [
    DetallesComponent,
    DashboardComponent,
    SidebarComponent,
    PdfDownloadBtnComponent,
    CardComponent,
    GridstackTestComponent
  ]
})
export class ComponentsModule { }
