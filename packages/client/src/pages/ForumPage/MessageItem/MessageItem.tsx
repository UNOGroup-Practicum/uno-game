import styles from "./MessageItem.module.scss";
import { MessageType } from "../types/types";
import React from "react";
import { Avatar } from "@mui/material";
import { timeOptions } from "../helpers/timeOptions";

type PropsType = {
  messageData: MessageType;
};
export const MessageItem: React.FC<PropsType> = ({ messageData }) => {
  return (
    <div className={styles.MessageItem}>
      <div className={styles.MessageItem__user}>
        <Avatar alt="Avatar" src={messageData.messageCreatorUser.avatar} />
        <p className={styles.MessageItem__user_username}>
          {messageData.messageCreatorUser.username}
        </p>
      </div>

      <p className={styles.MessageItem__text}>{messageData.messageText}</p>

      <p className={styles.MessageItem__text + " " + styles.MessageItem__data}>
        Cообщение написано {messageData.messageCreationDate.toLocaleString("ru", timeOptions)}
      </p>
    </div>
  );
};
