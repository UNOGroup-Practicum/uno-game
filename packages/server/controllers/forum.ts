import { Request, Response } from "express";
import { ForumMessage, ForumMessageReaction, ForumTheme } from "../db";

async function createFirstForumTheme(res: Response) {
  const themeData = {
    user_id: 224437,
    title: "Вопросы разработчикам",
  };
  const messageData = {
    theme_id: 1,
    user_id: 224437,
    user_avatar:
      "/2185cd69-d06c-43c4-815e-20a7e1fa59c8/0ec6586e-6519-4e27-a1c3-d52fc90ec9a4_mainPhoto.jpg",
    user_display_name: "Evg",
    message: "Оставьте свой вопрос разработчикам!",
  };

  try {
    const createdThemeData = await ForumTheme.create(themeData);
    const createdMessageData = await ForumMessage.create(messageData);
    console.log("createdThemeData", createdThemeData);
    console.log("createdMessageData", createdMessageData);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export const Forum = {
  getThemes: async (_req: Request, res: Response) => {
    try {
      let themes = await ForumTheme.findAll();
      if (!themes.length) {
        await createFirstForumTheme(res);
        themes = await ForumTheme.findAll();
      }
      res.status(200).json({ data: themes });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  postTheme: async (req: Request, res: Response) => {
    const { user_id, title } = req.body;
    try {
      await ForumTheme.create({ user_id, title });
      const themes = await ForumTheme.findAll();
      res.status(200).json({ data: themes });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  deleteTheme: async (req: Request, res: Response) => {
    try {
      const theme_id = +req.params.theme_id;
      const theme = await ForumTheme.findByPk(theme_id);
      if (theme) {
        await theme.destroy();
      } else {
        throw new Error("Тема не найдена!");
      }
      const themes = await ForumTheme.findAll();
      res.status(200).json({ data: themes });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  getThemeMessages: async (req: Request, res: Response) => {
    try {
      const theme_id = +req.params.theme_id;
      const messages = await ForumMessage.findAll({ where: { theme_id } });
      res.status(200).json({ data: messages });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  postThemeMessage: async (req: Request, res: Response) => {
    try {
      const createdData = await ForumMessage.create({ ...req.body });
      if (createdData) {
        const theme_id = +req.body.theme_id;
        const themes = await ForumMessage.findAll({ where: { theme_id } });
        res.status(200).json({ data: themes });
      } else {
        res.status(400).json({ message: "message not saved" });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  getMessageReactions: async (req: Request, res: Response) => {
    try {
      const message_id = +req.params.message_id;
      const reactions = await ForumMessageReaction.findAll({ where: { message_id } });
      res.status(200).json({ data: reactions });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  postMessageReaction: async (req: Request, res: Response) => {
    try {
      await ForumMessageReaction.create({ ...req.body });
      const message_id = +req.body.message_id;
      const reactions = await ForumMessageReaction.findAll({ where: { message_id } });
      res.status(200).json({ data: reactions });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  deleteMessageReaction: async (req: Request, res: Response) => {
    try {
      const reaction_id = +req.params.reaction_id;
      const reaction = await ForumMessageReaction.findByPk(reaction_id);
      console.log("reaction", reaction);
      if (reaction) {
        await reaction.destroy();
      } else {
        throw new Error("Тема не найдена!");
      }
      // TODO: исправить типизацию
      // @ts-ignore
      const message_id = reaction.message_id;
      const reactions = await ForumMessageReaction.findAll({ where: { message_id } });
      res.status(200).json({ data: reactions });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
};
