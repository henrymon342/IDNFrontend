import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/votacion`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/votacion/${id}`);
  }

  create(votacion: any) {
    return this.http.post<any>(`${this.baseUrl}/votacion`, votacion);
  }

  consulta(data: any) {
    return this.http.post<any>(`${this.baseUrl}/votacion/consulta`, data);
  }

  update(id:number, votacion: any) {
    return this.http.put<any>(`${this.baseUrl}/votacion/${id}`, votacion);
  }

  delete(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/votacion/${id}`);
  }
}
