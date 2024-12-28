import { createReducer, on } from "@ngrx/store";
import * as userAction from "./user.action"
import { IUser } from "../../shared/models/user.model";

export interface UserState {
    user:IUser[];
    token:string,
    error:any;
    loading:boolean
}

export const initialUserState:UserState = {
    user:[],
    token:'',
    error:null,
    loading:false
}
export const userReducer = createReducer(
    initialUserState,
    on(userAction.userRegistrationSuccess,(state,{token})=>{
        return{
            ...state,
            token:token,
            loading:false
        }
    }),
    on(userAction.userRegistrationError,(state,{errorMessage})=>{
        return{
            ...state,
            error:errorMessage
        }
    }),
    on(userAction.userLoginSuccess,(state,{token})=>{
        return{
            ...state,
            token:token
        }
    }),
    on(userAction.userLoginError,(state,{error})=>{
        return{
            ...state,
            error:error
        }
    })
)