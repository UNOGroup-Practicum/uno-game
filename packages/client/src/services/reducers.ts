import { combineReducers } from "redux";
import { authSlice } from "./slices/auth-slice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});
