import styles from "./ForumPage.module.scss";
import { ThemeItem } from "./ThemeItem/ThemeItem";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeType } from "./types/types";

type PropsType = {
  forumState: ThemeType[];
  addTheme: (
    e: FormEvent<HTMLFormElement>,
    title: string,
    setText: Dispatch<SetStateAction<string>>
  ) => void;
};
export const ForumThemesListPage: FC<PropsType> = ({ forumState, addTheme }) => {
  const [title, setTitle] = useState("");

  return (
    <div className={styles.ForumPage}>
      <h2 className={styles.ForumPage__header}>
        <NavLink to={"/forum"}>Форум</NavLink>
      </h2>

      <form className={styles.ForumPage__form} onSubmit={(e) => addTheme(e, title, setTitle)}>
        <input
          name={"title"}
          className={styles.ForumPage__form_input}
          placeholder={"Создать новую тему"}
          value={title}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <button className={styles.ForumPage__form_btn} type="submit">
          Добавить
        </button>
      </form>

      {forumState.map((item) => (
        <ThemeItem key={item.themeId} {...item} />
      ))}
    </div>
  );
};
