import { GlobalStyles, Theme as ThemeMui } from "@mui/material";
import { Theme } from "./ThemeContext";

export const muiPallete = (mode: Theme) => {
  return mode === Theme.LIGHT
    ? {
        background: {
          paper: "coral",
        },
        success: {
          light: "#4caf50",
          main: "#2e7d32",
          dark: "#1b5e20",
          contrastText: "#fff",
        },
      }
    : {
        primary: {
          light: "#013d74",
          main: "#01386a",
          dark: "#061e3a",
          contrastText: "#fff",
        },
        secondary: {
          light: "#abd6fd",
          main: "#7896b1",
          dark: "#3d6a92",
          contrastText: "#fff",
        },
        success: {
          light: "#4caf50",
          main: "#2e7d32",
          dark: "#1b5e20",
          contrastText: "#fff",
        },
        background: {
          paper: "#01386a",
        },
      };
};

export const setGlobalStyles = (theme: ThemeMui) => (
  <GlobalStyles
    styles={{
      ".app.dark, .app.light": {
        "--bg-color": theme.palette.background.default,
        "--text-color": theme.palette.primary.contrastText,
        "--primary-light-color": theme.palette.primary.light,
        "--primary-main-color": theme.palette.primary.main,
        "--primary-dark-color": theme.palette.primary.dark,
        "--primary-contrast-text": theme.palette.primary.contrastText,
        "--secondary-light-color": theme.palette.secondary.light,
        "--secondary-main-color": theme.palette.secondary.main,
        "--secondary-dark-color": theme.palette.secondary.dark,
        "--secondary-contrast-text": theme.palette.secondary.contrastText,
      },
    }}
  />
);
