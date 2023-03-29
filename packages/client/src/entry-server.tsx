import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";

import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { Location } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

import { store } from "services/store";
import ThemeProvider from "theme/ThemeProvider";

import App from "components/app/App";

import createEmotionCache from "./createEmotionCache";

export function render(url: string | Partial<Location>) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

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

  return { html, emotionCss };
}
