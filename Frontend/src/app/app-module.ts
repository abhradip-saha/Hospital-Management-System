import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app.component';
import { Admindash } from './admindash/admindash.component';
import { HttpClientModule } from '@angular/common/http';
import { Appointment } from './appointment/appointment.component';

@NgModule({
  declarations: [App, Admindash, Appointment],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
