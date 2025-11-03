import { Routes } from '@angular/router';
import { CampAdosComponent } from './camp-ados.component';
import { GruposComponent } from './grupos/grupos.component';
import { AdmiGruposComponent } from './admi-grupos/admi-grupos.component';


export const CAMP_ADOS_ROUTES: Routes = [
  {
    path: '',
    component: CampAdosComponent,
    children:[
      { path: 'grupos', component: GruposComponent },
      { path: 'admi-grupos', component: AdmiGruposComponent },
      { path: '', redirectTo: 'grupos', pathMatch: 'full' }
    ]
  }
]
