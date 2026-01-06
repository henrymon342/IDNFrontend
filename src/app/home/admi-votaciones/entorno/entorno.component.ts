import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from "@angular/material/dialog";
import { RondaDialog } from "../candidatos/rondaDialog/rondaDialog.component";
import { ExtradataService } from "../../../core/services/extradata.service";
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, ReactiveFormsModule, MatButtonModule,
    MatIconModule, MatSlideToggleModule
   ],
  templateUrl: './entorno.component.html',
  styleUrl: './entorno.component.scss'
})
export class EntornoComponent {

  ronda: string = '';
  habilitado: boolean = false;

  private readonly _extradataService = inject(ExtradataService);
  private readonly dialog = inject(MatDialog);
  constructor(){
    this.getRonda();
  }

  private getRonda(){
    this._extradataService.getFirst().subscribe(res => {
      console.log(res);
      this.ronda = res.data.ronda;
      this.habilitado = res.data.habilitado;
    });

    this._extradataService.getAll().subscribe(res => {
      console.log(res);
    });
  }

  openChangeRondaDialog() {
    const dialogRef = this.dialog.open(RondaDialog, {
      restoreFocus: false,
      panelClass: 'custom',
      data: { ronda: this.ronda, habilitado: this.habilitado }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.estado) {
        console.log('Datos recibidos del diálogo:', result);
        this.ronda = result.ronda
      }
    });
  }

  onToggleChange(event: MatSlideToggleChange) {
    console.log(event.checked);
    this.habilitado = event.checked;
    this._extradataService.patchingFirst({habilitado: this.habilitado}).subscribe(res =>{
      console.log(res);
    });
  }
}
