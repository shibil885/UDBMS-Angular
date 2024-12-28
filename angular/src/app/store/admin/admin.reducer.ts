import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../shared/models/user.model";
import * as adminActions from "./admin.action"

export interface AdminState{
    users:IUser[];
    error:string|null;
    success:string|null;
    loading:boolean;
    token:string
}
export const initialadminState:AdminState ={
    users:[],
    error:null,
    loading:false,
    token:'',
    success:null
}
export const adminReducer = createReducer(
    initialadminState,
    on(adminActions.adminLoginSuccess,(state,{token})=>{
        return{
            ...state,
            token:token,
            loading:false
        }
    }),
    on(adminActions.adminLoginError,(state,{error})=>{
        return{
            ...state,
            error:error,
            loading:false
        }
    }),
    on(adminActions.getAllUsers,(state)=>{
        return{
            ...state,
            loading:true
        }
    }),
    on(adminActions.getAllUsersSuccess, (state, { users }) => {
        return {
          ...state,
          loading: false,
          users:users
        };
      }),
    on(adminActions.getAllUsersError,(state,{error})=>{
        return{
            ...state,
            error:error,
            loading:false
        }
    }),
    on(adminActions.removeUser, (state) => ({
        ...state,
        loading: true,
      })),
      on(adminActions.removeUserSuccess, (state, { email }) => { 
             console.log('from effect',email);
             
       return {       
        ...state,
        users: state.users.filter((user: IUser) => user.email !== email),
        loading: false,
        error: null,
    }
      }),
      on(adminActions.removeUserError, (state, { message }) => {
        return{
            ...state,
            loading:false,
            error:message
        }
      }),
      on(adminActions.editUser,(state)=>{
        return{
            ...state,
            loading:true
        }
      }),
      on(adminActions.editUserSuccess, (state:any, { editedUser }) => {
        const updatedUsers = state.users.map((user: IUser) =>
          user._id === editedUser._id ? editedUser : user
        );
        return {
          ...state,
          users:updatedUsers,
          loading: false
        };
      }),
      on(adminActions.editUserError,(state,{message})=>{
        console.log('stateeeeeee',state);
        return{
            ...state,
            loading:false,
            error:message
        }
      }),
      on(adminActions.addUser,(state)=>{
        return{
            ...state,
            loading:true
        }
      }),
      on(adminActions.addUserSuccess, (state, { user }) => {
        const updatedUsers = [...state.users ,user]
        return {
          ...state,
          users:updatedUsers,
          loading: false
        };
      }),
      on(adminActions.addUserError,(state,{message})=>{
        return{
            ...state,
            loading:false,
            error:message
        }
      })
)