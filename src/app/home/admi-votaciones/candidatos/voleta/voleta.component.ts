import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from "@angular/material/button";
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { VotanteService } from "../../../../core/services/votante.service";
import { CandidatoService } from "../../../../core/services/candidato.service";
import { CodigoService } from "../../../../core/services/codigo.service";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Candidato } from '../../../../core/models/candidato';
import {SelectionModel} from '@angular/cdk/collections';
import { VoletaService } from "../../../../core/services/voleta.service";

export interface CandidatoDto {
  id: number;
  nombre: string;
  congregacion: string;
  ministerio: string;
  cargo: string;
  completed: boolean;
}

export interface GrupoVoleta {
  id: number;
  cargo: string;
  candidatosIds: string[];
  porCuantosVotar: number;
  candidatos: Candidato[];
  seleccionado?: Candidato;
}

const ELEMENT_DATA: CandidatoDto[]= [];

@Component({
  selector: 'voleta',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,
    RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatRadioModule, MatDatepickerModule, NgxMatTimepickerModule,
    MatTableModule,MatCheckboxModule,
    MatListModule, MatAutocompleteModule, NgxDropzoneModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './voleta.component.html',
  styleUrl: './voleta.component.scss'
})
export class VoletaComponent implements OnInit {
  private _votanteId?: number;

  public grupos: GrupoVoleta[];

  displayedColumns: string[] = ['select', 'nombre', 'congregacion', 'cargo'];
  public dataSource = new MatTableDataSource<CandidatoDto>();
  public selection = new SelectionModel<CandidatoDto>(true, []);

  public title: string;
  public form!: FormGroup;

  readonly _candidatoService = inject(CandidatoService);

  readonly _voletaService = inject(VoletaService);
  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<VoletaComponent>,
    private fb: FormBuilder,
    private _toastService:ToastrService
  ) {

  }
  ngOnInit(): void {
    this.getDatosVoleta();
  }

  private getDatosVoleta(){
    this._voletaService.getWithIds().subscribe(res => {
      this.grupos = res.data as GrupoVoleta[];
      console.log(this.grupos);
      // this.dataSource.data = res.data as CandidatoDto[];
    });
  }

  public doVote(){
    console.log("GRUPOS: ", this.grupos);
  }

  seleccionar(grupo: GrupoVoleta, candidato: Candidato) {
    grupo.seleccionado = candidato;
  }

  borrarDatosVoleta(){
    this._voletaService.deleteDataVoleta(true).subscribe(res => {
      console.log(res);
    });
  }

  cerrar(operacion: boolean) {
    this.bottomSheetRef.dismiss({ resultado: operacion });
  }
}
