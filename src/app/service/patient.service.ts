import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PatientResponse} from "../models/patient-response.model";
import {PatientPageData} from "../models/patient-page-data.model";

const baseUrl = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  get(id: any): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(`${baseUrl}/patient/detail/${id}`);
  }

  getPatientPage(q: string, page: number, size:number): Observable<PatientPageData> {
    return this.http.get<PatientPageData>(`${baseUrl}/patient/page?q=${q}&page=${page}&size=${size}`);
  }

  create(data: any): Observable<PatientResponse> {
    return this.http.post(`${baseUrl}/patient`, data);
  }

  update(data: any): Observable<PatientResponse> {
    return this.http.put(`${baseUrl}/patient`, data);
  }

  delete(pid: String): Observable<any> {
    return this.http.delete(`${baseUrl}/patient/delete/${pid}`);
  }

}
