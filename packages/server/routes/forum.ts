import { Router } from "express";
import {
  getAllForumThemes,
  getForumThemeMessages,
  putForumTheme,
  deleteForumThemeById,
} from "../controllers/forum";

const router = Router();

router.get("/", getAllForumThemes);
router.put("/", putForumTheme);
router.get("/:theme_id", getForumThemeMessages);

router.delete("/:theme_id", deleteForumThemeById);

export default router;
