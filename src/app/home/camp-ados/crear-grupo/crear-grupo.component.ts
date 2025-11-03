import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';
import { IDNConstants } from '../../../shared/constants';
import { GroupService } from '../../../core/services/grupo.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatFormFieldModule, MatInputModule,
    MatIconModule, ReactiveFormsModule, ColorPickerModule, MatButtonModule ],
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.scss'
})
export class CrearGrupoComponent {
  private _bottomSheetRef =
  inject<MatBottomSheetRef<CrearGrupoComponent>>(MatBottomSheetRef);

  title = 'Añadir';

  public form!: FormGroup;
  public colorValue = '#ffffff';

  CARDS = IDNConstants.CARDS;
  cartasRestantes: string[] = [];
  cartasRepartidas: string[] = [];


  private _groupService = inject(GroupService);
  private _toastService = inject(ToastService);
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.cartasRestantes = [...this.CARDS];
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

  public openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss({ grupoCreado: false });
    event.preventDefault();
  }

  public onSubmit():void{
    if(!this.form.valid) return;
    this.setBaseHand();
    this.setBaseCards();
    console.log(this.form.value);
    const parse  = JSON.parse(this.form.value.points);
    console.log(parse);

    this._bottomSheetRef.dismiss({ grupoCreado: true });
    this._groupService.create(this.form.value).subscribe(res => {
      console.log(res);
      if(res.success){
        this._toastService.success("Grupo añadido correctamente!");
      }else{
        this._toastService.error(res.data);
      }
    });
  }

  setBaseCards() {
    this.repartirCartas(7);
    console.log(this.cartasRepartidas);
    this.form.patchValue({ cards: JSON.stringify(this.cartasRepartidas) });
  }


  shuffle(array: string[]): string[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  repartirCartas(n: number): void {
    if (n > this.cartasRestantes.length) {
      console.warn('No hay suficientes cartas para repartir');
      return;
    }

    const barajaMezclada = this.shuffle(this.cartasRestantes);

    this.cartasRepartidas = barajaMezclada.slice(0, n);

    this.cartasRestantes = barajaMezclada.slice(n);

    console.log('Cartas repartidas:', this.cartasRepartidas);
    console.log('Cartas restantes:', this.cartasRestantes);
  }


  changeColor(event: any) {
    console.log(event);
    this.form.patchValue({ color: event });
    // this.colorValue = event.color.hex; // Puedes usar event.color.rgb también si necesitas
    // console.log('Color actualizado:', this.colorValue);
  }

  setBaseHand() {
    const pointTemplate = { type: "normal", desc: "base" };
    let points: { type: string; desc: string }[] = [];
    for (let i = 1; i <= 7; i++) {
      console.log(i);
      points.push(pointTemplate );
    }
    console.log(points);
    this.form.patchValue({ points: JSON.stringify(points) });
  }
}
