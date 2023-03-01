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
      variants: [
        {
          props: { variant: "difColor" },
          style: {
            backgroundColor: theme == Theme.LIGHT ? pallete?.success?.main : "coral",
            width: "100%",
            color: pallete.success.contrastText,

            "&:hover": {
              backgroundColor: pallete.success?.dark,
            },
          },
        },
      ],
    },
    MuiInputBase: {
      styleOverrides: {},
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&:after": {
            borderBottomColor: theme == Theme.LIGHT ? pallete.info?.main : "coral",
          },
        },
      },
    },
    MuiFieldInput: {
      styleOverrides: {
        sizeNormal: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",

          "&.Mui-focused": {
            color: theme == Theme.LIGHT ? pallete.info?.main : "coral",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
        },
      },
    },
  };
};
