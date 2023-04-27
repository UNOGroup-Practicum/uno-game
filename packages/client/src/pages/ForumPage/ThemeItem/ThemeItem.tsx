import React from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../../../constants";
import { ending } from "../helpers/ending";
import { timeOptions } from "../helpers/timeOptions";
import { ThemeType } from "../types/types";

import styles from "./ThemeItem.module.scss";

type PropsType = ThemeType;

export const ThemeItem: React.FC<PropsType> = ({
  themeTitle,
  themeCreationDate,
  themeMessages,
  themeId,
}) => {
  return (
    <div className={styles.themeItem}>
      <div className={styles.themeItem__wrapper}>
        <NavLink to={`${ROUTES.forum.path}/${themeId}`}>{themeTitle}</NavLink>
        <p className={styles.item__wrapper_descr} suppressHydrationWarning={true}>
          {themeCreationDate.toLocaleString("ru", timeOptions)}
        </p>
      </div>

      <div>
        <p className={`${styles.themeItem__wrapper_descr} ${styles.themeItem__wrapper_count}`}>
          {themeMessages.length}
        </p>
        <p className={styles.themeItem__wrapper_descr}>{ending(themeMessages.length)}</p>
      </div>
    </div>
  );
};
