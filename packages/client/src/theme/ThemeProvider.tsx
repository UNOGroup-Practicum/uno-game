import { createTheme, ThemeProvider as ThemeProviderMui } from "@mui/material/styles";

import React, { useEffect, useMemo, useState } from "react";

import { muiComponents } from "./muiComponents";
import { muiPallete, setGlobalStyles } from "./muiPallete";
import { muiTypography } from "./muiTypography";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) {
      setTheme(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme);
    }
  }, []);

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
