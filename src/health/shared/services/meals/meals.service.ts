import { Injectable, inject } from '@angular/core';
import { Database, list, ref } from '@angular/fire/database';
import { Observable, tap } from 'rxjs';
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

  meals$: Observable<any> = list(ref(this._db, `meals/${this.uid}`)).pipe(
    tap((next) => this._store.set('meals', next))
  );

  get uid() {
    return this._authService.user?.uid;
  }
}
