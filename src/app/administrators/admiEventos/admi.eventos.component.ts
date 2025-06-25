import { CommonModule } from "@angular/common";
import { Component, inject, signal, ViewChild } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { Evento } from "../../core/models/evento";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from "@angular/material/button";
import { EventoFormComponent } from "./eventoForm/eventoForm.component";
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from "../../shared/confirmDialog/confirm-dialog";
import { ConfirmModel } from '../../core/models/confirmModel';
import { EventoService } from "../../core/services/evento.service";
import { ToastService } from "../../core/services/toast.service";

@Component({
  selector: 'app-admi-eventos',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatIconModule, RouterLink, MatSidenavModule, MatButtonModule,
    EventoFormComponent, MatTabsModule],
  templateUrl: './admi.eventos.component.html',
  styleUrl: './admi.eventos.component.scss'
})
export class AdmiEventosComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  public eventoId: number | undefined;

  LINKS: string[] = ['JNI', 'MNI', 'DNI', 'OTROS'];
  activeLink: string = this.LINKS[0];

  displayedColumns: string[] = [ 'Nro', 'titulo', 'modalidad', 'fecha', 'hora', 'mas'];
  public dataSource = new MatTableDataSource<Evento>();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  readonly dialog = inject(MatDialog);
  readonly isConfirmed = signal(false);
  constructor(private _eventosService: EventoService, private _toastService: ToastService) {
    this.getEvents('JNI');
  }

  private getEvents(nnombreMinisterio: string):void{
    const type_minister = { ministerio: nnombreMinisterio}
    this._eventosService.obtenerEventos(type_minister).subscribe( res => {
      console.log(res);
      this.dataSource.data = res.data as Evento[];
    })
  }

  public openEventoForm(id?: number): void{
    this.eventoId = id;
    this.toggleDrawer();
  }

  public openDeleteEventDialog(id: number){
    const confirmData: ConfirmModel = {
      title: 'Eliminar evento',
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
          this.deleteEvent(id);
        }
      });
  }

  public deleteEvent(id: number):void{
    this._eventosService.eliminarEvento(id).subscribe(res =>{
      console.log(res);
      this.getEvents(this.activeLink);
      this._toastService.success(res.message);
    });
  }

  private toggleDrawer() {
    this.drawer.toggle();
  }

  onTabClick(nombreTab: string) {
    this.activeLink = nombreTab;
    console.log('Tab clicked:', nombreTab);
    this.getEvents(nombreTab);
  }

  public onClose(isTransaction: boolean=false){
    console.log("cerrando sidenav...");
    console.log({isTransaction});
    if(isTransaction){
      this.getEvents(this.activeLink);
      console.log("uploaded!");
    }
  }
}
