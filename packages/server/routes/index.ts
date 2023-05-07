import { NextFunction, Request, Response, Router } from "express";
import theme from "./theme";
import forum from "./forum";
import { ApiError, YandexAPIService } from "../api/YandexAPIService";

export const checkIsUserAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  const apiService = new YandexAPIService(req.headers["cookie"]);
  try {
    const user = await apiService.getCurrentUser();
    switch (req.body?.user_id) {
      case user.id:
        req.body.user = user;
        next();
        break;
      case undefined:
        next();
        break;
      default:
        res.status(400).json({ error: "Пользователь не найден!" });
    }
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.status).set({ "Content-Type": "text/html" }).end(error.message);
      return;
    }
    res.status(500).end();
    return;
  }
};

const router = Router();

router.use("/theme", theme);
router.use("/forum", (req, res, next) => checkIsUserAuthorized(req, res, next), forum);

router.use("/*", (req, res) =>
  res.status(400).json({ requestMethod: req.method, message: `Роут не найден` })
);

export default router;
