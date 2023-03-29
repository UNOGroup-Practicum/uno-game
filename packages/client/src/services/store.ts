import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";

let initialState;
if (!import.meta.env.SSR) {
  initialState = window.initialState;
  delete window.initialState;
}

export const store = configureStore({
  preloadedState: initialState,
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
