import { adminReducer } from "./admin/admin.reducer";
import { userReducer } from "./users/user.reducer";

export const AppState = {
    user:userReducer,
    admin:adminReducer
}