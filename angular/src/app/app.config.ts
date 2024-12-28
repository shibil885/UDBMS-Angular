import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { AppState } from './store/app.store';
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './store/users/user.effects';
import { AdminEffect } from './store/admin/admin.effect';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { checkAuthInterceptor } from './httpInterceptor/check-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(),
    withInterceptors([checkAuthInterceptor])),
    provideStore(AppState),
    provideEffects(UserEffect),
    provideEffects(AdminEffect),
    { provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS },
    JwtHelperService,
  ]
};
  