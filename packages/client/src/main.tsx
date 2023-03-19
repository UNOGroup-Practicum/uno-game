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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
