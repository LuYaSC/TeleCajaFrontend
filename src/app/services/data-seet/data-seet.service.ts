import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetPatientsDto } from './models/get-patients-dto';
import { TechnicalSheetDto } from './models/technical-sheet-dto';

@Injectable({
  providedIn: 'root'
})
export class DataSeetService {

  private baseUrl = 'https://doctorvirtual.ngrok.io/Patients/api/Patient/';
  public httpHeader: any;

  constructor(public http: HttpClient) {
    this.httpHeader =  new HttpHeaders({
        'Content-Type': 'application/json'
    });
  }

  getPatients(request: GetPatientsDto) {
    const url = this.baseUrl + 'GetPatients';
    return this.http.post(url, request);
  }

  getTechnicalSheet(request: TechnicalSheetDto) {
    const url = this.baseUrl + 'GetTechnicalSheet';
    return this.http.post(url, request);
  }
  confirmedTest(request: TechnicalSheetDto) {
    const url = this.baseUrl + 'ConfirmedTest';
    return this.http.post(url, request);
  }
}
