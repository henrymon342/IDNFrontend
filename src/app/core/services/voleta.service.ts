import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoletaService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/voleta`);
  }

  getWithIds() {
    return this.http.get<any>(`${this.baseUrl}/voleta/with-ids`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/voleta/${id}`);
  }

  create(voleta: any) {
    return this.http.post<any>(`${this.baseUrl}/voleta`, voleta);
  }

  update(id:number, voleta: any) {
    return this.http.put<any>(`${this.baseUrl}/voleta/${id}`, voleta);
  }

  delete(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/voleta/${id}`);
  }

  deleteDataVoleta(value:boolean) {
    return this.http.post<any>(`${this.baseUrl}/voleta/delete`, {value: value});
  }
}
