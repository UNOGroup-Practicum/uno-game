import { authThunks } from "services/slices/auth-slice";
import { AppDispatch } from "services/store";

import { forumThunks } from "./services/slices/forum-slice";

export type Route = {
  path: string;
  loader?: (dispatch: AppDispatch) => void;
};

export const loadUser = (dispatch: AppDispatch) => dispatch(authThunks.me());
export const getThemes = (dispatch: AppDispatch) => dispatch(forumThunks.getThemes());

//routes
export const ROUTES: Record<string, Route> = {
  home: {
    path: "/",
  },
  signIn: {
    path: "/sign-in",
  },
  signUp: {
    path: "/sign-up",
  },
  profile: {
    path: "/profile",
  },
  leaderboard: {
    path: "/leaderboard",
  },
  rules: {
    path: "/rules",
  },
  forum: {
    path: "/forum",
    loader: (dispatch) => getThemes(dispatch),
  },
  forumTheme: {
    path: "/forum/:themeId",
    loader: (dispatch) => getThemes(dispatch),
  },
  gamePreparing: {
    path: "/game-preparing",
  },
  game: {
    path: "/game",
  },
};

export const SCHEMA_ERROR_MESSAGE = "Schema response is not valid";

export const IS_SSR = typeof window === "undefined";

export const RATING_FIELD_NAME = "gamesAmount";
