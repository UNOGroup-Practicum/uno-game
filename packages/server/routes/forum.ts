import { Router } from "express";
import { getAllForumThemes, getForumThemeMessages, putForumTheme } from "../controllers/forum";

const router = Router();

router.get("/", getAllForumThemes);
router.put("/", putForumTheme);

router.get("/", getForumThemeMessages);

export default router;
