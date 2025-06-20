import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

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

  uploadImage( data: any ): Observable<any>{
    return this.http.post(`${baseUrl}/create`, data );
  }

  getPrueba(){
    return this.http.get(`${baseUrl}/images/prueba`);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/files`);
  }


  createImage( data: any ): Observable<any> {
    return this.http.post(`${baseUrl}/image/`, data);
  }

  get(id:number): Observable<any> {
  return this.http.get(`${baseUrl}/image/${id}`);
  }

  update(id: number, data: any ): Observable<any> {
  return this.http.put(`${baseUrl}/image/update/${id}`, data);
  }

  delete(id: number): Observable<any> {
  return this.http.delete(`${baseUrl}/image/${id}`);
  }

  getImage(id:number): Observable<any> {
    return this.http.get(`${baseUrl}/image/getimage/${id}`);
  }
}
