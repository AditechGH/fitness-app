import { Routes } from '@angular/router';

import { WorkoutsComponent } from './containers/workouts/workouts.component';

export const routes: Routes = [
  { path: '', component: WorkoutsComponent },
  {
    path: 'new',
    loadComponent: () =>
      import('./containers/workout/workout.component').then(
        (x) => x.WorkoutComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./containers/workout/workout.component').then(
        (x) => x.WorkoutComponent
      ),
  },
];
