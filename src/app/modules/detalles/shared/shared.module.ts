import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDirective } from './directives/add/add.directive';
import { CardContentDirective } from './directives/card-content/card-content.directive';

@NgModule({
  declarations: [
    AddDirective,
    CardContentDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddDirective,
    CardContentDirective,
  ]
})
export class DetallesSharedModule { }
