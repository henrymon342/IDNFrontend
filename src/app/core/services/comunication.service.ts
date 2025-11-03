import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private mensajeFuente = new BehaviorSubject<boolean>(false); // Estado inicial
  mensajeActual$ = this.mensajeFuente.asObservable(); // Observable público

  cambiarMensaje(nuevoMensaje: boolean) {
    this.mensajeFuente.next(nuevoMensaje);
  }
}
