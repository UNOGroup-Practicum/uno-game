import { combineReducers } from "redux";

import { authSlice } from "./slices/auth-slice";
import { gameSlice } from "./slices/gameSlice";
import { userSlice } from "./slices/user-slice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  game: gameSlice.reducer,
});
