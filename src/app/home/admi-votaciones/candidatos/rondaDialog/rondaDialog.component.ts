import { ChangeDetectionStrategy, Component, Inject, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ExtradataService } from "../../../../core/services/extradata.service";

@Component({
  selector: 'ronda-dialog',
  standalone: true,
  templateUrl: './rondaDialog.component.html',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,
    MatFormFieldModule, MatInputModule, FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RondaDialog {

  ronda: string = '';


  readonly _extraDataService = inject(ExtradataService);
  constructor(
    public dialogRef: MatDialogRef<RondaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }


  changeRonda() {
    console.log('Valor de ronda:', this.ronda);
    this._extraDataService.updateFirst(this.ronda).subscribe(res =>{
      console.log( res.data.ronda);
      this.dialogRef.close({ ronda: this.ronda, estado: 'confirmado' });
    });
  }
}
