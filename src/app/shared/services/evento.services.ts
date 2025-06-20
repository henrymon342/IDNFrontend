import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'  // Servicio disponible en toda la app automáticamente
})
export class EventoService {

  private baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  obtenerEventos(ministerio: { ministerio: string }) {
    return this.http.post<any>(`${this.baseUrl}/eventos/obtenerPorMinisterio`, ministerio);
  }

  obtenerEvento(id: number) {
    return this.http.get<any>(`${this.baseUrl}/eventos/${id}`);
  }
}
