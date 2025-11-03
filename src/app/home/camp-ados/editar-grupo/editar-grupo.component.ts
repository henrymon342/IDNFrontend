import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../../../core/services/grupo.service';
import { Grupo } from '../../../core/models/grupo';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatFormFieldModule, MatInputModule,
    MatIconModule, ReactiveFormsModule, ColorPickerModule, MatButtonModule ],
  templateUrl: './editar-grupo.component.html',
  styleUrl: './editar-grupo.component.scss'
})
export class EditarGrupoComponent implements OnInit {
  readonly _groupService = inject(GroupService);
  readonly dialogRef = inject(MatDialogRef<EditarGrupoComponent>);
  readonly data = inject<{isChanged: boolean, id: number}>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);

  title = 'Modificar';

  public form!: FormGroup;

  public group:Grupo

  ngOnInit(): void {
    this.createForm();
    this.getGroup();
  }

  getGroup(){
    console.log(this.data);
    this._groupService.get(this.data.id).subscribe(res =>{
      console.log(res);
      if(res.success){
        this.group = res.data;
        this.form.controls['name'].setValue(res.data.name);
        this.form.controls['color'].setValue(res.data.color);
        this.form.controls['participants'].setValue(res.data.participants);
        this.form.controls['points'].setValue(res.data.points);
        this.form.controls['cards'].setValue(res.data.cards);
      }
    });

  }

  onSubmit(){
    console.log(this.form.value);
    if(!this.form.valid) return;
    this._groupService.update(this.group.groupId!, this.form.value).subscribe(res => {
      console.log(res);
    });
  }

  private createForm(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      color: ['#ff0000',[Validators.required]],
      participants: [0, [
        Validators.required,
        Validators.min(1),      // mínimo 1 (mayor a 0)
        Validators.max(25)     // máximo 25
      ]],
      points: [null],
      cards: [null],
    })
  }

  changeColor(event: any) {
    console.log(event);
    this.form.patchValue({ color: event });
  }
}
