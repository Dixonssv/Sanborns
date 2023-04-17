import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxPrintModule} from 'ngx-print';

import { DetallesComponent } from './components/detalles/detalles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DatosPersonalesComponent } from './components/cards/datos-personales/datos-personales.component';
import { CurriculumComponent } from './components/cards/curriculum/curriculum.component';
import { EstudiosComponent } from './components/cards/estudios/estudios.component';
import { ContratoComponent } from './components/cards/contrato/contrato.component';
import { HorarioComponent } from './components/cards/horario/horario.component';
import { DocumentosComponent } from './components/cards/documentos/documentos.component';
import { NominaComponent } from './components/cards/nomina/nomina.component';
import { ActasComponent } from './components/cards/actas/actas.component';
import { TrayectoriaComponent } from './components/cards/trayectoria/trayectoria.component';
import { CursosComponent } from './components/cards/cursos/cursos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardComponentsService } from './services/dashboard-components/dashboard-components.service';
import { AddDirective } from './directives/add/add.directive';
import { CardComponent } from './components/cards/card/card.component';
import { CardContentDirective } from './directives/card-content/card-content.directive';
import { TestComponent } from './components/cards/test/test.component';
import { PdfDownloadBtnComponent } from './components/pdf-download-btn/pdf-download-btn.component';

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