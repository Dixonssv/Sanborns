import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DetallesComponent } from './components/detalles/detalles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';

const routes: Routes = [
  {
    path: '',
    component: DetallesComponent
  },
];

@NgModule({
  declarations: [
    DetallesComponent,
    SidebarComponent,
    DatosPersonalesComponent
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
