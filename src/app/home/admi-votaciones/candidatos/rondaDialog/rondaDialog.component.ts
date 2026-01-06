import { ChangeDetectionStrategy, Component, Inject, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ExtradataService } from "../../../../core/services/extradata.service";
import { firstValueFrom } from "rxjs";

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
    console.log(this.data);

  }


  async updateRonda(): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this._extraDataService.patchingFirst({ronda: this.ronda})
      );

      this.data = this.ronda;
      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async changeRonda() {
    console.log("comienza updateRonda");

    const ok = await this.updateRonda();
    console.log("termina updateRonda");

    console.log(ok);
    if(ok){
      console.log("comienza close dialog");
      this.dialogRef.close({ ronda: this.data, estado: true });
    }else{
      this.dialogRef.close({ estado: false });
    }
  }
}
