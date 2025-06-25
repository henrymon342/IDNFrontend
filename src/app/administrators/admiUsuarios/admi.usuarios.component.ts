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
import { UsuarioFormComponent } from "./usuarioForm/usuarioForm.component";
import { UserService } from "./user.service";
import { Usuario } from "./Usuario";


@Component({
  selector: 'app-admi-usuarios',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatTabsModule, RouterLink,
    MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatButtonModule, UsuarioFormComponent
  ],
  templateUrl: './admi.usuarios.component.html',
  styleUrl: './admi.usuarios.component.scss'
})
export class AdmiUsuariosComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  public usuarioId: number | undefined;

  LINKS: string[] = ['ACTIVIDADES', 'PASTORES', 'IGLESIAS', 'SUPER'];
  activeLink: string = this.LINKS[0];

  displayedColumns: string[] = [ 'Nro', 'nombre', 'apellido', 'cargo', 'ministerio', 'tipo', 'mas'];
  public dataSource = new MatTableDataSource<Usuario>();

  readonly dialog = inject(MatDialog);
  private adminType:string = 'ACTIVIDADES';
  constructor(private _usuarioService: UserService, private _toastService: ToastService) {
    this.getUsers(this.adminType);
  }

  private getUsers(tipo: string){
    const data = { type: tipo};
    this._usuarioService.getUserByType(data).subscribe( res => {
      console.log(res);
      this.dataSource.data = res.data as Usuario[];
    });
  }

  public onClose(isTransaction: boolean=false){
    console.log("cerrando sidenav...");
    console.log({isTransaction});
    if(isTransaction){
      this.getUsers(this.adminType);
      console.log("uploaded!");
      this.usuarioId = undefined;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openUserForm(id?: number): void{
    this.usuarioId = id;
    this.toggleDrawer();
  }

  private toggleDrawer() {
    this.drawer.toggle();
  }

  public openDeleteUserDialog(id: number){
    const confirmData: ConfirmModel = {
      title: 'Eliminar usuario',
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
          this.deleteUser(id);
        }
      });
  }

  public deleteUser(id: number):void{
    this._usuarioService.delete(id).subscribe(res =>{
      console.log(res);
      this.getUsers(this.adminType);
      this._toastService.success(res.message);
    });
  }

  public onTabClick(nombreTab: string) {
    this.activeLink = nombreTab;
    console.log('Tab clicked:', nombreTab);
    this.getUsers(nombreTab);
  }
}
