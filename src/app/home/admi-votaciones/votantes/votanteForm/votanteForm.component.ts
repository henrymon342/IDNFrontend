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
import { CodigoService } from "../../../../core/services/codigo.service";

@Component({
  selector: 'votante-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,
    RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatRadioModule, MatDatepickerModule, NgxMatTimepickerModule,
    MatListModule, MatAutocompleteModule, NgxDropzoneModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './votanteForm.component.html',
  styleUrl: './votanteForm.component.scss'
})
export class VotanteFormComponent {
  private _votanteId?: number;

  @Output() closeDrawer = new EventEmitter<boolean>();
  // @Input()
  // set votanteId(value: number | undefined) {
  //   this._votanteId = value;
  //   if (value !== undefined) {
  //     // this.loadPastor(value);
  //     this.title = "Modificar";
  //   }else{
  //     this.title = "Adicionar";
  //   }
  // }

  // get votanteId(): number | undefined {
  //   return this._votanteId;
  // }

  public title: string;
  public form!: FormGroup;
  private readonly _votanteService = inject(VotanteService);
  private readonly dialog = inject(MatDialog);
  private readonly _codigoService = inject(CodigoService);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<VotanteFormComponent>,
    private fb: FormBuilder,
    private _toastService:ToastrService
  ) {
    this.createForm();
    this.getAvailableCode(data);
    console.log('Datos recibidos:', data);
    if(data != undefined){
      this.title = "Modificar"
      this.setData();
    }
  }

  private setData(){
    this.form.controls['nombre'].setValue(this.data.nombre);
    this.form.controls['congregacion'].setValue(this.data.congregacion);
    this.form.controls['ministerio'].setValue(this.data.ministerio);
    this.form.controls['cargo'].setValue(this.data.cargo);
    this.form.controls['codigo'].setValue(this.data.codigo);
    this.form.controls['habilitado'].setValue(this.data.habilitado);
  }

  private createForm(): void{
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      congregacion: ['', [Validators.required]],
      ministerio: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      habilitado: [false, [Validators.required]]
    })
  }

  async onSubmit() {
    if(this.form.valid){
      if(this.title == "Modificar"){
        this._votanteService.update(this.data.id, this.form.value).subscribe(res => {
          console.log(res);
          this.cerrar(true);
        });
      }else{
        console.log('Formulario enviado:', this.form.value);
        this._votanteService.create(this.form.value).subscribe(res => {
          console.log(res);
          const available = true;
          this.form.controls['codigo'].setValue(res.data.codigo);
          this._codigoService.changeCode(res.data.codigo, available).subscribe(res => {
            console.log(res);

          });
          this.cerrar(true);
        });
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

  cerrar(operacion: boolean) {
    this.bottomSheetRef.dismiss({ resultado: operacion });
  }


  private getAvailableCode(data1: any){
    if(data1 == undefined){
      this._codigoService.getAvailableCode().subscribe(res => {
        console.log(res);
        this.form.controls['codigo'].setValue(res.data.code);

      });
    }
  }
}
