import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLink } from "@angular/router";
import { Iglesia } from '../../core/models/iglesia';
import { MatButtonModule } from "@angular/material/button";
import { IglesiaService } from "../../core/services/iglesia.service";
import { IglesiaFormComponent } from "./iglesiaForm/iglesiaForm.component";
import { ConfirmModel } from '../../core/models/confirmModel';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialog } from "../../shared/confirmDialog/confirm-dialog";
import { ToastService } from "../../core/services/toast.service";


@Component({
  selector: 'app-admi-iglesias',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatTabsModule, RouterLink,
    MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatButtonModule, IglesiaFormComponent
  ],
  templateUrl: './admi.iglesias.component.html',
  styleUrl: './admi.iglesias.component.scss'
})
export class AdmiIglesiasComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  public iglesiaId: number | undefined;

  displayedColumns: string[] = [ 'Nro', 'nombre', 'zona', 'pastor', 'fundacion', 'mas'];
  public dataSource = new MatTableDataSource<Iglesia>();

  readonly dialog = inject(MatDialog);
  constructor(private _iglesiaService: IglesiaService, private _toastService: ToastService) {
    this.getAllChurchs();
  }

  private getAllChurchs(){
    this._iglesiaService.obtenerIglesias().subscribe( res => {
      console.log(res);
      this.dataSource.data = res.data as Iglesia[];
    });
  }

  public onClose(isTransaction: boolean=false){
    console.log("cerrando sidenav...");
    console.log({isTransaction});
    if(isTransaction){
      this.getAllChurchs();
      console.log("uploaded!");
      this.iglesiaId = undefined;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openChurchForm(id?: number): void{
    this.iglesiaId = id;
    this.toggleDrawer();
  }

  private toggleDrawer() {
    this.drawer.toggle();
  }

  public openDeleteChurchDialog(id: number){
    const confirmData: ConfirmModel = {
      title: 'Eliminar iglesia',
      message: 'Esta seguro?'
    };
    this.dialog
      .open(ConfirmDialog, {
        data: confirmData
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          // eliminar
          this.deleteChurch(id);
        }
      });
  }

  public deleteChurch(id: number):void{
    this._iglesiaService.eliminarIglesia(id).subscribe(res =>{
      console.log(res);
      this.getAllChurchs();
      this._toastService.success(res.message);
    });
  }
}
