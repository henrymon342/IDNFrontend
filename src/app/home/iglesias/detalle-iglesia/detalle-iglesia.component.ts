import { Component, Inject, OnInit } from '@angular/core';
import { Iglesia } from '../../../core/models/iglesia';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IglesiaService } from '../../../core/services/iglesia.service';

@Component({
  selector: 'app-detalle-iglesia',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './detalle-iglesia.component.html',
  styleUrl: './detalle-iglesia.component.scss'
})
export class DetalleIglesiaComponent implements OnInit{
  public iglesia: Iglesia = new Iglesia();
  public pastorname: string = '';
  public imagePathPas: string = '';
  public imagePath: string = '';

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _iglesiaService: IglesiaService,
              // private toastService: ToastService
            ) {
    this.pastorname = data.pastorname;
    this.imagePath = data.imagePath;
    this.imagePathPas = data.imagePathPas;
    this.iglesia = data;
  }

  ngOnInit(): void {
    this.getChurch(this.data.id);
  }

  getChurch(idChurch: number): void{
    console.log(idChurch);
    this._iglesiaService.get(idChurch).subscribe({
      next: (res:any) => {
        console.log(res.data.iglesia);
        this.iglesia = res.data.iglesia as Iglesia;
      },
      error: (err) =>{
        console.log(err);
        // this.toastService.mostrarNotificacion(err.message, 'info', 'top-end')
      }
    });
    // this._churchService.get(idChurch).subscribe( res =>{
    //   this.iglesia = res as Iglesia;
    // });
  }


  calcAnios(fundation: string){
    console.log(fundation);
    const now = new Date();
    const date = new Date(fundation);

    const diffInDays = Math.floor((Number(now) - Number(date)) / (1000 * 60 * 60 * 24));
    console.log(diffInDays);
    return Math.floor(diffInDays/365)+1;
  }
}
