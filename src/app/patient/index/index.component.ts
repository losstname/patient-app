import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PatientData} from "../../models/patient-data.model";
import {PatientService} from "../../service/patient.service";
import {PatientPageData} from "../../models/patient-page-data.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NgbPaginationModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{

  patientList: PatientData[] = [];
  q: string = ""
  page = 0
  collectionSize = 0

  constructor(public patientService: PatientService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(): void {
    this.patientService.getPatientPage(this.q, this.page - 1, 10).subscribe((data: PatientPageData) => {
      this.patientList = data.content;
      this.page = data.page?.number != null ? data.page.number + 1 : 0
      this.collectionSize = data.page?.totalElements != null ? data.page?.totalElements : 0
    })
  }

  deletePatient(patient: PatientData){
    this.patientService.delete(patient.pid).subscribe(() => {
      this.fetchData()
    })
  }
}
