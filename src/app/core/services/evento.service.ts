import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private readonly baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  obtenerEventos(ministerio: { ministerio: string }) {
    return this.http.post<any>(`${this.baseUrl}/eventos/obtenerPorMinisterio`, ministerio);
  }

  obtenerEvento(id: number) {
    return this.http.get<any>(`${this.baseUrl}/eventos/${id}`);
  }

  crearEvento(ministerio: any) {
    return this.http.post<any>(`${this.baseUrl}/eventos`, ministerio);
  }

  modificarEvento(id:number, ministerio: any) {
    return this.http.put<any>(`${this.baseUrl}/eventos/${id}`, ministerio);
  }

  eliminarEvento(id:number) {
    return this.http.delete<any>(`${this.baseUrl}/eventos/${id}`);
  }

  eventosPorMes(data:any) {
    console.log(data);
    return this.http.post<any>(`${this.baseUrl}/eventos/obtenerEventosXMes`, data);
  }
}
