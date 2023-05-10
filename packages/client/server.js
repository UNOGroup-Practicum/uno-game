import axios from "axios";
import cookieParser from "cookie-parser";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import fs from "node:fs";
import path from "node:path";

const instance = axios.create({
  baseURL: process.env.API_BASEURL,
  withCredentials: true,
});

class API_SSR_Repository {
  constructor(_cookieHeader) {
    this._cookieHeader = _cookieHeader;
  }

  async getCurrent() {
    const { data: result } = await instance.get("/api/v2/auth/user", {
      headers: {
        cookie: this._cookieHeader,
      },
    });

    return result;
  }

  async getForumThemes() {
    const {
      data: { data: result },
    } = await instance.get("/forum/themes/", {
      headers: {
        cookie: this._cookieHeader,
      },
    });

    return result;
  }
}

export async function startServer() {
  const port = Number(process.env.CLIENT_PORT) || 3000;
  const isProd = process.env.NODE_ENV === "production";
  const root = process.cwd();
  const app = express();

  app.use(cookieParser());

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;

  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(path.resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use(
    "/api/v2",
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        "*": "",
      },
      target: process.env.API_BASEURL,
    })
  );

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, ssrModule;

      if (!isProd) {
        template = fs.readFileSync(path.resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        ssrModule = await vite.ssrLoadModule("/src/entry-server.tsx");
      } else {
        template = fs.readFileSync(path.resolve("dist/client/index.html"), "utf-8");
        ssrModule = await import("./dist/server/entry-server.cjs");
      }

      const { render } = ssrModule;
      const response = await instance
        .post("/theme", { themeUID: req.cookies.themeUID })
        .catch((err) => console.log(err));
      const { theme } = response.data.data.theme;
      const { themeUID: themeUIDServer } = response.data.data;

      const { html, emotionCss, initialState } = await render(
        url,
        theme,
        new API_SSR_Repository(req.headers["cookie"])
      );
      const htmlWithReplacements = template
        .replace(`<!--app-html-->`, html)
        .replace(`<!--emotionCss-->`, emotionCss)
        .replace(`<!--store-data-->`, JSON.stringify(initialState).replace(/</g, "\\u003c"));

      if (req.cookies.themeUID === themeUIDServer) {
        res.status(200).set({ "Content-Type": "text/html" }).end(htmlWithReplacements);
      } else {
        res
          .cookie("themeUID", themeUIDServer, {
            maxAge: 3600000 * 24 * 365, // 1 час * 24 * 365
            httpOnly: true,
            domain: req.hostname === "localhost" ? `${req.hostname}` : `.${req.hostname}`,
          })
          .status(200)
          .set({ "Content-Type": "text/html" })
          .end(htmlWithReplacements);
      }
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    console.log(`➜ 🎸 ClientServer is listening on http://localhost:${port}`);
  });
}

startServer();
