import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
// import { Patient } from '../models/patient';
// import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string;
  AUTH_API_URL = '/auth/server/';

  constructor(private http: HttpClient) {
    this.API_URL = 'https://healthcareapi.duckdns.org/api';
  }

  public checkLogin(username: string, password: string): Observable<Credentials> {
    return this.http.post<Credentials>(`${this.API_URL}${this.AUTH_API_URL}`, {
      user_name:username,
      password:password
    }).pipe(catchError(this.handleError));
  }

  public getUserDetails(userId: string): Observable<Users> {
    const token = localStorage.getItem('token');
    return this.http.get<Users>(`${this.API_URL}/users/${userId}`,
       {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    )
      .pipe(catchError(this.handleError));
  }

  public updateDetails(userDetails: Users): Observable<Users> {
    console.log("PUT URL:", `${this.API_URL}/users/${userDetails.userId}`);

    return this.http.put<Users>(`${this.API_URL}/users/${userDetails.userId}`, userDetails,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .pipe(catchError(this.handleError));
  }

  public registerPatient(patientDetails: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/allpatients`, patientDetails,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      },
    )
      .pipe(catchError(this.handleError));
  }

  public getAllPatientsList(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/allpatients`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .pipe(catchError(this.handleError));
  }

  public getParticularPatient(patientId: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/allpatients/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .pipe(catchError(this.handleError));
  }

  public getDiseasesList(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/diseases`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .pipe(catchError(this.handleError));
  }

  public bookAppointment(appointmentDetails: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/reqappointments`, appointmentDetails,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .pipe(catchError(this.handleError));
  }

  public requestedAppointments(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/reqappointments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .pipe(catchError(this.handleError));
  }

  public getAppointments(patientId: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/reqappointments/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .pipe(catchError(this.handleError));
  }

  public deleteAppointment(appointmentId: any): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/reqappointments/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}

