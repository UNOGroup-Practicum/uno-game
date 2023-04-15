import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { Theme } from "../db";

async function createTheme(res: Response) {
  const themeUID = nanoid();
  const theme = "dark";

  try {
    const createdData = await Theme.create({ themeUID, theme });

    if (createdData) {
      res
        .cookie("themeUID", themeUID, {
          maxAge: 3600000 * 24 * 365, // 1 час * 24 * 365
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .json({
          data: { theme },
        });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function getTheme(req: Request, res: Response) {
  const themeUID = req.cookies.themeUID;

  if (!themeUID) {
    createTheme(res);
  } else {
    try {
      const theme = await Theme.findOne({ where: { themeUID: themeUID }, attributes: ["theme"] });

      if (theme) {
        res.status(200).json({ data: theme });
      } else {
        createTheme(res);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export async function putTheme(req: Request, res: Response) {
  const themeUID = req.cookies.themeUID;
  const { theme } = req.body.data;

  try {
    const updatedData = await Theme.update(
      {
        theme,
      },
      { where: { themeUID: themeUID } }
    );

    if (updatedData[0] === 1) {
      res.status(200).json({ data: theme });
    } else {
      res.status(400).json({ message: "theme is not updated" });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
