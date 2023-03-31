import express from "express";
import fs from "node:fs";
import path from "node:path";

export async function startServer() {
  const port = Number(process.env.CLIENT_PORT) || 3000;
  const isProd = process.env.NODE_ENV === "production";
  const indexProd = isProd ? fs.readFileSync(path.resolve("dist/client/index.html"), "utf-8") : "";
  const root = process.cwd();

  const app = express();

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

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        template = fs.readFileSync(path.resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = indexProd;
        render = (await import("./dist/server/entry-server.cjs")).render;
      }

      const { html, emotionCss, initialState } = render(url);
      const htmlWithReplacements = template
        .replace(`<!--app-html-->`, html)
        .replace(`<!--emotionCss-->`, emotionCss)
        .replace(`<!--store-data-->`, JSON.stringify(initialState).replace(/</g, "\\u003c"));

      res.status(200).set({ "Content-Type": "text/html" }).end(htmlWithReplacements);
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

startServer();
