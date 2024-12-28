import { inject } from "@angular/core";
import {  CanActivateFn, Router } from "@angular/router";
import { AuthAdminService } from "../services/auth-admin.service";

export const IsNotAuthAdmin: CanActivateFn = () => {
    const authService = inject(AuthAdminService);
    const router = inject(Router);
    if (!authService.isAuthenticatedAdmin()) {
      router.navigate(['/admin/login']);
      return false;
    }
    return true;
  };
  
  export const AuthGuardAdmin: CanActivateFn = () => {
    const authService = inject(AuthAdminService);
    const router = inject(Router);
    if (authService.isAuthenticatedAdmin()) {
      router.navigate(['/admin/dashboard']);
      return false;
    }
    return true;
  };