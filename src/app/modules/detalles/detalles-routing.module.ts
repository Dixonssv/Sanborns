import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesComponent } from './components/detalles/detalles.component';
import { GridstackTestComponent } from './components/gridstack-test/gridstack-test.component';

const routes: Routes = [
  {path: '', component: DetallesComponent},
  //{path: 'grid', component: GridstackTestComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallesRoutingModule { }
