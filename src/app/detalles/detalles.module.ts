import { NgModule } from              '@angular/core';
import { CommonModule } from          '@angular/common';
import { Routes, RouterModule } from  '@angular/router';
import {DragDropModule} from          '@angular/cdk/drag-drop';
import {NgxPrintModule} from          'ngx-print';

import { DetallesComponent } from         './ui/detalles/detalles.component';
import { SidebarComponent } from          './ui/sidebar/sidebar.component';
import { DashboardComponent } from        './ui/dashboard/dashboard.component';
import { PdfDownloadBtnComponent } from   './ui/pdf-download-btn/pdf-download-btn.component';
import { CardComponent } from             './ui/cards/card/card.component';
import { DatosPersonalesComponent } from  './ui/cards/datos-personales/datos-personales.component';
import { CurriculumComponent } from       './ui/cards/curriculum/curriculum.component';
import { EstudiosComponent } from         './ui/cards/estudios/estudios.component';
import { ContratoComponent } from         './ui/cards/contrato/contrato.component';
import { HorarioComponent } from          './ui/cards/horario/horario.component';
import { DocumentosComponent } from       './ui/cards/documentos/documentos.component';
import { NominaComponent } from           './ui/cards/nomina/nomina.component';
import { ActasComponent } from            './ui/cards/actas/actas.component';
import { TrayectoriaComponent } from      './ui/cards/trayectoria/trayectoria.component';
import { CursosComponent } from           './ui/cards/cursos/cursos.component';
import { TestComponent } from             './ui/cards/test/test.component';


import { DashboardComponentsService } from './services/dashboard-components/dashboard-components.service';

import { AddDirective } from          './directives/add/add.directive'; 
import { CardContentDirective } from  './directives/card-content/card-content.directive';



const routes: Routes = [
  {
    path: '', component: DetallesComponent,
    children: [
      {
        path: 'datos_personales', component: DatosPersonalesComponent
      },
      {
        path: 'curriculum', component: CurriculumComponent
      },
      {
        path: 'estudios', component: EstudiosComponent
      },
      {
        path: 'contrato', component: ContratoComponent
      },
      {
        path: 'horario', component: HorarioComponent
      },
      {
        path: 'documentos', component: DocumentosComponent
      },
      {
        path: 'nomina', component: NominaComponent
      },
      {
        path: 'actas', component: ActasComponent
      },
      {
        path: 'trayectoria', component: TrayectoriaComponent
      },
      {
        path: 'cursos', component: CursosComponent
      }
    ]
  },
  //{path: '', redirectTo: 'main/datos_personales', pathMatch: 'full'}
  //{path: '', redirectTo: 'datos_personales', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    DetallesComponent,
    SidebarComponent,
    DatosPersonalesComponent,
    CurriculumComponent,
    EstudiosComponent,
    ContratoComponent,
    HorarioComponent,
    DocumentosComponent,
    NominaComponent,
    ActasComponent,
    TrayectoriaComponent,
    CursosComponent,
    DashboardComponent,
    AddDirective,
    CardComponent,
    CardContentDirective,
    TestComponent,
    PdfDownloadBtnComponent,
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    DragDropModule,
    NgxPrintModule
  ],
  exports: [
    DetallesComponent,
    SidebarComponent
  ],
  providers: [
    DashboardComponentsService
  ],
  bootstrap: [
    DetallesComponent
  ]
})
export class DetallesModule { }