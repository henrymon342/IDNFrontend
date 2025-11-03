import { Routes } from '@angular/router';
import { AdmiVotacionesComponent } from './admi-votaciones.component';
import { VotantesComponent } from './votantes/votantes.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { ConsultaComponent } from './consulta/consulta.component';


export const ADMI_VOTACIONES_ROUTES: Routes = [
  {
    path: '',
    component: AdmiVotacionesComponent,
    children:[
      { path: 'votantes', component: VotantesComponent },
      { path: 'candidatos', component: CandidatosComponent },
      { path: 'consulta', component: ConsultaComponent },
      { path: '', redirectTo: 'votantes', pathMatch: 'full' }
    ]
  }
]
