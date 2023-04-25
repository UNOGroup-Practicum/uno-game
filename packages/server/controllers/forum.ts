import { Request, Response } from "express";
import { ForumMessage, ForumTheme } from "../db";

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

export async function getAllForumThemes(_req: Request, res: Response) {
  try {
    let themes = await ForumTheme.findAll();
    if (!themes.length) {
      await createFirstForumTheme(res);
      themes = await ForumTheme.findAll();
    }
    res.status(200).json({ data: themes });
    return;
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
export async function postForumTheme(req: Request, res: Response) {
  const { user_id, title } = req.body;
  try {
    const createdData = await ForumTheme.create({ user_id, title });

    if (createdData) {
      const themes = await ForumTheme.findAll();
      res.status(200).json({ data: themes });
    } else {
      res.status(400).json({ message: "theme not saved" });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
export async function deleteForumTheme(req: Request, res: Response) {
  try {
    if (req.params.theme_id) {
      const theme_id = +req.params.theme_id;
      // TODO: исправить типизацию
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const theme = await ForumTheme.findByPk(theme_id);
      if (theme) {
        await theme.destroy();
      } else {
        throw new Error("Тема не найдена!");
      }
      const themes = await ForumTheme.findAll();
      res.status(200).json({ data: themes });
    } else {
      throw new Error("Нет query-параметра!");
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
export async function getForumThemeMessages(req: Request, res: Response) {
  try {
    if (req.params.theme_id) {
      const theme_id = +req.params.theme_id;
      // TODO: исправить типизацию
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const messages = await ForumMessage.findAll({ where: { theme_id } });
      res.status(200).json({ data: messages });
    } else {
      throw new Error("Нет query-параметра!");
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
export async function postForumThemeMessage(req: Request, res: Response) {
  try {
    const createdData = await ForumMessage.create({ ...req.body });
    if (createdData) {
      const themes = await ForumMessage.findAll({ where: { theme_id: req.body.theme_id } });
      res.status(200).json({ data: themes });
    } else {
      res.status(400).json({ message: "message not saved" });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
