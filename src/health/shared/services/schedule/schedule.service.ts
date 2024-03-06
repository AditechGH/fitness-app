import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { Store } from 'store';
import {
  Database,
  endAt,
  list,
  orderByChild,
  query,
  ref,
  startAt,
} from '@angular/fire/database';

// service
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

// interfaces
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable()
export class ScheduleService {
  private _store: Store = inject(Store);
  private _db: Database = inject(Database);
  private _authService: AuthService = inject(AuthService);

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();

  selected$ = this.section$.pipe(
    tap((next: any) => this._store.set('selected', next))
  );

  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap((next) => this._store.set('date', next)),
    map((day: any) => {
      const startAt = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      ).getTime();

      const endAt =
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate() + 1
        ).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap((next) => this._store.set('schedule', next))
  );

  get uid() {
    return this._authService.user?.uid;
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private getSchedule(_startAt: number, _endAt: number) {
    return list(
      query(
        ref(this._db, `schedule/${this.uid}`),
        orderByChild('timestamp'),
        startAt(_startAt),
        endAt(_endAt)
      )
    );
  }
}
