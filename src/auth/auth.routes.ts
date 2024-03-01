import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.routes').then((x) => x.routes),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.routes').then((x) => x.routes),
  },
];
