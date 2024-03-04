import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

import { ListItemComponent } from '../../../shared/components/list-item/list-item.component';

import {
  Meal,
  MealsService,
} from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meals',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink, NgIf, NgForOf, ListItemComponent],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="/assets/img/food.svg" alt="food" />
          Your meals
        </h1>
        <a class="btn__add" routerLink="../meals/new">
          <img src="/assets/img/add-white.svg" alt="add" />New meal</a
        >
      </div>
      <div *ngIf="meals$ | async as meals; else loading">
        <div class="message" *ngIf="!meals.length">
          <img src="/assets/img/face.svg" alt="" /> No meals, add a meal to
          start
        </div>
        <!-- meals -->
        <list-item *ngFor="let meal of meals" [item]="meal">

        </list-item>
      </div>
      <!-- loading -->
      <ng-template #loading>
        <div class="message">
          <img src="/assets/img/loading.svg" alt="" /> Fetching meals...
        </div>
      </ng-template>
    </div>
  `,
  styleUrl: './meals.component.scss',
})
export class MealsComponent implements OnInit, OnDestroy {
  private _mealsService: MealsService = inject(MealsService);
  private _store: Store = inject(Store);

  meals$!: Observable<Meal[]>;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this._mealsService.meals$.subscribe();
    this.meals$ = this._store.select('meals');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
