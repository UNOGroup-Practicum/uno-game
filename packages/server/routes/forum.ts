import { Router } from "express";
import { Forum } from "../controllers/forum";

const router = Router();

// темы
router.get("/themes/", Forum.getThemes);
router.post("/themes/", Forum.postTheme);
router.delete("/themes/:theme_id", Forum.deleteTheme);
// сообщения
router.get("/messages/:theme_id", Forum.getMessages);
router.post("/messages/", Forum.postMessage);
// реакции
router.get("/reactions/:theme_id", Forum.getReactions);
router.post("/reactions/", Forum.postReaction);
router.delete("/reactions/:reaction_id", Forum.deleteReaction);

export default router;
