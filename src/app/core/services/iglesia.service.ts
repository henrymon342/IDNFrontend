import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class IglesiaService {

  constructor(private http: HttpClient) { }

  // getAll(): Observable<Iglesia[]> {
  //   return this.http.get<Iglesia[]>(baseUrl);
  // }

  // get(id: any): Observable<Iglesia> {
  //   return this.http.get<Iglesia>(`${baseUrl}/${id}`);
  // }

  // create(data: any): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  // findByTitle(title: any): Observable<Iglesia[]> {
  //   return this.http.get<Iglesia[]>(`${baseUrl}?title=${title}`);
  // }
//////////////////

create(data:any): Observable<any> {
  return this.http.post(`${baseUrl}/iglesias`, data);
}

getAll() {
  return this.http.get(`${baseUrl}/iglesias`);
}
get(id: any): Observable<any> {
  return this.http.get(`${baseUrl}/iglesias/${id}`);
}

update(id: number, data: any): Observable<any> {
  return this.http.put(`${baseUrl}/iglesias/${id}`, data);
}
delete(id: any): Observable<any> {
  return this.http.delete(`${baseUrl}/iglesias/${id}`);
}

getByCategory(data:any): Observable<any> {
  return this.http.post(`${baseUrl}/iglesias/findByCategory`, data);
}
}
