import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'meals',
    loadChildren: () => import('./meals/meals.routes').then((x) => x.routes),
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.routes').then((x) => x.routes),
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./workouts/workouts.routes').then((x) => x.routes),
  },
];
