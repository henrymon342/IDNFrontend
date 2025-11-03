import { Routes } from '@angular/router';
import { EnterCodeComponent } from './enter-code/enter-code.component';
import { VotacionesComponent } from './votaciones.component';
import { PapeletaComponent } from './papeleta/papeleta.component';


export const VOTACIONES_ROUTES: Routes = [
  {
    path: '',
    component: VotacionesComponent,
    children:[
      { path: 'enter-code', component: EnterCodeComponent },
      { path: 'papeleta', component: PapeletaComponent },
      { path: '', redirectTo: 'enter-code', pathMatch: 'full' }
    ]
  }
]
