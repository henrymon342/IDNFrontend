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
  templateUrl: './codigoForm.component.html',
  styleUrl: './codigoForm.component.scss'
})
export class CodigoFormComponent {
  private _codeId?: number;

  @Output() closeDrawer = new EventEmitter<boolean>();
  @Input()
  set codeId(value: number | undefined) {
    this._codeId = value;
    if (value !== undefined) {
      // this.loadPastor(value);
      this.title = "Modificar";
    }else{
      this.title = "Adicionar";
    }
  }

  get codeId(): number | undefined {
    return this._codeId;
  }

  public title: string;
  public form!: FormGroup;
  private readonly _votanteService = inject(VotanteService);
  private readonly dialog = inject(MatDialog);
  private readonly _codigoService = inject(CodigoService);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<CodigoFormComponent>,
    private fb: FormBuilder,
    private _toastService:ToastrService
  ) {
    this.createForm();
    if(data != undefined){
      console.log('Datos recibidos:', data);
      this.title = "Modificar"
      this.setData();
    }
  }

  private setData(){
    this.form.controls['code'].setValue(this.data.code);
    this.form.controls['available'].setValue(this.data.available);
  }

  private createForm(): void{
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      available: [false, []]
    })
  }

  async onSubmit() {
    if(this.form.valid){
      if(this.title == "Modificar"){
        this._codigoService.update(this.data.id, this.form.value).subscribe(res => {
          console.log(res);
          this.cerrar(true);
        });
      }else{
        console.log('Formulario enviado:', this.form.value);
        this._codigoService.create(this.form.value).subscribe(res => {
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
