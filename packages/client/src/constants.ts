import { authThunks } from "services/slices/auth-slice";
import { AppDispatch } from "services/store";

export type Route = {
  path: string;
  loader?: (dispatch: AppDispatch) => void;
};

export const loadUser = (dispatch: AppDispatch) => dispatch(authThunks.me());

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
  forum: { path: "/forum" },
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
