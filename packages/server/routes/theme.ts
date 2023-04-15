import { Router } from "express";
import { getTheme, putTheme } from "../controllers/themes";

const router = Router();

router.get("/", getTheme);
router.put("/", putTheme);

export default router;
