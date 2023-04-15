import { useContext } from "react";

import { themeAPI } from "services/api/themeApi";

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
      setTheme(newTheme);
      themeAPI.putTheme(newTheme).catch((err) => console.log(err));
    }
  };

  return {
    theme,
    toggleTheme,
  };
}
