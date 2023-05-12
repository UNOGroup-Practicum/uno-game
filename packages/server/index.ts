import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "./security_helpers/cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { dbConnect } from "./db";
import router from "./routes/index";
import { createProxyMiddleware } from "http-proxy-middleware";

const port = Number(process.env.SERVER_PORT) || 3001;
const app = express();

app.use(cookieParser());
app.use(cors);

app.use(
  "/api/v2",
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
      "*": process.env.COOKIE_DOMAIN_REWRITE as string,
    },
    target: process.env.API_YANDEX_BASEURL,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnect();

app.use(router);

app.listen(port, () => {
  console.log(`➜ 🎸 BackendServer is listening on http://localhost:${port}`);
});
