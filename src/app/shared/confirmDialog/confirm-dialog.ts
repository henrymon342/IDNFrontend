import { Component, Inject, inject, model } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ConfirmModel } from "../../core/models/confirmModel";

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  templateUrl: 'confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
  imports: [ MatDialogModule, MatButtonModule ],
})
export class ConfirmDialog {
 constructor(
    public dialogo: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModel) { }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }
}
