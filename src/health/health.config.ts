import { Provider } from '@angular/core';

import { MealsService } from './shared/services/meals/meals.service';
import { WorkoutsService } from './shared/services/workouts/workouts.service';

export const healthProvider: Provider = [MealsService, WorkoutsService];
