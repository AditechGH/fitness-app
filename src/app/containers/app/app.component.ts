import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';
import {
  AuthService,
  User,
} from '../../../auth/shared/services/auth/auth.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  template: `
    <div>
      <h1>{{ user$ | async | json }}</h1>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private _store: Store = inject(Store);
  private _authService: AuthService = inject(AuthService);

  user$!: Observable<User>;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this._authService.auth$.subscribe();
    this.user$ = this._store.select('user');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
