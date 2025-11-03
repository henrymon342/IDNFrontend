import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VotanteService } from '../../../core/services/votante.service';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'enter-code',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatFormFieldModule, FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule ],
  templateUrl: './enter-code.component.html',
  styleUrl: './enter-code.component.scss'
})
export class EnterCodeComponent {

  public form!: FormGroup;

  private readonly _votanteService = inject(VotanteService);
  private readonly _localStorageService = inject(LocalStorageService);
  readonly _toastService = inject(ToastService);
  constructor(private fb: FormBuilder, private router: Router){
    this.createForm();
  }

  private createForm(): void{
    this.form = this.fb.group({
      code: ['', [Validators.required]]
    })
  }

  async onSubmit() {
    if (this.form.valid) {
      const code = this.form.value.code;
      console.log(code);
      this._votanteService.getByCode(code).subscribe( res => {
        console.log(res);
        if(res.data.id != null){
          console.log("existe");
          if(!res.data.habilitado){
            this.router.navigate(['/home/votacion/enter-code']);
            this._toastService.error("Usted no esta habilitado para votar");
            return;
          }

          this._localStorageService.setItem("voter", res.data);
          // TODO: enviar a la pantalla de votaciones osea la la papeleta
          this.router.navigate(['/home/votacion/papeleta']);
        }else{
          console.log(res.data);
          //TODO: mostrar mensaje, el codigo no es valido
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
