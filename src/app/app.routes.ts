import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.routes').then((x) => x.routes),
  },
];
