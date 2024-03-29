import { Button, Container, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "services/hooks";
import { forumSelect, forumThunks } from "services/slices/forum-slice";

import { ThemeItem } from "./ThemeItem/ThemeItem";

import styles from "./ForumPage.module.scss";

export const ForumThemesListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { themes } = useSelector(forumSelect);
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    dispatch(forumThunks.getThemes());
  }, []);

  useEffect(() => {
    title.length ? setIsDisabled(false) : setIsDisabled(true);
  }, [title]);

  const addTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisabled) {
      dispatch(forumThunks.postTheme(title));

      setTitle("");
    }
  };

  return (
    <Container maxWidth="md" data-testid="page-forum-main">
      <main className={styles.ForumPage}>
        <h2 className={styles.ForumPage__header}>Форум</h2>

        <form className={styles.ForumPage__form} onSubmit={(e) => addTheme(e)}>
          <TextField
            className={styles.ForumPage__form_input}
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

        {themes.map((theme) => (
          <ThemeItem key={theme.id} {...theme} />
        ))}
      </main>
    </Container>
  );
};
