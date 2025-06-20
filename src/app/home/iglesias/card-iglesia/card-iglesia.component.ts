import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Iglesia } from '../../../core/models/iglesia';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { DetalleIglesiaComponent } from '../detalle-iglesia/detalle-iglesia.component';

@Component({
  selector: 'app-card-iglesia',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './card-iglesia.component.html',
  styleUrl: './card-iglesia.component.scss'
})
export class CardIglesiaComponent {
  @Input() idchurch: number;
  @Input() church: string;
  @Input() zona: string;
  @Input() idPastor: number;
  @Input() diacentral: string;
  @Input() horacentralini: string;
  @Input() horacentralfin: string;
  @Input() diajni: string;
  @Input() horajniini: string;
  @Input() horajnifin: string;
  @Input() nombrepastor: string;
  @Input() imgpathpas: string;
  @Input() imgpathchurch: string;

  constructor(public dialog: MatDialog) {

  }


  seeMore():void {
    console.log("entro");

    const iglesia = new Iglesia();
    iglesia.id = this.idchurch;
    iglesia.imagePath = this.imgpathchurch;
    iglesia.pastorname = this.nombrepastor;
    iglesia.imagePathPas = this.imgpathpas;

    this.openDialog('500ms', '500ms', iglesia)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, iglesia: Iglesia): void {
    const parametros = {
      maxWidth: '90vw',
      maxHeight: '95vh',
      width: '95vw',
      height: '95vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data: iglesia,
      panelClass: 'dialog',
    };
    this.dialog.open(DetalleIglesiaComponent, parametros );
  }

}
