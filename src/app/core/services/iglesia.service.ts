import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Iglesia } from '../models/iglesia';



@Injectable({
  providedIn: 'root'
})
export class IglesiaService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  crear(iglesia:Iglesia): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/iglesias`, iglesia);
  }

  obtenerIglesias(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/iglesias`);
  }
  obtenerIglesia(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/iglesias/${id}`);
  }

  actualizarIglesia(id: number, iglesia: Iglesia): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/iglesias/${id}`, iglesia);
  }

  eliminarIglesia(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/iglesias/${id}`);
  }
}
