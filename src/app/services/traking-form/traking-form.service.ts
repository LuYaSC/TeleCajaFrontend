import { Injectable } from '@angular/core';
import { FormDiagDto } from './models/form-diag-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParamsDto } from './models/params-dto';




@Injectable({
  providedIn: 'root'
})
export class TrakingFormService {

  private baseUrl = 'https://servicios.alliviapp.com:444/Patients/api/Patient/';
  public httpHeader: any;

  constructor(public http: HttpClient) {
    this.httpHeader =  new HttpHeaders({
        'Content-Type': 'application/json'
    });
  }

  save(request: FormDiagDto) {
    const url = this.baseUrl + 'SaveForm';
    return this.http.post(url, request);
  }

  getFormPrevious(request: ParamsDto) {
    const url = this.baseUrl + 'GetFormPrevious';
    return this.http.post(url, request);
  }

  getFormById(id) {
    const url = this.baseUrl + 'GetFormById';
    let request = {formId: id};
    return this.http.post(url, request);
  }

  
  
}
