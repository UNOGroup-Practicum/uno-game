import { combineReducers } from "redux";

import { authSlice } from "./slices/auth-slice";
import { forumSlice } from "./slices/forum-slice";
import { gameSlice } from "./slices/gameSlice";
import { leaderboardSlice } from "./slices/leaderboardSlice";
import { oAuthSlice } from "./slices/oauth-slice";
import { themeSlice } from "./slices/themeSlice";
import { userSlice } from "./slices/user-slice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  oauth: oAuthSlice.reducer,
  game: gameSlice.reducer,
  theme: themeSlice.reducer,
  forum: forumSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
});
