import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Votante } from '../../../core/models/votante';
import { ConfirmModel } from '../../../core/models/confirmModel';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/confirmDialog/confirm-dialog';
import { VotanteFormComponent } from './votanteForm/votanteForm.component';
import { VotanteService } from '../../../core/services/votante.service';
import { ToastService } from '../../../core/services/toast.service';
import { CodigoService } from '../../../core/services/codigo.service';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatFormFieldModule, MatInputModule,
    MatIconModule, ReactiveFormsModule, ColorPickerModule, MatButtonModule, MatSidenavModule,
    MatTableModule, MatButtonModule, VotanteFormComponent ],
  templateUrl: './votantes.component.html',
  styleUrl: './votantes.component.scss'
})
export class VotantesComponent {
  @ViewChild('drawer') drawer!: MatSidenav;


  public votanteId: number | undefined;

  displayedColumns: string[] = [ 'Nro', 'nombre', 'congregacion', 'ministerio', 'cargo', 'codigo', 'habilitado', 'mas'];
  public dataSource = new MatTableDataSource<Votante>();

  private readonly dialog = inject(MatDialog);
  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _votanteService = inject(VotanteService);
  private readonly _toastService = inject(ToastService);

  constructor(){
    this.getVotantes();
  }



  public onClose(isTransaction: boolean=false){
    console.log("cerrando sidenav...");
    console.log({isTransaction});
    if(isTransaction){
      // this.obtenerPastores();
      console.log("uploaded!");
    }
    // this.pastorId = undefined;
  }

  public openChurchForm(id?: number): void{
    // this.pastorId = id;
    this.drawer.toggle();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDeleteDelegadoDialog(id: number){
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
            this.deleteDelegado(id);
          }
        });
    }

  private deleteDelegado(id: number ){
    this._votanteService.delete(id).subscribe(res =>{
      console.log(res);
      this.getVotantes();
      this._toastService.success(res.message);
    });
  }


  public openVotanteForm(data: any = undefined): void {
    const ref = this._bottomSheet.open(VotanteFormComponent, {
      data: data
    });
    ref.afterDismissed().subscribe((result: any) => {
      console.log('BottomSheet cerrado', result);
      if(result != undefined && result.resultado == true){
        this.getVotantes();
      }
    });
  }

  private getVotantes(){
    this._votanteService.getAll().subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data as Votante[];
    });
  }

}
