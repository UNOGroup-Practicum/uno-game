//routes
export const routes = {
  home: {
    path: "/",
  },
  "sign-in": {
    path: "/sign-in",
  },
  "sign-up": {
    path: "/sign-up",
  },
  profile: {
    path: "/profile",
  },
  leaderboard: {
    path: "/leaderboard",
  },
  forum: { path: "/forum" },
  game: {
    path: "/game",
  },
};

export enum EAuthStatus {
  pending = "pending",
  ok = "auth",
  no = "notAuth",
}
