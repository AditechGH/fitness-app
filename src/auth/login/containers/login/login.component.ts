import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterModule, NgIf, AuthFormComponent],
  template: `
    <auth-form (submitted)="loginUser($event)">
      <h1>Login</h1>
      <a routerLink="/auth/register">Not registered?</a>
      <button type="submit">Login</button>
      <div class="error" *ngIf="error">{{ error }}</div>
    </auth-form>
  `,
})
export class LoginComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  error!: string;

  async loginUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this._authService.loginUser(email, password);
      this._router.navigate(['/']);
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
