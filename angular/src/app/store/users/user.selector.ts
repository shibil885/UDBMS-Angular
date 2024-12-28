import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user')

export const selectUser = createSelector(
    selectUserState,
    ((state:UserState) => state.user)
)

export const selectUserToken = createSelector(
    selectUserState,
    ((state:UserState) => state.token)
)
export const selectUserError = createSelector(
    selectUserState,
    ((state:UserState) => state.error)
)
export const selectUserLoading = createSelector(
    selectUserState,
    ((state:UserState)=> state.loading)
)