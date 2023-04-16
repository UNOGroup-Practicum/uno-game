import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";

let preloadedState;
if (typeof window !== "undefined") {
  preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
}

export const store = configureStore({
  preloadedState,
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
