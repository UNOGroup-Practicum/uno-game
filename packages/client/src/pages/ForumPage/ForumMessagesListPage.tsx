import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { RequestMessage, ThemeType, User } from "services/api/types";
import { useDispatch } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { forumSelect, forumThunks } from "services/slices/forum-slice";

import { ROUTES } from "../../constants";

import { MessageForm } from "./MessageForm/MessageForm";
import { MessageItem } from "./MessageItem/MessageItem";

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
  const user = useSelector(authSelect).user as User;
  const themeId = useParams().themeId as string;
  const { user_id, title } = themes.find((theme) => theme.id === +themeId) as ThemeType;

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(forumThunks.getMessages(+themeId));
  }, []);

  const addMessage: AddMessageType = (e, text, parent_message_id, parent_message_text) => {
    e.preventDefault();
    const data: RequestMessage = {
      theme_id: +themeId,
      user_id: user.id,
      user_display_name: user.displayName,
      user_avatar: user.avatar,
      message: text,
      parent_message_id,
      parent_message_text,
    };
    dispatch(forumThunks.postMessage(data));
  };

  const delTheme = () => {
    dispatch(forumThunks.deleteTheme(+themeId));
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
            <IconButton aria-label="delete" color="error" onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          )}
        </h2>
        {currentMessages.map((item) => (
          <MessageItem key={item.id} messageData={item} addMessage={addMessage} />
        ))}
        <MessageForm addMessage={addMessage} />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Вы действительно хотите удалить эту тему?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              При удалении темы, будут удалены также все сообщения в этой теме. Отменить данное
              действие будет невозможно!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Отменить
            </Button>
            <Button onClick={delTheme} color="error">
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </Container>
  );
};
