import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';

interface PatientWithId extends Patient {
  patient_Id: string; // mapped from backend "id"
}

@Component({
  selector: 'app-all-patients-list',
  standalone: false,
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.css']
})
export class AllPatientsListComponent implements OnInit {

  allPatients: PatientWithId[] = [];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getAllPatientsList().subscribe({
      next: (res: any[]) => {
        this.allPatients = res.map((p) => ({
          ...p,
          patientId: p.patient_Id
        }));
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
      }
    });
  }

  view(patient_Id: string) {
    this.router.navigate(['/patientList', patient_Id]);
  }
}
