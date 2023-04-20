import { Response } from "express";
import { ForumTheme } from "../db";

export async function getAllForumThemes(res: Response) {
  try {
    const themes = await ForumTheme.findAll();
    return res.status(200).json({ data: themes });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
}
