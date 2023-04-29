/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { UserService } from "services/api/UserService";
import { YandexAPIClient } from "services/api/YandexAPIClient";
import { rootReducer } from "services/reducers";
import ThemeProvider from "theme/ThemeProvider";

type PreloadedState = Partial<typeof rootReducer>;

type RenderWithRouter = {
  route?: string;
  preloadedState?: PreloadedState;
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Удаляем поле meta из результатов, т.к. там requestId отличается, а нам важны только type и payload
export const withoutMetaKey = (arr: Record<"meta" | "payload" | "type", unknown>[]) => {
  return arr.map((obj) => ({
    payload: obj.payload,
    type: obj.type,
  }));
};

function makeStore(preloadedState: PreloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = "/", preloadedState = {} }: RenderWithRouter = {}
) => {
  const store = makeStore(preloadedState);
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <ThemeProvider>{ui}</ThemeProvider>
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    ),
  };
};

function createThunkMiddleware() {
  const middleware =
    // @ts-ignore


      ({ dispatch, getState }) =>
      // @ts-ignore
      (next) =>
      // @ts-ignore
      (action) => {
        if (typeof action === "function") {
          return action(dispatch, getState, new UserService(new YandexAPIClient()));
        }

        return next(action);
      };

  return middleware;
}

export const thunkWithAuthService = createThunkMiddleware();
