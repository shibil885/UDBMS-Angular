import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';

export const IsNotAuth: CanActivateFn = () => {
  const authService = inject(AuthUserService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthUserService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};