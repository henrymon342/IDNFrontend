import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Evento } from '../../../core/models/evento';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})
export class EventoComponent {
  @Input() evento: Evento;

  public hasFinished: boolean = false;

  constructor(public dialog: MatDialog){

  }

  seeDetail(evento: Evento): void{
    console.log(evento);
    this.openDialog('3000ms', '1500ms', evento)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, evento: Evento): void {
    const parametros = {
      width: '90vw',
      enterAnimationDuration,
      exitAnimationDuration,
      data: evento,
      panelClass: 'dialog',
      maxHeight: '90vh'
    };
    // this.dialog.open(DetailEventComponent, parametros );
  }

  asignarColor(){
    if( this.evento.ministerio == 'JNI' ){
      return { 'background-image': "linear-gradient(0deg, rgba(254,208,73) 0%, rgba(254,208,73) 100%)" };
    }
    if( this.evento.ministerio == 'MNI' ){
      return { 'background-image': "linear-gradient(0deg, rgb(31, 138, 112) 0%,  rgb(31, 138, 112) 100%)" };
    }
    if( this.evento.ministerio == 'DNI' ){
    return { 'background-image': "linear-gradient(0deg, rgb(0, 66, 90) 0%, rgb(0, 66, 90) 100%)" };
    }
    return { 'background-image': "linear-gradient(0deg, rgb(155, 25, 51) 0%, rgb(255, 45, 87) 100%)" };
  }
}
