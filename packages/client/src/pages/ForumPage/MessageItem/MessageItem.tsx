import { Avatar } from "@mui/material";

import React from "react";

import { timeOptions } from "../helpers/timeOptions";
import { MessageType } from "../types/types";

import styles from "./MessageItem.module.scss";

type PropsType = {
  messageData: MessageType;
};
export const MessageItem: React.FC<PropsType> = ({ messageData }) => {
  return (
    <div className={styles.MessageItem}>
      <div className={styles.MessageItem__user}>
        <Avatar alt="Avatar" src={`${__API_ENDPOINT__}/resources${messageData.user_avatar}`} />
        <p className={styles.MessageItem__user_username}>{messageData.user_display_name}</p>
      </div>

      <p className={styles.MessageItem__text}>{messageData.message}</p>

      <p className={styles.MessageItem__text + " " + styles.MessageItem__data}>
        Сообщение написано {new Date(messageData.createdAt).toLocaleString("ru", timeOptions)}
      </p>
    </div>
  );
};
