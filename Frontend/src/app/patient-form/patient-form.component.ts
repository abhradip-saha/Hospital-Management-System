import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../class/patient.class';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-patient-form',
  standalone: false,
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent {
  patient: Patient = new Patient();
  errorMessage: string | null = null;
  isEditMode = false;
  isLoading = false;
  patientLoaded = false;
  private patientId: number | null = null;

  constructor(
    private patientService: PatientService,
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
      this.errorMessage = 'Invalid patient ID.';
      return;
    }

    this.isEditMode = true;
    this.patientId = id;
    const navigationPatient: unknown = window.history.state?.patient;
    if (this.isPatientForId(navigationPatient, id)) {
      this.patient = navigationPatient;
      this.patientLoaded = true;
      return;
    }

    this.isLoading = true;
    this.patientService.getPatientById(id).subscribe({
      next: (patient) => {
        this.patient = patient;
        this.patientLoaded = true;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Failed to load patient:', error);
        this.errorMessage = 'Unable to load the patient. Please try again.';
        this.isLoading = false;
      },
    });
  }

  private isPatientForId(value: unknown, id: number): value is Patient {
    return (
      typeof value === 'object' &&
      value !== null &&
      'id' in value &&
      value.id === id &&
      'name' in value &&
      typeof value.name === 'string' &&
      'age' in value &&
      typeof value.age === 'string' &&
      'blood' in value &&
      typeof value.blood === 'string' &&
      'prescription' in value &&
      typeof value.prescription === 'string' &&
      'dose' in value &&
      typeof value.dose === 'string' &&
      'fees' in value &&
      typeof value.fees === 'string' &&
      'urgency' in value &&
      typeof value.urgency === 'string'
    );
  }

  savePatient(): void {
    this.errorMessage = null;
    const handleSuccess = (patient: Patient) => {
      console.log(this.isEditMode ? 'Patient updated:' : 'Patient created:', patient);
      this.goToPatientList();
    };
    const handleError = (error: unknown) => {
      console.error(`Failed to ${this.isEditMode ? 'update' : 'create'} patient:`, error);
      this.errorMessage = `Unable to ${this.isEditMode ? 'update' : 'create'} the patient. Please try again.`;
    };

    if (this.isEditMode) {
      if (this.patientId === null) {
        this.errorMessage = 'A valid patient ID is required to update this patient.';
        return;
      }

      this.patientService.updatePatient(this.patientId, this.patient).subscribe({
        next: handleSuccess,
        error: handleError,
      });
      return;
    }

    this.patientService.createPatient(this.patient).subscribe({
      next: handleSuccess,
      error: handleError,
    });
  }

  goToPatientList(): void {
    this.router.navigate(['/admin']);
  }
}
