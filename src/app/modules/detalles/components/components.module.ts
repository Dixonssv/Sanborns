import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DetallesComponent } from './detalles/detalles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PdfDownloadBtnComponent } from './pdf-download-btn/pdf-download-btn.component';

import { CardComponent } from './cards/card/card.component';
import { TestDashboardComponent } from './test-dashboard/test-dashboard.component';



@NgModule({
  declarations: [
    DetallesComponent,
    DashboardComponent,
    SidebarComponent,
    PdfDownloadBtnComponent,
    CardComponent,
    TestDashboardComponent
  ],
  imports: [
    CommonModule,
    DetallesCoreModule,
    DetallesDataModule,
    DetallesSharedModule,
    DragDropModule,
    NgxPrintModule
  ],
  exports: [
    DetallesComponent,
    DashboardComponent,
    SidebarComponent,
    PdfDownloadBtnComponent,
    CardComponent,
    TestDashboardComponent
  ]
})
export class ComponentsModule { }
