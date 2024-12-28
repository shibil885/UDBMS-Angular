import { createAction, props } from "@ngrx/store";
import { IUser } from "../../shared/models/user.model";

export const adminLogin = createAction('[AdminLogin Component] adminLogin',props<{admin:{email:string,password:string}}>())
export const adminLoginSuccess = createAction('[AdminLogin Component] adminLoginSuccess',props<{token:string}>())
export const adminLoginError = createAction('[AdminLogin Component] adminLoginError',props<{error:string}>())


export const getAllUsers = createAction('[Dashboard Component] getAllUsers')
export const getAllUsersSuccess = createAction('[Dashboard Component]getAllUsersSuccess',props<{users:IUser[]}>())
export const getAllUsersError = createAction('[Dashboard Component] getAllUsersError',props<{error: string}>())


export const removeUser = createAction('[Dashboard Component] removeUser',props<{email:string}>())
export const removeUserSuccess = createAction('[Dashboard Component] removeUserSuccess',props<{email:string}>())
export const removeUserError = createAction('[Dashboard Component] removeUserError',props<{message:string}>())


export const editUser = createAction('[DashBoard Compnent] editUser',props<{user:{_id:string,name:string,phone:string,email:string}}>())
export const editUserSuccess = createAction('[DashBoard Component] editUserSuccess',props<{editedUser:IUser}>())
export const editUserError = createAction('[DashBoard Component] editUserError',props<{message:string}>())


export const addUser = createAction('[Dashboard Component] addUser',props<{user:IUser}>())
export const addUserSuccess = createAction('[Dashboard Component] addUserSuccess',props<{user:IUser}>())
export const addUserError = createAction('[Dashboard Component] addUserError',props<{message:string}>())