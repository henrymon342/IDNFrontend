import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
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
import { MatTableModule} from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CandidatoService } from "../../../../core/services/candidato.service";

@Component({
  selector: 'candidato-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,
    RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatRadioModule, MatDatepickerModule, NgxMatTimepickerModule,
    MatListModule, MatAutocompleteModule, NgxDropzoneModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './candidatoForm.component.html',
  styleUrl: './candidatoForm.component.scss'
})
export class CandidatoFormComponent {
  private _votanteId?: number;

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
  readonly _candidatoService = inject(CandidatoService);

  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<CandidatoFormComponent>,
    private fb: FormBuilder,
    private _toastService:ToastrService
  ) {

    this.createForm();
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
    this.form.controls['habilitado'].setValue(this.data.habilitado);
  }

  private createForm(): void{
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      congregacion: ['', [Validators.required]],
      ministerio: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      habilitado: [false, [Validators.required]]
    })
  }

  async onSubmit() {
    console.log("entro");
    console.log(this.form.value);

    if(this.form.valid){
      console.log("entro valid");
      if(this.title == "Modificar"){
        this._candidatoService.update(this.data.id, this.form.value).subscribe(res => {
          console.log(res);
          this.cerrar(true);
        });
      }else{
        console.log("entro invalid");
        console.log('Formulario enviado:', this.form.value);
        this._candidatoService.create(this.form.value).subscribe(res => {
          console.log(res);
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
}
