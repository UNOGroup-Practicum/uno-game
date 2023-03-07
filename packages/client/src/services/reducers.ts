import { combineReducers } from "redux";
import { authSlice } from "./slices/auth-slice";
import gameReducer from "./slices/gameSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  game: gameReducer,
});
