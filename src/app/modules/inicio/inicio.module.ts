import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ComponentsModule
  ],
  bootstrap: [
    InicioComponent
  ]
})
export class InicioModule { }
