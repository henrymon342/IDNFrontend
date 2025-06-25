import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDNConstants } from '../../shared/constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.URL;

  constructor( private http: HttpClient) { }

  createUser( user: any ): Observable<any> {
      return this.http.post(`${this.baseUrl}/administrador`, user);
  }

  get(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/administrador/${id}`);
  }

  getUserByType(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/administrador/obtenerUsuariosXTipo`, data);
  }

  update(id: number, data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/administrador/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/administrador/${id}`);
  }
}
