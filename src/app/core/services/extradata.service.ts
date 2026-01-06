import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtradataService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/extradata`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/extradata/${id}`);
  }

  getFirst() {
    return this.http.get<any>(`${this.baseUrl}/extradata/first`);
  }

  create(extradata: any) {
    return this.http.post<any>(`${this.baseUrl}/extradata`, extradata);
  }

  update(id:number, extradata: any) {
    return this.http.put<any>(`${this.baseUrl}/extradata/${id}`, extradata);
  }

  updateFirst(extradata: any) {
    return this.http.post<any>(`${this.baseUrl}/extradata/first`, {ronda:extradata});
  }

  patchingFirst(extradata: any) {
    return this.http.post<any>(`${this.baseUrl}/extradata/patching`, extradata);
}

  delete(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/extradata/${id}`);
  }
}
