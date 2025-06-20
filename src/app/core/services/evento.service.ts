import { Injectable } from '@angular/core';
import { EventModel } from '../models/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor( private http: HttpClient) { }

  createEvent( event: EventModel ): Observable<any> {
    return this.http.post(`${baseUrl}/eventos`, event);
  }

  get(id:number): Observable<any> {
  return this.http.get(`${baseUrl}/eventos/${id}`);
  }

  update(id: number, event: EventModel ): Observable<any> {
  return this.http.put(`${baseUrl}/eventos/${id}`, event);
  }

  delete(id: number): Observable<any> {
  return this.http.delete(`${baseUrl}/eventos/${id}`);
  }

  findByMinisterio(ministerio: any):Observable<any> {
    return this.http.post(`${baseUrl}/eventos/obtenerPorMinisterio`, ministerio);
  }

  findByMonth(data:any): Observable<any> {
    console.log(data);
    return this.http.post(`${baseUrl}/eventos/obtenerEventosXMes`, data);
  }
}
