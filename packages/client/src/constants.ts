//routes
export const ROUTES = {
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
