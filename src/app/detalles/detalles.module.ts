import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DetallesComponent } from './components/detalles/detalles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { HorarioComponent } from './components/horario/horario.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { NominaComponent } from './components/nomina/nomina.component';
import { ActasComponent } from './components/actas/actas.component';
import { TrayectoriaComponent } from './components/trayectoria/trayectoria.component';
import { CursosComponent } from './components/cursos/cursos.component';

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
  {path: '', redirectTo: 'datos_personales', pathMatch: 'full'}
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
    CursosComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ],
  exports: [
    DetallesComponent,
    SidebarComponent
  ],
  bootstrap: [
    DetallesComponent
  ]
})
export class DetallesModule { }
