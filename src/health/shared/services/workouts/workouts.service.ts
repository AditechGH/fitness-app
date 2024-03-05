import { Injectable, inject } from '@angular/core';
import {
  Database,
  list,
  push,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { Observable, filter, map, of, tap } from 'rxjs';
import { Store } from 'store';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Workout {
  name: string | null;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {
  private _store: Store = inject(Store);
  private _db: Database = inject(Database);
  private _authService: AuthService = inject(AuthService);

  workouts$: Observable<Workout[]> = list(
    ref(this._db, `workouts/${this.uid}`)
  ).pipe(
    map((items) =>
      items.map((item) => ({
        ...item.snapshot.val(),
        $key: item.snapshot.key,
        $exists: item.snapshot.exists,
      }))
    ),
    tap((next) => this._store.set('workouts', next))
  );

  get uid() {
    return this._authService.user?.uid;
  }

  getWorkout(key: string) {
    if (!key) return of({} as Workout);
    return this._store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map((workouts) =>
        workouts.find((workout: Workout) => workout.$key === key)
      )
    );
  }

  addWorkout(workout: Partial<Workout>) {
    return push(ref(this._db, `workouts/${this.uid}`), workout);
  }

  updateWorkout(key: string, workout: Partial<Workout>) {
    return update(ref(this._db, `workouts/${this.uid}/${key}`), workout);
  }

  removeWorkout(key: string) {
    return remove(ref(this._db, `workouts/${this.uid}/${key}`));
  }
}
