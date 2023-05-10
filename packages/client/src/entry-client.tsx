import { CacheProvider } from "@emotion/react";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { APIClientRepository } from "services/api/APIClientRepository";
import { UserService } from "services/api/UserService";
import { createStore, RootState } from "services/store";
import ThemeProvider from "theme/ThemeProvider";
import { serviceWorker } from "utils/registerServiceWorker";

import App from "components/app/App";

import createEmotionCache from "./createEmotionCache";

import "./styles/index.scss";

serviceWorker.register();

const cache = createEmotionCache();

let preloadedState: RootState | undefined;

if (typeof window !== "undefined") {
  preloadedState = window.__PRELOADED_STATE__ as RootState;
  delete window.__PRELOADED_STATE__;
}

const store = createStore(new UserService(new APIClientRepository()), preloadedState);

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <CacheProvider value={cache}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  </Provider>
);
