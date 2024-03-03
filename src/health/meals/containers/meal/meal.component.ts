import { Component } from '@angular/core';

import { MealFormComponent } from '../../components/meal-form/meal-form.component';
import { Meal } from '../../../shared/services/meals/meals.service';

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
  addMeal(meal: Partial<Meal>) {
    console.log('Meal: ', meal);
  }
}
