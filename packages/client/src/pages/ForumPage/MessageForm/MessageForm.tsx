import { Button, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";

import { AddMessageType } from "../ForumMessagesListPage";

import styles from "./MessageForm.module.scss";

type MessageFormProps = {
  addMessage: AddMessageType;
  placeholder?: string;
  parent_message_id?: number;
  setIsComment?: (flag: boolean) => void;
};
export const MessageForm: React.FC<MessageFormProps> = ({
  addMessage,
  placeholder,
  parent_message_id,
  setIsComment,
}) => {
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    text.length ? setIsDisabled(false) : setIsDisabled(true);
  }, [text]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    addMessage(e, text, parent_message_id || null);
    setText("");
    if (setIsComment) {
      setIsComment(false);
    }
  };
  return (
    <form className={styles.Form} onSubmit={onSubmit}>
      <TextField
        className={styles.Form_input}
        multiline
        variant="outlined"
        type="search"
        value={text}
        placeholder={!placeholder ? "Отправить сообщение" : placeholder}
        name="title"
        size="small"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setText(event.target.value);
        }}
      />
      <Button size="small" variant="contained" type="submit" color="warning" disabled={isDisabled}>
        Отправить
      </Button>
    </form>
  );
};
