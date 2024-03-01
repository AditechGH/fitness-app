import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, AuthFormComponent],
  template: `
    <auth-form (submitted)="registerUser($event)">
      <h1>Register</h1>
      <a routerLink="/auth/login">Already have an account?</a>
      <button type="submit">Create account</button>
    </auth-form>
  `,
})
export class RegisterComponent {
  registerUser(event: FormGroup) {
    console.log(event.value);
  }
}
