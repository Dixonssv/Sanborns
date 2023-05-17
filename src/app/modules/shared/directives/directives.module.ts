import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDirective } from './add/add.directive';
import { CardContentDirective } from './card-content/card-content.directive';
import { PrintableDirective } from './printable/printable.directive';

@NgModule({
  declarations: [
    AddDirective,
    CardContentDirective,
    PrintableDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddDirective,
    CardContentDirective,
    PrintableDirective,
  ]
})
export class DirectivesModule { }
