import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DetallesModule } from "./detalles/detalles.module";

import { BuscadorEmpleadosService } from './services/buscador-empleados.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ListadoEmpleadosComponent } from './components/listado-empleados/listado-empleados.component';
//import { DetallesComponent } from './detalles/components/detalles/detalles.component';
//import { SidebarComponent } from './detalles/components/sidebar/sidebar.component';
//import { HttpClientTestComponent } from './http-client-test/http-client-test.component';

const routes: Routes = [
  {path: 'inicio', component: ListadoEmpleadosComponent},
  {path: 'detalles/:index', loadChildren: () =>import(`./detalles/detalles.module`).then((m) => m.DetallesModule),},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    //HttpClientTestComponent,
    BuscadorComponent,
    ListadoEmpleadosComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)],
    FormsModule,
    DetallesModule
  ],
  providers: [
    BuscadorEmpleadosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
