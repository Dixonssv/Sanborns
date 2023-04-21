import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrgChartModule } from 'angular-org-chart';
//import { DetallesModule } from "./detalles/detalles.module";

import { CommonCoreModule } from './modules/common/core/common.core.module';
import { CommonDataModule } from './modules/common/data/common.data.module';
import { CommonPresentationModule } from './modules/common/presentation/common.presentation.module';

import { CoreModule } from './modules/inicio/core/core.module';
import { DataModule } from './modules/inicio/data/data.module';
import { PresentationModule } from './modules/inicio/presentation/presentation.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/common/presentation/header/header.component';
import { SearchBarComponent } from './modules/common/presentation/search-bar/search-bar.component';
//import { BuscadorComponent } from './components/buscador/buscador.component';
//import { ListadoEmpleadosComponent } from './components/listado-empleados/listado-empleados.component';
import { EmpleadoCardListComponent } from './modules/inicio/presentation/empleado-card-list/empleado-card-list.component';
import { OrganigramaComponent } from './components/organigrama/organigrama.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpleadoRepository } from './modules/inicio/core/repositories/empleado.repository';
//import { HttpClientTestComponent } from './http-client-test/http-client-test.component';

const routes: Routes = [
  //{path: 'inicio', component: ListadoEmpleadosComponent},
  {path: 'inicio', component: EmpleadoCardListComponent},
  {path: 'detalles/:index', loadChildren: () =>import(`./detalles/detalles.module`).then((m) => m.DetallesModule),},
  {path: 'orgchart', component: OrganigramaComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    EmpleadoCardListComponent,
    OrganigramaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)],
    FormsModule,
    OrgChartModule,
    BrowserAnimationsModule,
    CoreModule,
    DataModule,
    PresentationModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
