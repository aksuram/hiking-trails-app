import { createTheme, LinkProps, Theme } from "@mui/material";
import * as React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

//API
export const API_URL = "https://localhost:7101/api/";

//LOCALIZATION
export const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const countryCode = "lt-LT";
export const unknownErrorMessage = "Įvyko nežinoma klaida";

const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return (
    <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
  );
});

//THEMING
export const theme = createTheme({
  palette: {
    background: {
      default: "#FAFAFA",
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
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
  },
  shadows: [
    "none",
    "0  5px 10px rgba(154,160,185,0.15)",
    "0 15px 40px rgba(166,173,201,0.3)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
});
