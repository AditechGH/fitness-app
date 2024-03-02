import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

// components
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { AppNavComponent } from '../../components/app-nav/app-nav.component';

// services
import { Store } from 'store';
import {
  AuthService,
  User,
} from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe,
    NgIf,
    AppNavComponent,
    AppHeaderComponent,
  ],
  template: `
    <div>
      <app-header [user]="user$ | async" (logout)="onLogout()"></app-header>
      <app-nav *ngIf="(user$ | async)?.authenticated"></app-nav>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);
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

  async onLogout(): Promise<void> {
    await this._authService.logoutUser();
    this._router.navigate(['/auth/login']);
  }
}
