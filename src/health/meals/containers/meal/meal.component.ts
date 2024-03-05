import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';

import { MealFormComponent } from '../../components/meal-form/meal-form.component';

import {
  Meal,
  MealsService,
} from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [NgIf, AsyncPipe, MealFormComponent],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/assets/img/food.svg" alt="" />
          <span *ngIf="meal$ | async as meal; else title">
            {{ meal.name ? 'Edit' : 'Create' }} meal
          </span>
          <ng-template #title> Loading... </ng-template>
        </h1>
      </div>
      <div>
        <meal-form (create)="addMeal($event)"> </meal-form>
      </div>
    </div>
  `,
  styleUrl: './meal.component.scss',
})
export class MealComponent implements OnInit, OnDestroy {
  private _mealService: MealsService = inject(MealsService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  meal$!: Observable<Meal | undefined>;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this._mealService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap((param) => this._mealService.getMeal(param['id']))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Partial<Meal>) {
    await this._mealService.addMeal(event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
