import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentClass } from '../class/appointment.class';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/v2';

  getAllAppointments(): Observable<AppointmentClass[]> {
    return this.httpClient.get<AppointmentClass[]>(`${this.baseUrl}`);
  }
}
