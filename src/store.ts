import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

export interface State {
  [key: string]: any;
}

const state: State = {};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(map((store) => store[name]));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
