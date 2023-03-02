import { Container } from "@mui/material";
import styles from "./ForumPage.module.scss";
import { ForumThemesListPage } from "./ForumThemesListPage";
import { useNavigate, useParams } from "react-router-dom";
import { ForumMessagesListPage } from "./ForumMessagesListPage";
import { currentUserData, forumData } from "./data/data";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { MessageType, ThemeType } from "./types/types";

export const ForumPage: FC = () => {
  const [forumState, setForumState] = useState(forumData);
  const { themeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(forumState);
  }, [forumState]);

  const addTheme = (
    e: FormEvent<HTMLFormElement>,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
  ): void => {
    const { userId, username, avatar } = currentUserData;
    const lastTheme = forumState.at(-1);
    const lastId = lastTheme ? lastTheme.themeId : 0;

    const newTheme = {
      themeId: lastId + 1,
      themeCreatorUser: {
        userId,
        username,
        avatar,
      },
      themeTitle: title,
      themeCreationDate: new Date(),
      themeMessages: [],
    };

    setForumState([...forumState, newTheme]);
    setTitle("");
    e.preventDefault();
  };

  const delTheme = (e: SyntheticEvent<HTMLButtonElement>, themeId: number): void => {
    setForumState(forumState.filter((theme) => theme.themeId !== themeId));

    navigate("/forum");
    e.preventDefault();
  };

  const addMessage = (
    e: FormEvent<HTMLFormElement>,
    text: string,
    themeData: ThemeType,
    setText: Dispatch<SetStateAction<string>>
  ): void => {
    const { userId, username, avatar } = currentUserData;
    const lastMessage = themeData.themeMessages.at(-1);
    const lastId = lastMessage ? lastMessage.messageId : 0;

    const newMessage: MessageType = {
      messageId: lastId + 1,
      messageCreatorUser: {
        userId,
        username,
        avatar,
      },
      messageText: text,
      messageCreationDate: new Date(),
    };

    const newTheme: ThemeType = {
      ...themeData,
      themeMessages: [...themeData.themeMessages, newMessage],
    };

    setForumState(
      forumState.map((theme) => {
        return theme.themeId === themeData.themeId ? newTheme : theme;
      })
    );
    setText("");
    e.preventDefault();
  };

  let themeData;

  if (themeId) {
    themeData = forumState.filter((item) => item.themeId == +themeId);
  }

  return (
    <div className={styles.ForumPage}>
      <Container maxWidth="md">
        {themeData ? (
          <ForumMessagesListPage
            themeData={themeData[0]}
            addMessage={addMessage}
            delTheme={delTheme}
          />
        ) : (
          <ForumThemesListPage forumState={forumState} addTheme={addTheme} />
        )}
      </Container>
    </div>
  );
};
