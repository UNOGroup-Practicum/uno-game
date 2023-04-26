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
        <Avatar alt="Avatar" src={messageData.messageCreatorUser.avatar} />
        <p className={styles.MessageItem__user_username}>
          {messageData.messageCreatorUser.display_name}
        </p>
      </div>

      <p className={styles.MessageItem__text}>{messageData.messageText}</p>

      <p
        className={styles.MessageItem__text + " " + styles.MessageItem__data}
        suppressHydrationWarning={true}
      >
        Cообщение написано {messageData.messageCreationDate.toLocaleString("ru", timeOptions)}
      </p>
    </div>
  );
};
