import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GrupoComponent } from './grupo/grupo.component';
import { Grupo } from '../../../core/models/grupo';
import { GroupService } from '../../../core/services/grupo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { CrearGrupoComponent } from '../crear-grupo/crear-grupo.component';
import { ToastService } from '../../../core/services/toast.service';
import { ComunicationService } from '../../../core/services/comunication.service';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GrupoComponent, MatIconModule, MatSidenavModule,
    MatButtonModule, MatBottomSheetModule],
  templateUrl: './admi-grupos.component.html',
  styleUrl: './admi-grupos.component.scss'
})
export class AdmiGruposComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  public grupoId: number | undefined;

  public grupo: Grupo
  public grupos: Grupo[]
  hasChangedCard: boolean = false;

  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _groupService = inject(GroupService);
  private readonly _toastService = inject(ToastService);

  constructor(private _comunication: ComunicationService) {
    this.getGroups();
  }

   ngOnInit(): void {
    this._comunication.mensajeActual$.subscribe(m => {
      this.hasChangedCard = m;
      console.log(m);
      // this.getGroups();

    });
  }

  getGroups() {
    this._groupService.getAll().subscribe( res => {
      console.log(res);
      if(res.success){
        this.grupos = res.data as Grupo[]
      }else{
        this._toastService.error(res.data);
      }
    });
  }

  public openEventoForm(id?: number): void{
    this.grupoId = id;
    this.toggleDrawer();
  }

  private toggleDrawer() {
    this.drawer.toggle();
  }

  public onClose(isTransaction: boolean=false){
    console.log("cerrando sidenav...");
    console.log({isTransaction});
    if(isTransaction){
      // this.getEvents(this.activeLink);
      console.log("uploaded!");
    }
  }

  public onDelete(isTransaction: boolean=false){
    console.log(isTransaction);
    if(isTransaction){
      this.getGroups();
    }
  }

  public openBottomSheet(): void {
    const ref = this._bottomSheet.open(CrearGrupoComponent);
    ref.afterDismissed().subscribe((result: any) => {
      console.log('BottomSheet cerrado', result);
      if(result.grupoCreado){
        this.getGroups();
      }
    });
  }
}
