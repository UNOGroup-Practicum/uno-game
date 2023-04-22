import { Router } from "express";
import { getAllForumThemes, putForumTheme } from "../controllers/forum";

const router = Router();

router.get("/", getAllForumThemes);
router.put("/", putForumTheme);

export default router;
