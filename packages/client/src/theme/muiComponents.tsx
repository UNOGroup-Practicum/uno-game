import { forwardRef } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import { muiPallete } from "./muiPallete";
import { Theme } from "./ThemeContext";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const muiComponents = (theme: Theme) => {
  const pallete = muiPallete(theme);

  return {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      styleOverrides: {
        containedSuccess: {
          color: pallete.success?.contrastText,
        },
        sizeLarge: {
          fontSize: "2rem",
          fontWeight: "400",
          padding: "1rem 3rem",
        },
      },
    },
  };
};