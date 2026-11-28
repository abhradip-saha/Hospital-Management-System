import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admindash } from './admindash/admindash.component';
import { Appointment } from './appointment/appointment.component';
import { CreateAppointmmentComponent } from './create-appointmment.component/create-appointmment.component';

const routes: Routes = [
  { path: 'admin', component: Admindash },
  { path:'appointmentlist', component: Appointment },
  { path: 'create-appointment', component: CreateAppointmmentComponent },
  { path: 'edit-appointment/:id', component: CreateAppointmmentComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
