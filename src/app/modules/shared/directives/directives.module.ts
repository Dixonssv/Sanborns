import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDirective } from './add/add.directive';
import { CardContentDirective } from './card-content/card-content.directive';

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
    CardContentDirective
  ]
})
export class DirectivesModule { }
