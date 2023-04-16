import { Router } from "express";
import { getTheme, putTheme } from "../controllers/themes";

const router = Router();

router.post("/", getTheme);
router.put("/", putTheme);

export default router;
