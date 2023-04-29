import { configureStore } from "@reduxjs/toolkit";

import { TUserService } from "./api/types";
import { rootReducer } from "./reducers";

export const createStore = (service: TUserService, initialState?: RootState) => {
  return configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
    // devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      });
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
