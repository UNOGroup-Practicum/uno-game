import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Container, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { ROUTES } from "../../constants";

import { currentUserData, forumData } from "./data/data";
import { MessageItem } from "./MessageItem/MessageItem";

import styles from "./ForumPage.module.scss";
import stylesMessageItem from "./MessageItem/MessageItem.module.scss";

export const ForumMessagesListPage: React.FC = () => {
  const [text, setText] = useState("");
  const { themeId } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);

  const themeData = forumData.filter((item) => Number(item.themeId) === Number(themeId))[0];

  useEffect(() => {
    text.length ? setIsDisabled(false) : setIsDisabled(true);
  }, [text]);

  const addMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisabled) {
      // здесь будет отправка сообщения
      console.log(text);

      setText("");
    }
  };

  const delTheme = () => {
    console.log(`Theme ${themeData.themeId} deleted`);
  };

  return (
    <Container maxWidth="md" data-testid="page-forum-messages">
      <main className={styles.ForumPage}>
        <div className={styles.ForumPage_wrapper}>
          <div className={stylesMessageItem.MessageItem__user}>
            <Avatar alt="Avatar" src={themeData.themeCreatorUser.avatar} />
            <p className={stylesMessageItem.MessageItem__user_username}>
              {themeData.themeCreatorUser.display_name}
            </p>
          </div>
          {themeData.themeCreatorUser.id === currentUserData.id && (
            <Button onClick={delTheme} variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Удалить тему
            </Button>
          )}
        </div>

        <h2 className={styles.ForumPage__header}>
          <NavLink to={ROUTES.forum.path}>{"<"}</NavLink>
          {themeData.themeTitle}
        </h2>

        {themeData.themeMessages.map((item) => (
          <MessageItem key={item.messageId} messageData={item} />
        ))}

        <form className={styles.ForumPage__form} onSubmit={addMessage}>
          <TextField
            className={styles.ForumPage__form_input}
            multiline
            variant="outlined"
            type="search"
            value={text}
            placeholder={"Отправить сообщение"}
            name="title"
            size="small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setText(event.target.value);
            }}
          />
          <Button
            size="small"
            variant="contained"
            type="submit"
            color="warning"
            disabled={isDisabled}
          >
            Отправить
          </Button>
        </form>
      </main>
    </Container>
  );
};
