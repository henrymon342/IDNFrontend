import { Routes } from '@angular/router';
import { ListaIglesiasComponent } from './iglesias/lista-iglesias/lista-iglesias.component';
import { EnquecreemosComponent } from './enquecreemos/enquecreemos.component';
import { HomeComponent } from './home.component';
import { JniComponent } from './ministerios/jni/jni.component';
import { MniComponent } from './ministerios/mni/mni.component';
import { DniComponent } from './ministerios/dni/dni.component';
import { EventosComponent } from './eventos/eventos.component';
import { RecursosComponent } from './recursos/recursos.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      { path: 'enquecreemos', component: EnquecreemosComponent },
      { path: 'jni', component: JniComponent },
      { path: 'mni', component: MniComponent },
      { path: 'dni', component: DniComponent },
      { path: 'eventos', component: EventosComponent },
      { path: 'recursos', component: RecursosComponent },
      { path: 'listaiglesias', component: ListaIglesiasComponent },
      { path: '', redirectTo: 'enquecreemos', pathMatch: 'full' }
    ]
  }
]
