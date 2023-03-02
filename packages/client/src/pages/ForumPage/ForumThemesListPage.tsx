import styles from "./ForumPage.module.scss";
import { ThemeItem } from "./ThemeItem/ThemeItem";
import React from "react";
import { Button, Container, TextField } from "@mui/material";
import { forumData } from "./data/data";

export const ForumThemesListPage: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    title.length ? setIsDisabled(false) : setIsDisabled(true);
  }, [title]);

  const addTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisabled) {
      console.log(title);
      setTitle("");
    }
  };

  return (
    <Container maxWidth="md">
      <main className={styles.ForumPage}>
        <h2 className={styles.ForumPage__header}>Форум</h2>

        <form className={styles.ForumPage__form} onSubmit={(e) => addTheme(e)}>
          <TextField
            name={"title"}
            className={styles.ForumPage__form_input}
            placeholder={"Создать новую тему"}
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
            variant="outlined"
            type="search"
            size="small"
          />
          <Button size="small" variant="contained" type="submit" disabled={isDisabled}>
            Добавить
          </Button>
        </form>

        {forumData.map((item) => (
          <ThemeItem key={item.themeId} {...item} />
        ))}
      </main>
    </Container>
  );
};
