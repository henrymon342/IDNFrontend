import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  createGroup(grupo: any) {
    return this.http.post<any>(`${this.baseUrl}/group`, grupo);
  }

  getAllGroups() {
    return this.http.get<any>(`${this.baseUrl}/group`);
  }

  getGroup(id: number) {
    return this.http.get<any>(`${this.baseUrl}/group/${id}`);
  }

  updateGroup(id:number, group: any) {
    return this.http.put<any>(`${this.baseUrl}/group/${id}`, group);
  }

  deleteGroup(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/group/${id}`);
  }
}
