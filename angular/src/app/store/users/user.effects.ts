import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as userAction from "./user.action"
import {  catchError, map, of, switchMap, tap } from "rxjs";
import { AuthUserService } from "../../shared/services/auth-user.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffect{
    private actions$ = inject(Actions)
    private authService = inject(AuthUserService)
    private router = inject(Router)

    userRegistration$ = createEffect(() =>
        this.actions$.pipe(
          ofType(userAction.userRegistration),
          switchMap((action) =>
            this.authService.registration(action.user).pipe(
              map((data) => userAction.userRegistrationSuccess({ token: data })),
              catchError((error) => of(userAction.userRegistrationError({ errorMessage: error.message })))
            )
          )
        )
      );
    
      userRegistrationSuccess$ = createEffect(() =>
        this.actions$.pipe(
          ofType(userAction.userRegistrationSuccess),
          tap((action: any) => {
            localStorage.setItem('token', action.token.token);
            this.router.navigate(['/']);
          })
        ), { dispatch: false }
      );


    userLogin$ = createEffect(()=> this.actions$.pipe(
        ofType(userAction.userLogin),
        switchMap((action)=> 
        this.authService.login(action.user).pipe(
            map((data:any)=> userAction.userLoginSuccess({token:data.token})),
            catchError((error) => of( userAction.userLoginError({error:'Invalid  email or password'})))
        ))
    ))
    userLoginSuccess$ = createEffect(()=> this.actions$.pipe(
        ofType(userAction.userLoginSuccess),
        tap((action)=>{
            localStorage.setItem('token',action.token)
            this.router.navigate(['/'])
        })
    ),{dispatch:false})



    userLogout$ = createEffect(()=> this.actions$.pipe(
        ofType(userAction.userLogout),
        tap(()=>{
            localStorage.removeItem('token')
            this.router.navigate(['/login'])
        })
    ),{dispatch:false})


}