import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonCoreModule } from '../core/common.core.module';
import { CommonDataModule } from '../data/common.data.module';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    //EmpleadoCardListComponent
  ],
  imports: [
    CommonModule,
    CommonCoreModule,
    CommonDataModule,
  ]
})
export class CommonPresentationModule { }
