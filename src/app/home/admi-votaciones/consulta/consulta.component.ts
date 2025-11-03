import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { VotacionService } from '../../../core/services/votacion.service';
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, ReactiveFormsModule, MatButtonModule,
    MatIconModule
   ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {

  public form!: FormGroup;
  public cantidad: number;

  private readonly _votacionService = inject(VotacionService);
  constructor(private fb: FormBuilder){
    this.createForms();
  }

  private createForms(): void{
    this.form = this.fb.group({
      ronda: ['', [Validators.required]],
      ministerio: ['', [Validators.required]]
    })
  }

  public onSubmit(){
    console.log(this.form.value);
    if(!this.form.valid) return;
    this._votacionService.consulta(this.form.value).subscribe(res =>{
      console.log(res);
      this.cantidad = res.data.length;
    });


  }
}
