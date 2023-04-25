import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Container, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { forumSelect, forumThunks } from "services/slices/forum-slice";

import { ROUTES } from "../../constants";

import { MessageItem } from "./MessageItem/MessageItem";

import styles from "./ForumPage.module.scss";
import stylesMessageItem from "./MessageItem/MessageItem.module.scss";

export const ForumMessagesListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const { themes, currentMessages } = useSelector(forumSelect);
  const { user } = useSelector(authSelect);
  const { themeId } = useParams<string>();

  // TODO: исправить типизацию
  // @ts-ignore
  const { user_id, title } = themes.find((theme) => theme.id === +themeId);

  useEffect(() => {
    // TODO: исправить типизацию
    // @ts-ignore
    dispatch(forumThunks.getForumCurrentMessages(+themeId));
  }, []);

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
    // TODO: исправить типизацию
    // @ts-ignore
    dispatch(forumThunks.deleteForumTheme(+themeId));
    navigate(ROUTES.forum.path);
  };

  return (
    <Container maxWidth="md" data-testid="page-forum-messages">
      <main className={styles.ForumPage}>
        <div className={styles.ForumPage_wrapper}>
          <div className={stylesMessageItem.MessageItem__user}>
            <Avatar alt="Avatar" src={`${__API_ENDPOINT__}/resources${user?.avatar}`} />
            <p className={stylesMessageItem.MessageItem__user_username}>{user?.displayName}</p>
          </div>
          {user_id && user?.id === user_id && (
            <Button onClick={delTheme} variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Удалить тему
            </Button>
          )}
        </div>

        <h2 className={styles.ForumPage__header}>
          <NavLink to={ROUTES.forum.path}>{"<"}</NavLink>
          {title}
        </h2>

        {currentMessages.map((item) => (
          <MessageItem key={item.id} messageData={item} />
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
