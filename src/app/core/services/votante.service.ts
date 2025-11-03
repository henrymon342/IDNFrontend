import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotanteService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/votante`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/votante/${id}`);
  }

  getByCode(code: string){
    return this.http.get<any>(`${this.baseUrl}/votante/bycode/${code}`);
  }

  create(votante: any) {
    return this.http.post<any>(`${this.baseUrl}/votante`, votante);
  }

  update(id:number, votante: any) {
    return this.http.put<any>(`${this.baseUrl}/votante/${id}`, votante);
  }

  delete(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/votante/${id}`);
  }
}
