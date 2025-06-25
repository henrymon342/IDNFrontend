import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pastor } from '../models/pastor'

@Injectable({
  providedIn: 'root'
})
export class PastorService {

  private baseUrl = environment.URL;

  constructor( private http: HttpClient) { }

  createPastor( user: Pastor ): Observable<any> {
      return this.http.post(`${this.baseUrl}/pastores`, user);
  }

  getAllPastors() {
    return this.http.get(`${this.baseUrl}/pastores`);
  }

  getPastores() {
    return this.http.get(`${this.baseUrl}/pastores/getidnombres`);
  }

  get(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pastores/${id}`);
  }

  update(id: number, data: Pastor): Observable<any> {
    return this.http.put(`${this.baseUrl}/pastores/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pastores/${id}`);
  }

  getPastorByCategory(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pastores/findByCategory`, data);
  }
}
