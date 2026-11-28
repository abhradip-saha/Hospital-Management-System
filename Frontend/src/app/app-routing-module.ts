import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admindash } from './admindash/admindash.component';
import { Appointment } from './appointment/appointment.component';
import { CreateAppointmmentComponent } from './create-appointmment.component/create-appointmment.component';
import { PatientFormComponent } from './patient-form/patient-form.component';

const routes: Routes = [
  { path: 'admin', component: Admindash },
  { path:'appointmentlist', component: Appointment },
  { path: 'create-appointment', component: CreateAppointmmentComponent },
  { path: 'edit-appointment/:id', component: CreateAppointmmentComponent },
  { path: 'create-patient', component: PatientFormComponent },
  { path: 'edit-patient/:id', component: PatientFormComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
