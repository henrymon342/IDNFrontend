import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/candidato`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/candidato/${id}`);
  }

  create(candidato: any) {
    return this.http.post<any>(`${this.baseUrl}/candidato`, candidato);
  }

  update(id:number, candidato: any) {
    return this.http.put<any>(`${this.baseUrl}/candidato/${id}`, candidato);
  }

  delete(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/candidato/${id}`);
  }
}
