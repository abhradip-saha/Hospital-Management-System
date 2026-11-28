import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app.component';
import { Admindash } from './admindash/admindash.component';
import { HttpClientModule } from '@angular/common/http';
import { Appointment } from './appointment/appointment.component';
import { CreateAppointmmentComponent } from './create-appointmment.component/create-appointmment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [App, Admindash, Appointment, CreateAppointmmentComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
