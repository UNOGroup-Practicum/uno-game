import { Router } from "express";
import {
  getAllForumThemes,
  getForumThemeMessages,
  postForumTheme,
  deleteForumTheme,
  postForumThemeMessage,
} from "../controllers/forum";

const router = Router();

router.get("/", getAllForumThemes);
router.post("/theme", postForumTheme);
router.delete("/theme/:theme_id", deleteForumTheme);

router.get("/:theme_id", getForumThemeMessages);
router.post("/message", postForumThemeMessage);

export default router;
