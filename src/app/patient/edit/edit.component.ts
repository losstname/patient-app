import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {PatientData} from "../../models/patient-data.model";
import {PatientService} from "../../service/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientResponse} from "../../models/patient-response.model";


@Component({
  selector: 'app-edit',
  standalone: true,
    imports: [CommonModule, FormsModule, NgbInputDatepicker, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

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

  dateOfBirth: any = {
    year: 2023,
    month: 2,
    day: 3
  };

  pid: string = ""
  constructor(public patientService: PatientService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.pid = this.route.snapshot.params["patientId"]
    this.patientService.get(this.pid).subscribe((data: PatientResponse) => {

      this.patientReq.firstName = data.data?.firstName
      this.patientReq.lastName = data.data?.lastName
      this.patientReq.dateOfBirth = data.data?.dateOfBirth
      this.patientReq.gender = data.data?.gender
      this.patientReq.address = data.data?.address
      this.patientReq.suburb = data.data?.suburb
      this.patientReq.state = data.data?.state
      this.patientReq.postCode = data.data?.postCode
      this.patientReq.phoneNumber = data.data?.phoneNumber

      var dob = data.data?.dateOfBirth != null ? data.data?.dateOfBirth.split("-") : [];
      this.dateOfBirth = {
        year: parseInt(dob[0]),
        month: parseInt(dob[1]),
        day: parseInt(dob[2])
      }
    });

  }

  updatePatient(): void {
    const updateReqData = {
      pid: this.pid,
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

    this.patientService.update(updateReqData)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/patient')
        },

        error: (e) => console.error(e)
      });
  }
}
