import styles from "./ForumPage.module.scss";
import stylesMessageItem from "./MessageItem/MessageItem.module.scss";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
  SyntheticEvent,
} from "react";
import { NavLink } from "react-router-dom";
import { ThemeType } from "./types/types";
import { MessageItem } from "./MessageItem/MessageItem";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { currentUserData } from "./data/data";

type PropsType = {
  themeData: ThemeType;
  addMessage: (
    e: FormEvent<HTMLFormElement>,
    title: string,
    themeData: ThemeType,
    setText: Dispatch<SetStateAction<string>>
  ) => void;
  delTheme: (e: SyntheticEvent<HTMLButtonElement>, themeId: number) => void;
};
export const ForumMessagesListPage: FC<PropsType> = ({ themeData, addMessage, delTheme }) => {
  const [text, setText] = useState("");

  return (
    <div className={styles.ForumPage}>
      <div className={styles.ForumPage_wrapper}>
        <div className={stylesMessageItem.MessageItem__user}>
          <Avatar alt="Avatar" src={themeData.themeCreatorUser.avatar} />
          <p className={stylesMessageItem.MessageItem__user_username}>
            {themeData.themeCreatorUser.username}
          </p>
        </div>
        {themeData.themeCreatorUser.userId === currentUserData.userId && (
          <Button
            onClick={(e: SyntheticEvent<HTMLButtonElement>) => delTheme(e, themeData.themeId)}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Удалить тему
          </Button>
        )}
      </div>

      <h2 className={styles.ForumPage__header}>
        <NavLink to={"/forum"}>{themeData.themeTitle}</NavLink>
      </h2>

      {themeData.themeMessages.map((item) => (
        <MessageItem key={item.messageId} messageData={item} />
      ))}

      <form
        className={styles.ForumPage__form}
        onSubmit={(e) => addMessage(e, text, themeData, setText)}
      >
        <input
          name={"title"}
          className={styles.ForumPage__form_input}
          placeholder={"Отправить сообщение"}
          value={text}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
          }}
        />
        <button className={styles.ForumPage__form_btn} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
};
