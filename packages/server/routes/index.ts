import { Router } from "express";
import { YandexAPIService, ApiError } from "../api/YandexAPIService";
import theme from "./theme";
import forum from "./forum";

const router = Router();

router.use("/theme", theme);
router.use("/forum", forum);

/**
 * TODO: Удалить, роут когда будет не нужен
 * Пример роута с аутентификацией пользователя
 * Ручка для запроса с клиента - http://localhost:3001/api/forum
 */
router.use("/api/forum", async (req, res) => {
  const apiService = new YandexAPIService(req.headers["cookie"]);
  let user;

  try {
    user = await apiService.getCurrentUser();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.status).set({ "Content-Type": "text/html" }).end(error.message);

      return;
    }

    res.status(500).end();

    return;
  }

  console.log("HERE: ", user);

  res.status(200).set({ "Content-Type": "text/html" }).end("OK");
});

router.use("/*", (req, res) =>
  res.status(400).json({ requestMethod: req.method, message: `Роут не найден` })
);

export default router;
