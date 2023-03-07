import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientTestComponent } from './http-client-test/http-client-test.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { BuscadorEmpleadosService } from './services/buscador-empleados.service';
import { ListadoEmpleadosComponent } from './components/listado-empleados/listado-empleados.component';

@NgModule({
  declarations: [
    AppComponent,
    HttpClientTestComponent,
    BuscadorComponent,
    ListadoEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    BuscadorEmpleadosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
