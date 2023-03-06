import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HttpClientTestComponent } from './http-client-test/http-client-test.component';
import { Compo1Component } from './components/compo1/compo1.component';
import { Mod2Module } from './mod2.module';

@NgModule({
  declarations: [
    AppComponent,
    Compo1Component,
    HttpClientTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Mod2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
