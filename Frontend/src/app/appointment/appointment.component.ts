import { Component, signal } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { AppointmentClass } from '../class/appointment.class';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class Appointment {
  appointments = signal<AppointmentClass[]>([]);

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointments();
  }
  getAppointments() {
    this.appointmentService.getAllAppointments().subscribe((data) => {
      this.appointments.set(data);
    });
  }
}
