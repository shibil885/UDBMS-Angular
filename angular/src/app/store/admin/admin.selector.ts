import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.reducer";

export const selectAdminState = createFeatureSelector<AdminState>('admin')

export const selectUsers = createSelector(
    selectAdminState,
    (state:AdminState)=> state.users
)
export const selectAdminToken = createSelector(
    selectAdminState,
    (state:AdminState)=> state.token
)
export const selectAdminLoading = createSelector(
    selectAdminState,
    (state:AdminState)=> state.loading
)
export const selectAdminError = createSelector(
    selectAdminState,
    (state:AdminState)=> state.error
)
export const selectAdminSuccess = createSelector(
    selectAdminState,
    (state:AdminState)=> state.success
)