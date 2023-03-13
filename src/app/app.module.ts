import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientTestComponent } from './http-client-test/http-client-test.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { BuscadorEmpleadosService } from './services/buscador-empleados.service';
import { ListadoEmpleadosComponent } from './components/listado-empleados/listado-empleados.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {path: 'inicio', component: ListadoEmpleadosComponent},
  {path: 'detalles/:index', component: DetallesComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HttpClientTestComponent,
    BuscadorComponent,
    ListadoEmpleadosComponent,
    DetallesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)],
    FormsModule
  ],
  providers: [
    BuscadorEmpleadosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
