import React, { useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";
import { ThemeProvider as ThemeProviderMui, createTheme } from "@mui/material/styles";
import { muiPallete, setGlobalStyles } from "./muiPallete";
import { muiComponents } from "./muiComponents";
import { muiTypography } from "./muiTypography";

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK;

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const themeMui = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          ...muiPallete(theme),
        },
        components: { ...muiComponents(theme) },
        typography: { ...muiTypography() },
      }),
    [theme]
  );

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  );

  return (
    <ThemeProviderMui theme={themeMui}>
      {setGlobalStyles(themeMui)}
      <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
    </ThemeProviderMui>
  );
};

export default ThemeProvider;
