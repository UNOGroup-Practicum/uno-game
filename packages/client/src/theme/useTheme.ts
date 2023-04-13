import Cookies from "js-cookie";

import { useContext } from "react";

import { themeAPI } from "services/api/themeApi";
import { getThemeCookie } from "utils/themeCookie";

import { Theme, ThemeContext } from "./ThemeContext";

type UseThemeResult = {
  toggleTheme: () => void;
  theme: Theme;
};

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    if (setTheme) {
      const { themeUID } = getThemeCookie();
      Cookies.set(themeUID as string, newTheme);

      themeAPI
        .getTheme()
        .then((res) => {
          if (res.statusText === "OK") {
            setTheme(getThemeCookie().theme as Theme);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return {
    theme,
    toggleTheme,
  };
}
