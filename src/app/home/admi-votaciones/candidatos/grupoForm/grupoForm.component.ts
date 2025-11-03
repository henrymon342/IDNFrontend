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

const ELEMENT_DATA: CandidatoDto[]= [];

@Component({
  selector: 'candidato-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,
    RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatRadioModule, MatDatepickerModule, NgxMatTimepickerModule,
    MatTableModule,MatCheckboxModule,
    MatListModule, MatAutocompleteModule, NgxDropzoneModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './grupoForm.component.html',
  styleUrl: './grupoForm.component.scss'
})
export class GrupoFormComponent {
  private _votanteId?: number;

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
    private bottomSheetRef: MatBottomSheetRef<GrupoFormComponent>,
    private fb: FormBuilder,
    private _toastService:ToastrService
  ) {

    this.createForm();
    this.getCandidatos();
    // console.log('Datos recibidos:', data);
    // if(data != undefined){
    //   this.title = "Modificar"
    //   this.setData();
    // }
  }

  private getCandidatos(){
    this._candidatoService.getAll().subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data as CandidatoDto[];
    });
  }

  private setData(){
    this.form.controls['nombre'].setValue(this.data.nombre);
    this.form.controls['congregacion'].setValue(this.data.congregacion);
    this.form.controls['ministerio'].setValue(this.data.ministerio);
    this.form.controls['cargo'].setValue(this.data.cargo);
    this.form.controls['habilitado'].setValue(this.data.habilitado);
  }

  private createForm(): void{
    this.form = this.fb.group({
      cargo: ['', [Validators.required]],
      cantidad: [1]
    })
  }

  async onSubmit() {
    console.log("entro");
    console.log(this.form.value);
    const ids = this.selection.selected.map(candidato => candidato.id);
    console.log(ids);
    if(this.form.valid){
      this._voletaService.create({
        cargo: this.form.value.cargo,
        porCuantosVotar: this.form.value.cantidad,
        candidatosIds: JSON.stringify(ids)
      }).subscribe( res => {
        console.log(res);
      });
    }
  }

  cerrar(operacion: boolean) {
    this.bottomSheetRef.dismiss({ resultado: operacion });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
