import { Injectable, inject } from '@angular/core';
import {
  Database,
  endAt,
  list,
  orderByChild,
  push,
  query,
  ref,
  startAt,
  update,
} from '@angular/fire/database';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from 'store';

// service
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

// interfaces
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

export interface ScheduleItem {
  meals: Meal[] | null;
  workouts: Workout[] | null;
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

export interface ListItem {
  name: string;
}

@Injectable()
export class ScheduleService {
  private _store: Store = inject(Store);
  private _db: Database = inject(Database);
  private _authService: AuthService = inject(AuthService);

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any) => {
      const id = section.data.$key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items,
      };

      if (id) {
        delete payload.$key;
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  selected$ = this.section$.pipe(
    tap((next: any) => this._store.set('selected', next))
  );

  list$ = this.section$.pipe(
    map((value: any) => this._store.value[value.type]),
    tap((next: any) => this._store.set('list', next))
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

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return update(ref(this._db, `schedule/${this.uid}/${key}`), payload);
  }

  private createSection(payload: ScheduleItem) {
    return push(ref(this._db, `schedule/${this.uid}`), payload);
  }

  private getSchedule(_startAt: number, _endAt: number) {
    return list(
      query(
        ref(this._db, `schedule/${this.uid}`),
        orderByChild('timestamp'),
        startAt(_startAt),
        endAt(_endAt)
      )
    ).pipe(
      map((items) =>
        items.map((item) => ({
          ...item.snapshot.val(),
          $key: item.snapshot.key,
        }))
      )
    );
  }
}
