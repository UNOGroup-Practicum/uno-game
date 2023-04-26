import { Router } from "express";
import { Forum } from "../controllers/forum";

const router = Router();

router.get("/", Forum.getAllThemes);
router.post("/theme", Forum.postTheme);
router.delete("/theme/:theme_id", Forum.deleteTheme);

router.get("/:theme_id", Forum.getThemeMessages);
router.post("/message", Forum.postThemeMessage);

export default router;
