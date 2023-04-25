import DeleteIcon from "@mui/icons-material/Delete";
import { Container, IconButton } from "@mui/material";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { forumSelect, forumThunks } from "services/slices/forum-slice";

import { ROUTES } from "../../constants";

import { MessageForm } from "./MessageForm/MessageForm";
import { MessageItem } from "./MessageItem/MessageItem";
import { RequestMessage } from "./types/types";

import styles from "./ForumPage.module.scss";

export type AddMessageType = (
  e: React.FormEvent<HTMLFormElement>,
  text: string,
  parent_message_id: number | null,
  parent_message_text: string | null
) => void;
export const ForumMessagesListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const addMessage: AddMessageType = (e, text, parent_message_id, parent_message_text) => {
    console.log("addMessage");
    e.preventDefault();
    // TODO: исправить типизацию
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
          <MessageItem key={item.id} messageData={item} addMessage={addMessage} />
        ))}

        <MessageForm addMessage={addMessage} />
      </main>
    </Container>
  );
};
