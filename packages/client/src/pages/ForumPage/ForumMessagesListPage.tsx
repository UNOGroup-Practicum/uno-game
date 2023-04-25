import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Container, IconButton, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { forumSelect, forumThunks } from "services/slices/forum-slice";

import { ROUTES } from "../../constants";

import { MessageItem } from "./MessageItem/MessageItem";
import { RequestMessage } from "./types/types";

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

  const addMessage = (
    e: React.FormEvent<HTMLFormElement>,
    parent_message_id = null,
    parent_message_text = null
  ) => {
    e.preventDefault();
    if (!isDisabled) {
      // здесь будет отправка сообщения
      console.log(text);
      const data: RequestMessage = {
        theme_id: +themeId,
        user_id: user.id,
        user_display_name: user.displayName,
        user_avatar: user.avatar,
        message: text,
        parent_message_id,
        parent_message_text,
      };
      console.log(data);
      dispatch(forumThunks.postForumThemeMessage(data));

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
        <h2 className={styles.ForumPage__header}>
          <div>
            <NavLink to={ROUTES.forum.path}>{"<"}</NavLink>
            {title}
          </div>
          {user_id && user?.id === user_id && (
            <IconButton aria-label="delete" color="error" onClick={delTheme}>
              <DeleteIcon />
            </IconButton>
          )}
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
