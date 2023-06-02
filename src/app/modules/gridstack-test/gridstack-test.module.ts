import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridstackModule } from 'gridstack/dist/angular';
import { GridstackTestComponent } from './components/gridstack-test/gridstack-test.component';
import { GridstackTestRoutingModule } from './gridstack-test-routing.module';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    GridstackTestComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    GridstackModule,
    GridstackTestRoutingModule
  ],
  bootstrap: [
    GridstackTestComponent
  ]
})
export class GridstackTestModule { }
