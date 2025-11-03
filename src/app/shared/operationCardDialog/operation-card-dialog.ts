import { Component, Inject, inject, model } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ConfirmModel } from "../../core/models/confirmModel";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'operation-card-dialog',
  standalone: true,
  templateUrl: 'operation-card-dialog.html',
  styleUrl: './operation-card-dialog.scss',
  imports: [ CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule ],
})
export class OperationCardDialog {

  public form!: FormGroup;

  constructor(private fb: FormBuilder, public dialogo: MatDialogRef<OperationCardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {type:string, value:string}
  ) {
    this.createForm();
    console.log(data);

  }

  private createForm(): void{
    this.form = this.fb.group({
      description: ['', [Validators.required]]
    });
  }


  onSubmit(){
    if(this.form.valid){
      this.dialogo.close(this.form.value);
    }
  }

  // cerrarDialogo(): void {
  //   this.dialogo.close(false);
  // }
  // confirmado(): void {
  //   this.dialogo.close(true);
  // }
}
