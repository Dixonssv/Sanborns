import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DataModule } from '../data/data.module';

import { EmpleadoCardListComponent } from './empleado-card-list/empleado-card-list.component';

@NgModule({
  declarations: [
    //EmpleadoCardListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DataModule
  ]
})
export class PresentationModule { }
