import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import { Avatar, IconButton, Typography } from "@mui/material";

import React, { useState } from "react";

import { AddMessageType } from "../ForumMessagesListPage";
import { timeOptions } from "../helpers/timeOptions";
import { MessageForm } from "../MessageForm/MessageForm";
import { MessageType } from "../types/types";

import { MessageReplyItem } from "./MessageReplyItem";

import styles from "./MessageItem.module.scss";

type PropsType = {
  messageData: MessageType;
  addMessage: AddMessageType;
};
export const MessageItem: React.FC<PropsType> = ({ messageData, addMessage }) => {
  const [isComment, setIsComment] = useState(false);

  return (
    <>
      <div className={styles.MessageItem}>
        <div className={styles.MessageItem__user}>
          <Avatar alt="Avatar" src={`${__API_ENDPOINT__}/resources${messageData.user_avatar}`} />
          <p className={styles.MessageItem__user_username}>{messageData.user_display_name}</p>
        </div>

        {messageData.parent_message_text && (
          <MessageReplyItem message={messageData.parent_message_text} />
        )}

        <p className={styles.MessageItem__text}>{messageData.message}</p>

        <p className={styles.MessageItem__text + " " + styles.MessageItem__data}>
          Сообщение написано {new Date(messageData.createdAt).toLocaleString("ru", timeOptions)}
        </p>
        <IconButton
          className={styles.MessageItem__reply}
          color="info"
          onClick={() => setIsComment(!isComment)}
        >
          <ReplyIcon />
        </IconButton>
        <IconButton className={styles.MessageItem__like} color="error">
          <FavoriteBorderIcon />
          <Typography variant="subtitle2" ml={1}>
            50
          </Typography>
        </IconButton>
      </div>
      {isComment && (
        <MessageForm
          addMessage={addMessage}
          placeholder={"Ответить"}
          parent_message_id={messageData.id}
          parent_message_text={messageData.message}
        />
      )}
    </>
  );
};
