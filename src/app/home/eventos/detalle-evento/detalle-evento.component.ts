import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Evento } from '../../../core/models/evento';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.scss'
})
export class DetalleEventoComponent {
  public evento: Evento;
  public hasFinished = false;
  public estadoEvento = '';
  public ENCARGADOS: string[] = [];

  day: any;
  hours: any;
  minutes: any;
  seconds: any;
}
