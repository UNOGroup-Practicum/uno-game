import { createTheme, ThemeProvider as ThemeProviderMui } from "@mui/material/styles";

import React, { useEffect, useMemo, useState } from "react";

import { themeAPI } from "services/api/themeApi";

import { muiComponents } from "./muiComponents";
import { muiPallete, setGlobalStyles } from "./muiPallete";
import { muiTypography } from "./muiTypography";
import { Theme, ThemeContext } from "./ThemeContext";

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    themeAPI
      .getTheme()
      .then((res) => {
        if (res.statusText === "OK") {
          const { theme } = res.data.data;
          setTheme(theme);
        }
      })
      .catch((err) => console.log(err));
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
