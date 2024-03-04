import { Component, inject } from '@angular/core';

import { MealFormComponent } from '../../components/meal-form/meal-form.component';

import {
  Meal,
  MealsService,
} from '../../../shared/services/meals/meals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [MealFormComponent],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/assets/img/food.svg" alt="" />
          <span>Create meal</span>
        </h1>
      </div>
      <div>
        <meal-form (create)="addMeal($event)"> </meal-form>
      </div>
    </div>
  `,
  styleUrl: './meal.component.scss',
})
export class MealComponent {
  private _mealService: MealsService = inject(MealsService);
  private router: Router = inject(Router);

  async addMeal(event: Partial<Meal>) {
    await this._mealService.addMeal(event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
