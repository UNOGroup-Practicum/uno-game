import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import { Theme } from "../db";

const nanoid = customAlphabet("1234567890", 6);

export async function getTheme(req: Request, res: Response) {
  const themeArray = Object.entries(req.cookies).find((item) => item[0].includes("themeUID"));
  const themeUID = themeArray && themeArray[0];
  const theme = themeArray && themeArray[1];

  if (!themeUID && !theme) {
    const themeUID = `themeUID-${nanoid()}`;
    const theme = "dark";

    try {
      const createdData = await Theme.create({ themeUID, theme });

      if (createdData) {
        res
          .cookie(themeUID, theme, {
            maxAge: 3600000 * 24 * 365, // 1 час * 24 * 365
          })
          .status(200)
          .json({
            message: "themeUID cookie создан успешно",
          });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  } else if (themeUID && theme) {
    try {
      const foundData = await Theme.findOne({ where: { themeUID: themeUID } });

      if (foundData) {
        try {
          const updatedData = await Theme.update(
            {
              theme: theme,
            },
            { where: { themeUID: themeUID } }
          );

          if (updatedData[0] === 1) {
            res
              .cookie(themeUID, theme, {
                maxAge: 3600000 * 24 * 365, // 1 час * 24 * 365
              })
              .status(200)
              .json({ message: "themeUID cookie обновлён успешно" });
          } else {
            res.status(400).json({ message: "themeUID cookie не обновился" });
          }
        } catch (error) {
          res.status(500).json({ error: (error as Error).message });
        }
      } else {
        res.status(400).json({ message: "themeUID cookie не найден в базе данных" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
