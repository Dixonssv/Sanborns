import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchBarComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
