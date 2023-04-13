import { createTheme, ThemeProvider as ThemeProviderMui } from "@mui/material/styles";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { themeAPI } from "services/api/themeApi";
import { getThemeCookie } from "utils/themeCookie";

import { muiComponents } from "./muiComponents";
import { muiPallete, setGlobalStyles } from "./muiPallete";
import { muiTypography } from "./muiTypography";
import { Theme, ThemeContext } from "./ThemeContext";

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const refCountRender = useRef(0);

  useEffect(() => {
    if (refCountRender.current === 0) {
      const theme = getThemeCookie().theme as Theme;

      if (theme) {
        setTheme(theme);
      } else {
        themeAPI
          .getTheme()
          .then((res) => {
            if (res.statusText === "OK") {
              setTheme(theme);
            }
          })
          .catch((err) => console.log(err));
      }
    }
    refCountRender.current++;
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
