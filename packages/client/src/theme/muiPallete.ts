import { Theme } from "./ThemeContext";

export const muiPallete = (mode: Theme) => {
  return mode === Theme.LIGHT
    ? {
        background: {
          paper: "coral",
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
        background: {
          paper: "#013d74",
        },
      };
};
