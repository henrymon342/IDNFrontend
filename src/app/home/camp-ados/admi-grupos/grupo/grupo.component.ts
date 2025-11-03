import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Grupo } from '../../../../core/models/grupo';
import {MatRippleModule} from '@angular/material/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OperacionesGrupoComponent } from '../../operaciones-grupo/operaciones-grupo.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditarGrupoComponent } from '../../editar-grupo/editar-grupo.component';
import { ConfirmModel } from '../../../../core/models/confirmModel';
import { ConfirmDialog } from '../../../../shared/confirmDialog/confirm-dialog';
import { GroupService } from '../../../../core/services/grupo.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatRippleModule, MatIconModule, MatButtonModule],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.scss'
})
export class GrupoComponent implements OnInit {
   @Input() grupo?: Grupo;
   @Output() hasDeleted = new EventEmitter<boolean>();
  title = 'grupo-frontend';

  public points = [];
  public cards = [];

  isChanged:boolean = false;

  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _dialog = inject(MatDialog);
  private readonly _groupService = inject(GroupService);
  private readonly _toastService = inject(ToastService);

  constructor() {}

  ngOnInit(): void {
    console.log(this.grupo);
    if (this.grupo !== undefined) {
      console.log(this.grupo);
      const cardsArr = this.grupo.cards.replace(/\"/g, '"')
      console.log('Objeto JSON:', JSON.parse(cardsArr));
      this.cards = JSON.parse(cardsArr);
      const pointsArr = this.grupo.points
      // console.log('Objeto JSON:', JSON.parse(pointsArr));
      // this.points = JSON.parse(pointsArr);
      // this.points = JSON.parse(this.grupo!.points);
      // this.cards = JSON.parse(this.grupo!.cards);
    }
  }

  public openBottomSheet(): void {
    console.log(this.grupo?.groupId);
    const ref = this._bottomSheet.open(OperacionesGrupoComponent, {
      data: this.grupo
    });
    ref.afterDismissed().subscribe((result: any) => {
      console.log('BottomSheet cerrado', result);
      // if(result.grupoCreado){
      //   // this.getGroups();
      // }
    });
  }

  public openEditGroup(){
    // Dialog
    const dialogRef = this._dialog.open(EditarGrupoComponent, {
      data: {isChanged: this.isChanged, id : this.grupo?.groupId},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        // this.isChanged.set(result);
      }
    });
  }

  public openDeleteGroup(){
    // modal
    const confirmData: ConfirmModel = {
      title: 'Eliminar Grupo',
      message: 'Esta seguro?'
    };
    this._dialog
      .open(ConfirmDialog, {
        data: confirmData
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.deleteGroup(this.grupo?.groupId);
        }
      });
    }

  deleteGroup(id: any) {
    console.log(id);
    this._groupService.delete(id).subscribe(res =>{
      console.log(res);
      if(res.success){
        this._toastService.success("Eliminado Correctamente!");
        this.hasDeleted.emit(true);
      }else{
        this._toastService.error("Ocurrio algo al eliminar!");
      }
    });
  }


}
