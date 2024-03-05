import { Injectable, inject } from '@angular/core';
import {
  Database,
  list,
  push,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { filter, map, of, tap } from 'rxjs';
import { Store } from 'store';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
  name: string | null;
  ingredients: (string | null)[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  private _store: Store = inject(Store);
  private _db: Database = inject(Database);
  private _authService: AuthService = inject(AuthService);

  meals$ = list(ref(this._db, `meals/${this.uid}`)).pipe(
    map((items) =>
      items.map((item) => ({
        ...item.snapshot.val(),
        $key: item.snapshot.key,
        $exists: item.snapshot.exists,
      }))
    ),
    tap((next) => this._store.set('meals', next))
  );

  get uid() {
    return this._authService.user?.uid;
  }

  getMeal(key: string) {
    if (!key) return of({} as Meal);
    return this._store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map((meals) => meals.find((meal: Meal) => meal.$key === key))
    );
  }

  addMeal(meal: Partial<Meal>) {
    return push(ref(this._db, `meals/${this.uid}`), meal);
  }

  updateMeal(key: string, meal: Partial<Meal>) {
    return update(ref(this._db, `meals/${this.uid}/${key}`), meal);
  }

  removeMeal(key: string) {
    return remove(ref(this._db, `meals/${this.uid}/${key}`));
  }
}
