import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private baseUrl = 'https://doctorvirtual.ngrok.io/DoctorVirtual.Georreferenciacion.Api/Api/Georreferenciacion/';
  public httpHeader: any;

  constructor(public http: HttpClient) {
    this.httpHeader =  new HttpHeaders({
        'Content-Type': 'application/json'
    });
  }

  getLocations() {
    //return this.http.post(this.getLocationsUrl, data, {headers: this.httpHeader});
    return this.http.post(this.baseUrl, null);
  }

  getLocationsByTime(time: any) {
    const url = this.baseUrl + 'ActualizarQuery?timestamp=' + time;
    return this.http.post(url, null);
  }
}
