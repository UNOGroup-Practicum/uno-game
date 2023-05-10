import { Request, Response } from "express";
import { ForumMessage, ForumMessageReaction, ForumTheme } from "../db";

// создание базовой темы
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
  const reactionData = {
    theme_id: 1,
    message_id: 1,
    user_id: 224437,
  };

  try {
    await ForumTheme.create(themeData);
    await ForumMessage.create(messageData);
    await ForumMessageReaction.create(reactionData);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export const Forum = {
  // темы
  getThemes: async (_req: Request, res: Response) => {
    try {
      let themes = await ForumTheme.findAll();
      if (!themes.length) {
        // если нет ни одной темы, то создаём стартовую тему
        await createFirstForumTheme(res);
        themes = await ForumTheme.findAll();
      }
      res.status(200).json({ data: themes });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  postTheme: async (req: Request, res: Response) => {
    try {
      const user_id = req.body.user.id;
      const title = req.body.title;
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (theme?.user_id === req.body.user.id) {
        await theme?.destroy();
        const themes = await ForumTheme.findAll();
        res.status(200).json({ data: themes });
      } else {
        res.status(400).json({ error: "Пользователь не найден!" });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  // сообщения
  getMessages: async (req: Request, res: Response) => {
    try {
      const theme_id = +req.params.theme_id;
      const messages = await ForumMessage.findAll({ where: { theme_id } });
      const reactions = await ForumMessageReaction.findAll({ where: { theme_id } });
      res.status(200).json({ data: { messages, reactions } });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  postMessage: async (req: Request, res: Response) => {
    try {
      const { display_name, avatar } = req.body.user;
      const messageData = {
        ...req.body,
        user_display_name: display_name,
        user_avatar: avatar,
      };
      await ForumMessage.create({ ...messageData });
      const theme_id = +req.body.theme_id;
      const themes = await ForumMessage.findAll({ where: { theme_id } });
      res.status(200).json({ data: themes });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  // реакции
  getReactions: async (req: Request, res: Response) => {
    try {
      const theme_id = +req.params.theme_id;
      const reactions = await ForumMessageReaction.findAll({ where: { theme_id } });
      res.status(200).json({ data: reactions });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  postReaction: async (req: Request, res: Response) => {
    try {
      await ForumMessageReaction.create({ ...req.body });
      const theme_id = +req.body.theme_id;
      const reactions = await ForumMessageReaction.findAll({ where: { theme_id } });
      res.status(200).json({ data: reactions });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
  deleteReaction: async (req: Request, res: Response) => {
    try {
      const reaction_id = +req.params.reaction_id;
      const reaction = await ForumMessageReaction.findByPk(reaction_id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { user_id, theme_id } = reaction;
      if (user_id === req.body.user.id) {
        await reaction?.destroy();
        const reactions = await ForumMessageReaction.findAll({ where: { theme_id } });
        res.status(200).json({ data: reactions });
      } else {
        res.status(400).json({ error: "Пользователь не найден!" });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
};
