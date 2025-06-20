import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.rotes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'admi',
    loadChildren: () => import('./administrators/admins.rotes').then(m => m.ADMINS_ROUTES)
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
