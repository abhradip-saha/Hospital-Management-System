import { Component, signal } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { AppointmentClass } from '../class/appointment.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class Appointment {
  appointments = signal<AppointmentClass[]>([]);
  actionErrorMessage = '';

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.getAppointments();
  }
  getAppointments() {
    this.appointmentService.getAllAppointments().subscribe((data) => {
      this.appointments.set(data);
    });
  }
  updateAppointment(appointment: AppointmentClass) {
    if (appointment.id === undefined) {
      this.actionErrorMessage = 'Cannot update this appointment because its ID is missing.';
      return;
    }

    this.actionErrorMessage = '';
    this.router.navigate(['/edit-appointment', appointment.id], {
      state: { appointment },
    });
  }

  deleteAppointment(id: number | undefined) {
    if (id === undefined) {
      this.actionErrorMessage = 'Cannot delete this appointment because its ID is missing.';
      return;
    }

    this.actionErrorMessage = '';
    this.appointmentService.deleteAppointment(id).subscribe(data => {
      console.log(data);
      this.getAppointments();
    });
  }
}
