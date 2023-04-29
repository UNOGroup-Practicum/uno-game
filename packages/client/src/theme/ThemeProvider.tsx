import { createTheme, ThemeProvider as ThemeProviderMui } from "@mui/material/styles";

import React, { useMemo } from "react";

import { useDispatch, useSelector } from "services/hooks";
import { themeSlice } from "services/slices/themeSlice";

import { muiComponents } from "./muiComponents";
import { muiPallete, setGlobalStyles } from "./muiPallete";
import { muiTypography } from "./muiTypography";
import { Theme, ThemeContext } from "./ThemeContext";

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme: appTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const setTheme = (theme: Theme) => dispatch(themeSlice.actions.setTheme(theme));

  const themeMui = useMemo(
    () =>
      createTheme({
        palette: {
          mode: appTheme,
          ...muiPallete(appTheme),
        },
        components: { ...muiComponents(appTheme) },
        typography: { ...muiTypography() },
      }),
    [appTheme]
  );

  const defaultProps = useMemo(
    () => ({
      theme: appTheme,
      setTheme: setTheme,
    }),
    [appTheme]
  );

  return (
    <ThemeProviderMui theme={themeMui}>
      {setGlobalStyles(themeMui)}
      <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
    </ThemeProviderMui>
  );
};

export default ThemeProvider;
