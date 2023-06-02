import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'inicio',          loadChildren: () =>import('./modules/inicio/inicio.module').then((m) => m.InicioModule)},
  {path: 'detalles',        loadChildren: () =>import('./modules/detalles/detalles.module').then((m) => m.DetallesModule)},
  {path: 'detalles/:index', loadChildren: () =>import('./modules/detalles/detalles.module').then((m) => m.DetallesModule)},
  {path: 'gridstack',       loadChildren: () =>import('./modules/gridstack-test/gridstack-test.module').then((m) => m.GridstackTestModule)},
  //{path: 'detalles',        loadChildren: () =>import(`./modules/detalles/detalles.module`).then((m) => m.DetallesModule)},
  //{path: 'orgchart', component: OrganigramaComponent},
  //{path: 'testDashboard', component: TestDashboardComponent},

  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  /*{path: 'detalles', redirectTo: 'inicio', pathMatch: 'full'}*/
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
