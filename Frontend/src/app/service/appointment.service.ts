import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentClass } from '../class/appointment.class';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/appointments';

  getAllAppointments(): Observable<AppointmentClass[]> {
    return this.httpClient.get<AppointmentClass[]>(`${this.baseUrl}`);
  }

  getAppointmentById(id: number): Observable<AppointmentClass> {
    return this.httpClient.get<AppointmentClass>(`${this.baseUrl}/${id}`);
  }

  createAppointment(appointment: AppointmentClass): Observable<AppointmentClass> {
    return this.httpClient.post<AppointmentClass>(`${this.baseUrl}/insert`, appointment);
  }

  updateAppointment(id: number, appointment: AppointmentClass): Observable<AppointmentClass> {
    return this.httpClient.put<AppointmentClass>(`${this.baseUrl}/update/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }
}
