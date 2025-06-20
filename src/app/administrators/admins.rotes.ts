import { Routes } from '@angular/router';
import { AdmiEventosComponent } from './admiEventos/admi.eventos.component';
import { AdmiIglesiasComponent } from './admiIglesias/admi.iglesias.component';
import { AdmiPastoresComponent } from './admiPastores/admi.pastores.component';
import { AdmiUsuariosComponent } from './admiUsuarios/admi.usuarios.component';
import { AdminsComponent } from './admins.component';

export const ADMINS_ROUTES: Routes = [
 {
    path: '',
    component: AdminsComponent,
    children:[
      { path: 'eventos', component: AdmiEventosComponent },
      { path: 'iglesias', component: AdmiIglesiasComponent },
      { path: 'pastores', component: AdmiPastoresComponent },
      { path: 'usuarios', component: AdmiUsuariosComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'eventos'}
    ]
  }
]


