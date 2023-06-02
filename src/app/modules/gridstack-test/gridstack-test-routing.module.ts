import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridstackTestComponent } from './components/gridstack-test/gridstack-test.component';

const routes: Routes = [
  {path: '', component: GridstackTestComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridstackTestRoutingModule { }
