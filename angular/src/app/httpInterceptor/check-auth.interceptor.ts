import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { userLogout } from '../store/users/user.action';

export const checkAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const token = localStorage.getItem('token');
  if (token) {
    console.log('token', token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        store.dispatch(userLogout());
      }
      return throwError(() => new Error(error.message));
    })
  );
};
