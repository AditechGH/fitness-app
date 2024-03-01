import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterModule, AuthFormComponent],
  template: `
    <auth-form (submitted)="loginUser($event)">
      <h1>Login</h1>
      <a routerLink="/auth/register">Not registered?</a>
      <button type="submit">Login</button>
    </auth-form>
  `,
})
export class LoginComponent {
  loginUser(event: FormGroup) {
    console.log(event.value);
  }
}
