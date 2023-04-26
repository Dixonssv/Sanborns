import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './components/components.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class SharedModule { }
