import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
    if (typeof window !== 'undefined' && localStorage) {
      const storedUserId = window.localStorage.getItem('userId');
      if (storedUserId) {
        this.isLogIn.next(true);
      }
    }
  }

  authenticateUser(username: string, token: string): Observable<boolean> {
    return this.api.checkLogin(username, token).pipe(
      tap((res: Credentials) => {
        //console.log('Login response from API:', res);
        if (res && res.userId) {
          if (typeof window !== 'undefined' && localStorage) {
            window.localStorage.setItem('userId', res.userId.toString());
            window.localStorage.setItem('token', res.token.toString());
          }
          this.isLogIn.next(true);
        }
      }),
      map(res => !!res && !!res.userId),
      catchError(() => {
        this.isLogIn.next(false);
        return [false];
      })
    );
  }

  getAuthStatus(): Observable<boolean> {
    return this.isLogIn.asObservable();
  }

  doLogOut() {
    if (localStorage.getItem('userId')) {
      localStorage.removeItem('userId');
    }
    this.isLogIn.next(false);
  }

  getUserDetails(userId: string): Observable<Users> {
    return this.api.getUserDetails(userId)
    .pipe(
      catchError(err => throwError(() => err))
    );
  }

  updateProfile(userDetails: Users): Observable<boolean> {
    
    return this.api.updateDetails(userDetails).pipe(
      map(res => !!res),
      catchError(() => [false])
    );
  }

  registerPatient(patientDetails: Patient): Observable<any> {
    return this.api.registerPatient(patientDetails).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getAllPatientsList(): Observable<Patient[]> {
    return this.api.getAllPatientsList().pipe(
      catchError(err => throwError(() => err))
    );
  }

  getParticularPatient(id: string): Observable<Patient> {
    return this.api.getParticularPatient(id).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getDiseasesList(): Observable<any> {
    return this.api.getDiseasesList().pipe(
      catchError(err => throwError(() => err))
    );
  }

  bookAppointment(appointmentDetails: Appointment): Observable<any> {
    return this.api.bookAppointment(appointmentDetails).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getAppointments(patient_Id: string): Observable<Appointment[]> {
    return this.api.getAppointments(patient_Id).pipe(
      catchError(err => throwError(() => err))
    );
  }

  deleteAppointment(appointmentId: string): Observable<any> {
    return this.api.deleteAppointment(appointmentId).pipe(
      catchError(err => throwError(() => err))
    );
  }

  requestedAppointments(): Observable<Appointment[]> {
    return this.api.requestedAppointments().pipe(
      catchError(err => throwError(() => err))
    );
  }

  getUserId(): string {
    const userId = window.localStorage.getItem('userId');
    return userId ? userId : '';
  }
}

