import { Request, Response } from "express";
import { ForumTheme } from "../db";

export async function getAllForumThemes(_req: Request, res: Response) {
  try {
    const themes = await ForumTheme.findAll();
    res.status(200).json({ data: themes });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
}
export async function putForumTheme(req: Request, res: Response) {
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
