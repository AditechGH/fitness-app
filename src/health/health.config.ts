import { Provider } from '@angular/core';

import { MealsService } from './shared/services/meals/meals.service';

export const healthProvider: Provider = [MealsService];
