import { Routes } from '@angular/router';

import { MealsComponent } from './containers/meals/meals.component';

export const routes: Routes = [
  { path: '', component: MealsComponent },
  {
    path: 'new',
    loadComponent: () =>
      import('./containers/meal/meal.component').then((x) => x.MealComponent),
  },
];
