import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PatientService} from "../../service/patient.service";
import {PatientData} from "../../models/patient-data.model";
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  patientReq: PatientData = {
    pid: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "MALE",
    address: "",
    suburb: "",
    state: "",
    postCode: "",
    phoneNumber: ""
  }
  dateOfBirth:any;

  constructor(public patientService: PatientService, public router: Router) {
  }

  createNewPatient(): void {
    const data = {
      firstName: this.patientReq.firstName,
      lastName: this.patientReq.lastName,
      dateOfBirth: this.dateOfBirth.year + '-' + (this.dateOfBirth.month < 10 ? '0'+ this.dateOfBirth.month : this.dateOfBirth.month) + '-' + (this.dateOfBirth.day < 10 ? '0'+ this.dateOfBirth.day : this.dateOfBirth.day),
      gender: this.patientReq.gender,
      address: this.patientReq.address,
      suburb: this.patientReq.suburb,
      state: this.patientReq.state,
      postCode: this.patientReq.postCode,
      phoneNumber:this.patientReq.phoneNumber
    };

    console.log(data)

    this.patientService.create(data)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/patient')
        },
        error: (e) => console.error(e)
      });
  }
}
