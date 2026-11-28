import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admindash } from './admindash/admindash.component';
import { Appointment } from './appointment/appointment.component';

const routes: Routes = [
  { path: 'admin', component: Admindash },
  { path:'appointmentlist', component: Appointment },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
