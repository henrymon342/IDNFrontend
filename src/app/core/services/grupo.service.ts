import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/group`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/group/${id}`);
  }

  create(group: any) {
    return this.http.post<any>(`${this.baseUrl}/group`, group);
  }

  update(id:number, group: any) {
    return this.http.put<any>(`${this.baseUrl}/group/${id}`, group);
  }

  delete(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/group/${id}`);
  }
}
