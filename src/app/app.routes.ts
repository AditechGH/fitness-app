import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'schedule',
  },
  {
    path: '',
    loadChildren: () => import('../health/health.routes').then((x) => x.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.routes').then((x) => x.routes),
  },
];
