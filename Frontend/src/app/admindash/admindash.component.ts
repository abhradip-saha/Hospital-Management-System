import { Component, signal } from '@angular/core';
import { Patient } from '../class/patient.class';
import { PatientService } from '../service/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrl: './admindash.component.css',
  standalone: false,
})
export class Admindash {
  patients = signal<Patient[]>([]);

  actionErrorMessage = '';

  constructor(
    private patientService: PatientService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatientList().subscribe((data) => {
      this.patients.set(data);
    });
  }

  updatePatient(patient: Patient): void {
    if (patient.id === undefined) {
      this.actionErrorMessage = 'Cannot update this patient because its ID is missing.';
      return;
    }

    this.actionErrorMessage = '';
    this.router.navigate(['/edit-patient', patient.id], {
      state: { patient },
    });
  }

  deletePatient(id: number | undefined): void {
    if (id === undefined) {
      this.actionErrorMessage = 'Cannot delete this patient because its ID is missing.';
      return;
    }

    this.actionErrorMessage = '';
    this.patientService.deletePatient(id).subscribe({
      next: () => this.getPatients(),
      error: (error: unknown) => {
        console.error('Failed to delete patient:', error);
        this.actionErrorMessage = 'Unable to delete the patient. Please try again.';
      },
    });
  }
}
