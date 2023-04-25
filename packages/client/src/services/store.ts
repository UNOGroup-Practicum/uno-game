import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";

// TODO: добавить service
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createStore = (_service = {}, initialState?: RootState) => {
  return configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
