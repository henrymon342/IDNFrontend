import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'  // Servicio disponible en toda la app automáticamente
})
export class AuthService {

  private baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials).pipe(
      map((resp) => {
        console.log(resp);
        // localStorage.setItem('token', resp.token);
        return resp;
      })
    );
  }
}
