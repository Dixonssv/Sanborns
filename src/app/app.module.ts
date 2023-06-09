import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrgChartModule } from 'angular-org-chart';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
//import { HttpClientTestComponent } from './http-client-test/http-client-test.component';

import { SharedModule } from './modules/shared/shared.module';
import { OrganigramaComponent } from './components/organigrama/organigrama.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganigramaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //OrgChartModule,
    BrowserAnimationsModule,

    SharedModule,
    //InicioModule
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
