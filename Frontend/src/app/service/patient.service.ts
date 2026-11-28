import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../class/patient.class';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient:HttpClient){}

  private baseUrl:string="http://localhost:8080/api/patients";

  getPatientList():Observable<Patient[]>{
     return this.httpClient.get<Patient[]>(`${this.baseUrl}`);
  }
}
