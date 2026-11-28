import { Component } from '@angular/core';
import { AppointmentClass } from '../class/appointment.class';
import { AppointmentService } from '../service/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-appointmment.component',
  standalone: false,
  templateUrl: './create-appointmment.component.html',
  styleUrl: './create-appointmment.component.css',
})
export class CreateAppointmmentComponent {
  appointment: AppointmentClass = new AppointmentClass();
  errorMessage: string | null = null;

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  saveAppointment(): void {
    this.errorMessage = null;
    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: (data) => {
        console.log('Appointment created:', data);
        this.goToAppointment();
      },
      error: (error: unknown) => {
        console.error('Failed to create appointment:', error);
        this.errorMessage = 'Unable to create the appointment. Please try again.';
      },
    });
  }

  onSubmit(): void {
    this.saveAppointment();
  }

  goToAppointment(): void {
    this.router.navigate(['/appointmentlist']);
  }
}
