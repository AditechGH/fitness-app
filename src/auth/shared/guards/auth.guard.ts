import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

export const canActivate: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  return authService.authState.pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/auth/login']);
      }
      return !!user;
    })
  );
};
