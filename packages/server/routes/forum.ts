import { Router } from "express";
import { getAllForumThemes } from "../controllers/forum";

const router = Router();

router.get("/", getAllForumThemes);
// router.get("/", getTheme);
// router.put("/", putTheme);

export default router;
