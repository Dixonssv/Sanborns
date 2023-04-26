import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrgChartModule } from 'angular-org-chart';
//import { DetallesModule } from "./detalles/detalles.module";

import { AppComponent } from './app.component';
//import { HeaderComponent } from './modules/shared/components/header/header.component';
//import { SearchBarComponent } from './modules/common/presentation/search-bar/search-bar.component';
//import { BuscadorComponent } from './components/buscador/buscador.component';
//import { ListadoEmpleadosComponent } from './components/listado-empleados/listado-empleados.component';
import { EmpleadoCardListComponent } from './modules/inicio/components/empleado-card-list/empleado-card-list.component';
import { OrganigramaComponent } from './components/organigrama/organigrama.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
//import { HttpClientTestComponent } from './http-client-test/http-client-test.component';

import { InicioModule } from './modules/inicio/inicio.module';
import { SharedModule } from './modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrgChartModule,
    BrowserAnimationsModule,

    SharedModule,
    InicioModule
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
