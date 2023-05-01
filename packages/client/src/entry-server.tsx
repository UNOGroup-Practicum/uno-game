import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";

import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { matchPath } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

import { TUserRepository } from "services/api/types";
import { UserService } from "services/api/UserService";
import { themeSlice } from "services/slices/themeSlice";
import { createStore } from "services/store";
import { Theme } from "theme/ThemeContext";
import ThemeProvider from "theme/ThemeProvider";

import App from "components/app/App";

import { getThemes, loadUser, Route, ROUTES } from "./constants";
import createEmotionCache from "./createEmotionCache";

export async function render(url: string, theme: Theme, repository: TUserRepository) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const [pathname] = url.split("?");
  const store = createStore(new UserService(repository));

  await loadUser(store.dispatch);
  await getThemes(store.dispatch);

  const currentRoute = Object.values(ROUTES).find((route) => matchPath(pathname, route.path)) || {};
  const { loader } = currentRoute as Route;

  if (loader) {
    await loader(store.dispatch);
  }

  store.dispatch(themeSlice.actions.setTheme(theme));

  const initialState = store.getState();

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <CacheProvider value={cache}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </StaticRouter>
  );

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  return { html, emotionCss, initialState };
}
