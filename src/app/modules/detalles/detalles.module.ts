import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { DetallesComponent } from './components/detalles/detalles.component';
import { DetallesRoutingModule } from './detalles-routing.module';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    SharedModule,
    DetallesRoutingModule,
    ComponentsModule
  ],
  bootstrap: [
    DetallesComponent
  ]
})
export class DetallesModule { }
