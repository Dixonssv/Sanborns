import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  bootstrap: [
    InicioComponent
  ]
})
export class InicioModule { }
