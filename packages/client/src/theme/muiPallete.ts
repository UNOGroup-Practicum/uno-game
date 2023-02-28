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
        info: {
          main: "#01386a",
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
