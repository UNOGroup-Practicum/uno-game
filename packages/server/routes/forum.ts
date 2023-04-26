import { Router } from "express";
import { Forum } from "../controllers/forum";

const router = Router();

// темы
router.get("/", Forum.getThemes);
router.post("/theme", Forum.postTheme);
router.delete("/theme/:theme_id", Forum.deleteTheme);
// сообщения
router.get("/:theme_id", Forum.getThemeMessages);
router.post("/message", Forum.postThemeMessage);
// реакции
router.get("/message/:message_id", Forum.getMessageReactions);
router.post("/message/:message_id", Forum.postMessageReaction);
router.delete("/message/reaction/:reaction_id", Forum.deleteMessageReaction);

export default router;
