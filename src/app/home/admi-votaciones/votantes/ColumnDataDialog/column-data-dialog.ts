import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ColumnDataCsv } from "../../../../core/models/columnDataCsv";
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'column-data-dialog',
  templateUrl: 'column-data-dialog.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCheckboxModule
  ],
})
export class ColumnDataDialog {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ColumnDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnDataCsv,
  ) {
    console.log(this.data);
    console.log(this.data.nombre);

    this.form = this.fb.group({
      nombre: [this.data.nombre],
      congregacion: [this.data.congregacion],
      ministerio: [this.data.ministerio],
      cargo: [this.data.cargo],
      codigo: [this.data.codigo]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
