import { Button, Container, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";

import { forumData } from "./data/data";
import { ThemeItem } from "./ThemeItem/ThemeItem";

import styles from "./ForumPage.module.scss";

export const ForumThemesListPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    title.length ? setIsDisabled(false) : setIsDisabled(true);
  }, [title]);

  const addTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisabled) {
      // здесь будет создание темы
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
            className={styles.ForumPage__form_input}
            multiline
            name={"title"}
            placeholder={"Создать новую тему"}
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
            variant="outlined"
            type="search"
            size="small"
          />
          <Button
            size="small"
            variant="contained"
            type="submit"
            color="warning"
            disabled={isDisabled}
          >
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
