import React from "react";
import { NavLink } from "react-router-dom";

import { ThemeType } from "services/api/types";

import { ROUTES } from "../../../constants";
import { timeOptions } from "../helpers/timeOptions";

import styles from "./ThemeItem.module.scss";

export const ThemeItem: React.FC<ThemeType> = ({ id, title, createdAt }) => {
  return (
    <div className={styles.themeItem}>
      <div className={styles.themeItem__wrapper}>
        <NavLink to={`${ROUTES.forum.path}/${id}`}>{title}</NavLink>
        <p className={styles.item__wrapper_descr} suppressHydrationWarning={true}>
          {new Date(createdAt).toLocaleString("ru", timeOptions)}
        </p>
      </div>
    </div>
  );
};
