import { Router } from "express";
import { getTheme } from "../controllers/themes";

const router = Router();

router.get("/", getTheme);

export default router;
