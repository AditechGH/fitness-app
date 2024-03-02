import { Routes } from '@angular/router';

import { canActivate } from '../auth/shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'meals',
    canActivate: [canActivate],
    loadChildren: () => import('./meals/meals.routes').then((x) => x.routes),
  },
  {
    path: 'schedule',
    canActivate: [canActivate],
    loadChildren: () =>
      import('./schedule/schedule.routes').then((x) => x.routes),
  },
  {
    path: 'workouts',
    canActivate: [canActivate],
    loadChildren: () =>
      import('./workouts/workouts.routes').then((x) => x.routes),
  },
];
