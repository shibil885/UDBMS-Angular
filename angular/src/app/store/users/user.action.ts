import { createAction, props } from "@ngrx/store";

export const userRegistration = createAction('[singup Component], userRegistration',props<{user:any}>())
export const userRegistrationSuccess = createAction('[singup Component], userRegistrationSuccess',props<{token:string}>())
export const userRegistrationError = createAction('[singup Component], userRegistrationError',props<{errorMessage:string}>())


export const userLogin = createAction('[Login Component] userLogin',props<{user:{email:string,password:string}}>())
export const userLoginSuccess = createAction('Login component',props<{token:string}>());
export const userLoginError = createAction('[Login Component]',props<{error:string}>());

export const userLogout = createAction('[Login Component] userLogout');     