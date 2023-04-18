import { Router } from "express";
const router = Router();
import theme from "./theme";

router.use("/theme", theme);

router.use("/*", (req, res) =>
  res.status(400).json({ requestMethod: req.method, message: `Роут не найден` })
);

export default router;
