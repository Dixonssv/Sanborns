import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrgChartModule } from 'angular-org-chart';
//import { DetallesModule } from "./detalles/detalles.module";

import { CoreModule } from './modules/inicio/core/core.module';
import { DataModule } from './modules/inicio/data/data.module';
import { PresentationModule } from './modules/inicio/presentation/presentation.module';

import { BuscadorEmpleadosService } from './services/buscador-empleados/buscador-empleados.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
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
    BuscadorComponent,
    EmpleadoCardListComponent,
    OrganigramaComponent,
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
    {provide: EmpleadoRepository, useClass: BuscadorEmpleadosService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
