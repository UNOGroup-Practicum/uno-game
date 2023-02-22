import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import ThemeProvider from "./theme/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
