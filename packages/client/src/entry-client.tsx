import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "services/store";
import ThemeProvider from "theme/ThemeProvider";
import { serviceWorker } from "utils/registerServiceWorker";

import App from "components/app/App";

import "./styles/index.scss";

serviceWorker.register();

const cache = createEmotionCache();
import { CacheProvider } from "@emotion/react";

import createEmotionCache from "./createEmotionCache";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CacheProvider value={cache}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CacheProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
