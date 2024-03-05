import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Store } from 'store';

@Injectable()
export class ScheduleService {
  private _store: Store = inject(Store);

  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<any> = this.date$.pipe(
    tap((next) => this._store.set('date', next))
  );

  updateDate(date: Date) {
    this.date$.next(date);
  }
}
