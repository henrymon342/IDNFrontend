import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Candidato } from '../../../core/models/candidato';
import { VoletaService } from '../../../core/services/voleta.service';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { ExtradataService } from '../../../core/services/extradata.service';
import { VotacionService } from '../../../core/services/votacion.service';
import { VotanteService } from '../../../core/services/votante.service';
import { ToastService } from '../../../core/services/toast.service';


export interface GrupoVoleta {
  id: number;
  cargo: string;
  candidatosIds: string[];
  porCuantosVotar: number;
  candidatos: Candidato[];
  seleccionado?: Candidato;
}

@Component({
  selector: 'papeleta',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatFormFieldModule, FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatIconModule ],
  templateUrl: './papeleta.component.html',
  styleUrl: './papeleta.component.scss'
})
export class PapeletaComponent implements OnInit {

  public grupos: GrupoVoleta[];
  private voter: any;
  private ronda: any;

  private readonly _localStorageService = inject(LocalStorageService);
  private readonly _voletaService = inject(VoletaService);
  private readonly _votacionService = inject(VotacionService);
  private readonly _extradataService = inject(ExtradataService);
  private readonly _delegadoService = inject(VotanteService);
  readonly _toastService = inject(ToastService);
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.getDatosVoleta();
    this.getExtradata();
  }

  private getExtradata(){
    this._extradataService.getFirst().subscribe(res => {
      console.log(res);
      this.ronda = res.data.ronda;
    });
  }

  private getDatosVoleta(){
    this._voletaService.getWithIds().subscribe(res => {
      this.grupos = res.data as GrupoVoleta[];
      console.log(this.grupos);
      // this.dataSource.data = res.data as CandidatoDto[];
    });
  }

  seleccionar(grupo: GrupoVoleta, candidato: Candidato) {
    grupo.seleccionado = candidato;
  }

  public doVote(){
    console.log("GRUPOS: ", this.grupos);
    this.voter = this._localStorageService.getItem("voter");
    console.log("voter: ", this.voter);
    // this.grupos.forEach(grupo => {
    //   console.log(grupo.seleccionado);
    //   const data = {
    //     idVotante: this.voter.id,
    //     idCandidato: grupo.seleccionado?.id,
    //     ministerio: this.voter.ministerio,
    //     ronda: this.ronda
    //   }
    //   this._votacionService.create(data).subscribe(res => {
    //     console.log(res);
    //   });
    // });

    // this.voter.habilitado = false;
    // console.log(this.voter);

    // this._delegadoService.update(this.voter.id, this.voter).subscribe(res =>{
    //   console.log(res);
    // });

    // this.router.navigate(['/home/votacion/enter-code']);
    this._toastService.success("Usted acaba de realizar su votación");
  }
}
