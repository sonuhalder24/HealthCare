// import { Component, OnInit } from '@angular/core';
// import { DataService } from '../../services/data.service';
// import { Router } from '@angular/router';
// // import * as alertify from 'alertifyjs';

// @Component({
//   selector: 'app-all-requested-appointments',
//   standalone: false,
//   templateUrl: './all-requested-appointments.component.html',
//   styleUrls: ['./all-requested-appointments.component.css']
// })
// export class AllRequestedAppointmentsComponent implements OnInit {

//   allAppointments: any;

//   constructor(private dataService: DataService, private route: Router) { }

//   ngOnInit() {
//     // call appointments method by default
//   }

//   appointments() {
//     // get all requested appointments from service
//   }

//   view(patientId: number) {
//     // should navigate to 'patientList' page with selected patientId
//   }

//   cancelAppointment(id: number) {
//     // delete selected appointment using service
//     // After deleting the appointment, get all requested appointments
//   }

// }

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment';

interface AppointmentWithId extends Appointment {
  id: number;
}

@Component({
  selector: 'app-all-requested-appointments',
  standalone: false,
  templateUrl: './all-requested-appointments.component.html',
  styleUrls: ['./all-requested-appointments.component.css']
})
export class AllRequestedAppointmentsComponent implements OnInit {

  allAppointments: AppointmentWithId[] = [];
  // ✅ Step 1 — Create a Map for patientId → patientName
  patientMap = new Map<string, string>();

  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    //this.appointments();
    this.loadPatients();
  }

 loadPatients() {
  this.dataService.getAllPatientsList().subscribe({
    next: (res: any[]) => {

      res.forEach(p => {
        // 👇 IMPORTANT — Use patient_Id
        this.patientMap.set(
          String(p.patient_Id),
          `${p.firstName} ${p.lastName}`
        );
      });

      // Load appointments AFTER patient names stored
      this.appointments();
    },
    error: err => {
      console.error("Error loading patients:", err);
    }
  });
}
  appointments() {
    this.dataService.requestedAppointments().subscribe({
      next: (res: any) => {
        this.allAppointments = res.map((appointment: AppointmentWithId) => ({...appointment, id: appointment.id}));
      },
      error: (err: any) => {
        console.error('Error loading requested appointments:', err);
      }
    });
  }

  view(patientId: string) {
    console.log('Navigating to patient details for ID:', patientId);
    this.route.navigate(['/patientList', patientId]);
  }

  cancelAppointment(id: string) {
    this.dataService.deleteAppointment(id).subscribe({
      next: () => {
        console.log('Appointment cancelled successfully');
        this.appointments();
      },
      error: (err: any) => {
        console.error('Error cancelling appointment:', err);
      }
    });
  }
}
