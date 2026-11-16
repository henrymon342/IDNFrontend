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
import { CodigoFormComponent } from './codigoForm/codigoForm.component';
import { VotanteService } from '../../../core/services/votante.service';
import { ToastService } from '../../../core/services/toast.service';
import { CodigoService } from '../../../core/services/codigo.service';
import { ColumnDataCsv } from '../../../core/models/columnDataCsv';
import { Codigo } from '../../../core/models/codigo';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatFormFieldModule, MatInputModule,
    MatIconModule, ReactiveFormsModule, ColorPickerModule, MatButtonModule, MatSidenavModule,
    MatTableModule, MatButtonModule, CodigoFormComponent ],
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.scss'
})
export class CodigoComponent {
  @ViewChild('drawer') drawer!: MatSidenav;


  public votanteId: number | undefined;
  public columnCsv: ColumnDataCsv = new ColumnDataCsv();

  displayedColumns: string[] = [ 'Nro', 'codigo', 'estado', 'mas'];
  public dataSource = new MatTableDataSource<Codigo>();

  private readonly dialog = inject(MatDialog);
  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _codigoService = inject(CodigoService);
  private readonly _toastService = inject(ToastService);

  constructor(){
    this.getCodigos();
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
    this._codigoService.delete(id).subscribe(res =>{
      console.log(res);
      this.getCodigos();
      this._toastService.success(res.message);
    });
  }


  public openVotanteForm(data: any = undefined): void {
    const ref = this._bottomSheet.open(CodigoFormComponent, {
      data: data
    });
    ref.afterDismissed().subscribe((result: any) => {
      console.log('BottomSheet cerrado', result);
      if(result != undefined && result.resultado == true){
        this.getCodigos();
      }
    });
  }

  private getCodigos(){
    this._codigoService.getAll().subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data as Codigo[];
    });
  }

  public downloadData(){
    // const dialogRef = this.dialog.open(ColumnDataDialog, {
    //   data: this.columnCsv,
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if(result){
    //     this.columnCsv = result;
    //     this.generateCSV(this.columnCsv);
    //   }
    //   console.log(this.columnCsv);
    // });
  }

  // private generateCSV(csvdata:any){
  //   this._codigoService.generateCsv(csvdata).subscribe(res =>{
  //     console.log(res.data);
  //     if(res.data){
  //       this.descargarCSV(res.data, 'votantes.csv');
  //     }
  //   })
  // }

 descargarCSV(csvData: string, fileName: string = 'exportacion.csv'): void {
    // 1. El BOM (Byte Order Mark) permite que Excel reconozca tildes y eñes (UTF-8)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvData], { type: 'text/csv;charset=utf-8;' });

    // 2. Crear un link oculto en el DOM
    const link = document.createElement('a');

    // 3. Crear la URL del objeto Blob
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';

      // 4. Añadir, hacer clic y remover
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 5. Limpiar la memoria
      URL.revokeObjectURL(url);
    }
  }
}
