import { Injectable, inject } from '@angular/core';
import { Database, list, push, ref, remove } from '@angular/fire/database';
import { Observable, first, map, tap } from 'rxjs';
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

  addMeal(meal: Partial<Meal>) {
    return push(ref(this._db, `meals/${this.uid}`), meal);
  }

  removeMeal(key: string) {
    return remove(ref(this._db, `meals/${this.uid}/${key}`));
  }
}
