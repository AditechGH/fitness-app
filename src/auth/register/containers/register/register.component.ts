import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, NgIf, AuthFormComponent],
  template: `
    <auth-form (submitted)="registerUser($event)">
      <h1>Register</h1>
      <a routerLink="/auth/login">Already have an account?</a>
      <button type="submit">Create account</button>
      <div class="error" *ngIf="error">{{ error }}</div>
    </auth-form>
  `,
})
export class RegisterComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  error!: string;

  async registerUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this._authService.createUser(email, password);
      this._router.navigate(['/']);
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
