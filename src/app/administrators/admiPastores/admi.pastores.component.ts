import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmModel } from '../../core/models/confirmModel';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialog } from "../../shared/confirmDialog/confirm-dialog";
import { ToastService } from "../../core/services/toast.service";
import { PastorFormComponent } from "./pastorForm/pastorForm.component";
import { Pastor } from "../../core/models/pastor";
import { PastorService } from "../../core/services/pastor.service";


@Component({
  selector: 'app-admi-pastores',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatTabsModule, RouterLink,
    MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatButtonModule, PastorFormComponent
  ],
  templateUrl: './admi.pastores.component.html',
  styleUrl: './admi.pastores.component.scss'
})
export class AdmiPastoresComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  public pastorId: number | undefined;

  displayedColumns: string[] = [ 'Nro', 'name', 'category', 'area', 'membresia', 'lugardeministerio', 'mas'];
  public dataSource = new MatTableDataSource<Pastor>();

  readonly dialog = inject(MatDialog);
  readonly _toastService = inject(ToastService);
  readonly _pastorService = inject(PastorService);
  constructor() {
    this.obtenerPastores();
  }

  private obtenerPastores(){
    this._pastorService.getAllPastors().subscribe({
      next: (res:any) => {
        console.log(res.data)
        this.dataSource.data = res.data.sort(
          function (a:any, b:any) {
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            else
                return 0;
        });
      },
      error: (err) =>{
        console.log(err.message);
      }
    });
  }

  public onClose(isTransaction: boolean=false){
    console.log("cerrando sidenav...");
    console.log({isTransaction});
    if(isTransaction){
      this.obtenerPastores();
      console.log("uploaded!");
    }
    this.pastorId = undefined;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openChurchForm(id?: number): void{
    this.pastorId = id;
    this.drawer.toggle();
  }

  public openDeletePastorDialog(id: number){
    const confirmData: ConfirmModel = {
      title: 'Eliminar pastor',
      message: 'Esta seguro?'
    };
    this.dialog
      .open(ConfirmDialog, {
        data: confirmData
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.deletePastor(id);
        }
      });
  }

  public deletePastor(id: number):void{
    this._pastorService.delete(id).subscribe(res =>{
      console.log(res);
      this.obtenerPastores();
      this._toastService.success(res.message);
    });
  }
}
