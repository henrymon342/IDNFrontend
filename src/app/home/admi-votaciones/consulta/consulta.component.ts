import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { VotacionService } from '../../../core/services/votacion.service';
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { VotanteService } from '../../../core/services/votante.service';

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
  public responseData: any;
  public candidatosAgrupados: any;
  public totalVotosVirtuales : any;



  private readonly _votacionService = inject(VotacionService);
  private readonly _votanteService = inject(VotanteService);
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
      this.responseData = Object.entries(res.data);

      // for (const cargo in this.responseData) {
      //   console.log("Cargo:", cargo);
      //   console.log("Candidatos:", this.responseData[cargo]);
      // }
      // this.candidatosAgrupados = this.groupByCargoArray(this.responseData);
      // console.log(this.candidatosAgrupados);


    });

    this._votanteService.getAlreadyVoted().subscribe(res =>{
      console.log(res);
      this.totalVotosVirtuales = res.data;
    })
  }

  // groupByCargoArray(candidatos: any[]): any[] {
  //   // 1. Agrupación intermedia usando un objeto para eficiencia (misma lógica que antes)
  //   const tempAgrupado = candidatos.reduce((acc, candidato) => {
  //     const cargoKey = candidato.cargo;

  //     if (!acc[cargoKey]) {
  //       acc[cargoKey] = [];
  //     }

  //     // Opcional: Ordenar cada sub-lista por count (votos) de mayor a menor
  //     acc[cargoKey].push(candidato);
  //     acc[cargoKey].sort((a:any, b:any) => b.count - a.count);

  //     return acc;
  //   });

  //   // 2. Transformación final: Convertir el objeto temporal en el array deseado
  //   const resultadoArray: any[] = Object.keys(tempAgrupado).map(key => ({
  //     CARGO: key,
  //     LISTA: tempAgrupado[key]
  //   }));
  //   console.log(resultadoArray);

  //   // Opcional: Ordenar los grupos principales por la clave (alfabéticamente)
  //   return resultadoArray;
  // }
}
