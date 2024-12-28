import { Injectable, inject } from "@angular/core";
import { AuthAdminService } from "../../shared/services/auth-admin.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as adminActions from "./admin.action"
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";
Injectable()
export class AdminEffect{
    private authService = inject(AuthAdminService)
    private actions$ = inject(Actions)
    private router = inject(Router)

    adminLogin$ = createEffect(()=> this.actions$.pipe(
        ofType(adminActions.adminLogin),
        mergeMap((action)=>
            this.authService.adminLogin(action.admin).pipe(
                map((data)=> adminActions.adminLoginSuccess({token:data.toString()})),
                catchError((error)=> of(adminActions.adminLoginError({error})))
            )
        )
    ))
    adminLoginSuccess$ = createEffect(()=> this.actions$.pipe(
        ofType(adminActions.adminLoginSuccess),
        tap((action)=>{
          console.log('admin accccccccccc',action);
            localStorage.setItem('adminToken',action.token),
            this.router.navigate(['admin/dashboard'])
        })
    ),{dispatch:false})



    getAllUsers$ = createEffect(()=> this.actions$.pipe(
        ofType(adminActions.getAllUsers),
        mergeMap(()=>
            this.authService.getAllUsers().pipe(
                map(data => adminActions.getAllUsersSuccess({users:data})),
                catchError((error)=> of(adminActions.getAllUsersError({error:error})))
            )
        )
    ))

    removeUser$ = createEffect(() =>
        this.actions$.pipe(
          ofType(adminActions.removeUser),
          mergeMap((action) =>
            this.authService.removeUser(action.email).pipe(
              tap((response) => {
                console.log(response, 'tap');
              }),
              map((response: any) => adminActions.removeUserSuccess({ email: response.email })),
              catchError((error) => of(adminActions.removeUserError({ message: error.message })))
            )
          )
        )
      );

      editUser$ = createEffect(() =>
        this.actions$.pipe(
          ofType(adminActions.editUser),
          mergeMap(action =>
            this.authService.editUser(action.user).pipe(
              map((editedUser: any) => adminActions.editUserSuccess({ editedUser })),
              catchError(error => of(adminActions.editUserError({ message: error.message })))
            )
          )
        )
      );

      addUser$ = createEffect(()=>this.actions$.pipe(
        ofType(adminActions.addUser),
        mergeMap((action)=>
            this.authService.addUser(action.user).pipe(
                map((data:any) => adminActions.addUserSuccess({user:data})),
                catchError(error => of(adminActions.addUserError({message:error.message})))
            )
        )
      ))
}