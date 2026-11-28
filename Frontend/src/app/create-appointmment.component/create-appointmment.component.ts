import { Component } from '@angular/core';
import { AppointmentClass } from '../class/appointment.class';
import { AppointmentService } from '../service/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-appointmment.component',
  standalone: false,
  templateUrl: './create-appointmment.component.html',
  styleUrl: './create-appointmment.component.css',
})
export class CreateAppointmmentComponent {
  appointment: AppointmentClass = new AppointmentClass();
  errorMessage: string | null = null;
  isEditMode = false;
  isLoading = false;
  appointmentLoaded = false;
  private appointmentId: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) {
      return;
    }

    const id = Number(idParam);
    if (!Number.isInteger(id) || id <= 0) {
      this.isEditMode = true;
      this.errorMessage = 'Invalid appointment ID.';
      return;
    }

    this.isEditMode = true;
    this.appointmentId = id;
    const navigationAppointment: unknown = window.history.state?.appointment;
    if (this.isAppointmentForId(navigationAppointment, id)) {
      this.appointment = navigationAppointment;
      this.appointmentLoaded = true;
      return;
    }

    this.isLoading = true;
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment) => {
        this.appointment = appointment;
        this.appointmentLoaded = true;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Failed to load appointment:', error);
        this.errorMessage = 'Unable to load the appointment. Please try again.';
        this.isLoading = false;
      },
    });
  }

  private isAppointmentForId(value: unknown, id: number): value is AppointmentClass {
    return (
      typeof value === 'object' &&
      value !== null &&
      'id' in value &&
      value.id === id &&
      'name' in value &&
      typeof value.name === 'string' &&
      'age' in value &&
      typeof value.age === 'string' &&
      'symptoms' in value &&
      typeof value.symptoms === 'string' &&
      'number' in value &&
      typeof value.number === 'string'
    );
  }

  saveAppointment(): void {
    this.errorMessage = null;
    const handleSuccess = (data: AppointmentClass) => {
      console.log(this.isEditMode ? 'Appointment updated:' : 'Appointment created:', data);
      this.goToAppointment();
    };
    const handleError = (error: unknown) => {
      console.error(`Failed to ${this.isEditMode ? 'update' : 'create'} appointment:`, error);
      this.errorMessage = `Unable to ${this.isEditMode ? 'update' : 'create'} the appointment. Please try again.`;
    };

    if (this.isEditMode) {
      if (this.appointmentId === null) {
        this.errorMessage = 'A valid appointment ID is required to update this appointment.';
        return;
      }

      this.appointmentService.updateAppointment(this.appointmentId, this.appointment).subscribe({
        next: handleSuccess,
        error: handleError,
      });
      return;
    }

    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: handleSuccess,
      error: handleError,
    });
  }

  onSubmit(): void {
    this.saveAppointment();
  }

  goToAppointment(): void {
    this.router.navigate(['/appointmentlist']);
  }
}
