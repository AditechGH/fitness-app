import { Routes } from '@angular/router';

import { AuthService } from '../auth/shared/services/auth/auth.service';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.routes').then((x) => x.routes),
    providers: [AuthService],
  },
];
