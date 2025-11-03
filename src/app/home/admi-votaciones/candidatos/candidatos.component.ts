import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';
import { Candidato } from '../../../core/models/candidato';
import { ToastService } from '../../../core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmModel } from '../../../core/models/confirmModel';
import { ConfirmDialog } from '../../../shared/confirmDialog/confirm-dialog';
import { CandidatoService } from '../../../core/services/candidato.service';
import { CandidatoFormComponent } from './candidatoForm/candidatoForm.component';
import { GrupoFormComponent } from './grupoForm/grupoForm.component';
import { VoletaComponent } from './voleta/voleta.component';
import { ExtradataService } from '../../../core/services/extradata.service';
import { RondaDialog } from './rondaDialog/rondaDialog.component';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatFormFieldModule, MatInputModule,
    MatIconModule, ReactiveFormsModule, ColorPickerModule, MatButtonModule, MatTableModule ],
  templateUrl: './candidatos.component.html',
  styleUrl: './candidatos.component.scss'
})
export class CandidatosComponent {

  ronda: number = null!;

  public displayedColumns: string[] = [ 'Nro', 'nombre', 'congregacion', 'ministerio', 'cargo', 'habilitado', 'mas'];
  public dataSource = new MatTableDataSource<Candidato>();

  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _candidatoService = inject(CandidatoService);
  private readonly _extradataService = inject(ExtradataService);
  private readonly _toastService = inject(ToastService);
  private readonly dialog = inject(MatDialog);
  constructor(){
    this.getCandidatos();
    this.getRonda();

  }

  private getRonda(){
    this._extradataService.getFirst().subscribe(res => {
      console.log(res);
      this.ronda = res.data.ronda;
    });
  }

  private getCandidatos(){
    this._candidatoService.getAll().subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data as Candidato[];
    });
  }

  public openCandidatoForm(data: any = undefined): void {
    const ref = this._bottomSheet.open(CandidatoFormComponent, {
      data: data
    });
    ref.afterDismissed().subscribe((result: any) => {
      console.log('BottomSheet cerrado', result);
      if(result != undefined && result.resultado == true){
        this.getCandidatos();
      }
    });
  }

  public openAddGrupoForm(data: any = undefined): void {
    const ref = this._bottomSheet.open(GrupoFormComponent, {
      data: data,
      panelClass: 'custom-bottom-sheet'
    });
    ref.afterDismissed().subscribe((result: any) => {
      console.log('BottomSheet cerrado', result);
      if(result != undefined && result.resultado == true){
        // this.getVotantes();
      }
    });
  }

  public openVoletaForm(data: any = undefined): void {
    const ref = this._bottomSheet.open(VoletaComponent);
    ref.afterDismissed().subscribe((result: any) => {
      console.log('BottomSheet cerrado', result);
    });
  }


  public openDeleteCandidatoDialog(id: number){
    const confirmData: ConfirmModel = {
      title: 'Eliminar Delegado',
      message: 'Esta seguro?'
    };
    this.dialog
      .open(ConfirmDialog, {
        data: confirmData
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.deleteCandidato(id);
        }
      });
  }

  private deleteCandidato(id: number ){
    this._candidatoService.delete(id).subscribe(res =>{
      console.log(res);
      this.getCandidatos();
      this._toastService.success(res.message);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openChangeRondaDialog() {
    const dialogRef = this.dialog.open(RondaDialog, {
      restoreFocus: false,
      panelClass: 'custom',
      data: { ronda: this.ronda }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del diálogo:', result);
        this.ronda = result.ronda
      }
    });
  }
}
