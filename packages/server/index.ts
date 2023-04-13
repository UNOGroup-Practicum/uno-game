import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "./security_helpers/cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { dbConnect } from "./db";
import router from "./routes/index";

const port = Number(process.env.SERVER_PORT) || 3001;

const app = express();
app.use(cookieParser());
app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnect();

app.use(router);

app.listen(port, () => {
  console.log(`➜ 🎸 BackendServer is listening on http://localhost:${port}`);
});
