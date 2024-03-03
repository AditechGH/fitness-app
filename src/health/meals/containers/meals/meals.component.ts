import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

import {
  Meal,
  MealsService,
} from '../../../shared/services/meals/meals.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'meals',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <div>
      {{ meals$ | async | json }}
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
