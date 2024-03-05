import { Provider } from '@angular/core';

// services
import { MealsService } from './shared/services/meals/meals.service';
import { WorkoutsService } from './shared/services/workouts/workouts.service';
import { ScheduleService } from './shared/services/schedule/schedule.service';

export const healthProvider: Provider = [
  MealsService,
  WorkoutsService,
  ScheduleService,
];
