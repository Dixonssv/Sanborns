import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './inicio/inicio.component';
import { EmpleadoCardListComponent } from './empleado-card-list/empleado-card-list.component';

@NgModule({
  declarations: [
    InicioComponent,
    EmpleadoCardListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InicioComponent,
    EmpleadoCardListComponent
  ]
})
export class ComponentsModule { }
