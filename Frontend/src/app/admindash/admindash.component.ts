import { Component, signal } from '@angular/core';
import { Patient } from '../class/patient.class';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrl: './admindash.component.css',
  standalone: false,
})
export class Admindash {
  patients = signal<Patient[]>([]);

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatientList().subscribe((data) => {
      this.patients.set(data);
    });
  }
}
