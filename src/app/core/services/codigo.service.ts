import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/codigo`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/codigo/${id}`);
  }

  create(codigo: any) {
    return this.http.post<any>(`${this.baseUrl}/codigo`, codigo);
  }

  update(id:number, codigo: any) {
    return this.http.put<any>(`${this.baseUrl}/codigo/${id}`, codigo);
  }

  delete(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/codigo/${id}`);
  }

  getAvailableCode() {
    return this.http.get<any>(`${this.baseUrl}/codigo/available`);
  }

  getCode(code: string) {
    return this.http.get<any>(`${this.baseUrl}/codigo/by-code/${code}`);
  }

  changeCode(code: string, available: boolean){
    return this.http.put<any>(`${this.baseUrl}/codigo/change-code/${code}`, {available});
  }

}
