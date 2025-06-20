import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { EventoService } from "../../shared/services/evento.services";
import { Evento } from "../../shared/models/evento";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from "@angular/material/button";
import { EventoFormComponent } from "./eventoForm/eventoForm.component";

@Component({
  selector: 'app-admi-eventos',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatIconModule, RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    EventoFormComponent],
  templateUrl: './admi.eventos.component.html',
  styleUrl: './admi.eventos.component.scss'
})
export class AdmiEventosComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  public eventoId: number | undefined;

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = [ 'Nro', 'titulo', 'modalidad', 'fecha', 'hora', 'mas'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  public dataSource = new MatTableDataSource<Evento>();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _eventosService: EventoService) {
    this.getEvents();
  }

  private getEvents():void{
    const type_minister = { ministerio: 'JNI'}
    this._eventosService.obtenerEventos(type_minister).subscribe( res => {
      console.log(res);
      this.dataSource.data = res.data as Evento[];
    })
  }

  public openEventoForm(id?: number): void{
    this.eventoId = id;
    this.toggleDrawer();
  }

  public deleteEvent(id: number):void{
    console.log(id);
  }

  private toggleDrawer() {
    this.drawer.toggle();
  }
}
