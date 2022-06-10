import * as React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";

import { createTheme, LinkProps as MuiLinkProps } from "@mui/material";

//CHANGED ELEMENT BEHAVIOR
//Mui buttons and links should work properly for page changes like using react-router specific links
const NewLinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return (
    //TODO: Remove comment if it works properly
    //<RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
    <RouterLink ref={ref} to={href} {...other} />
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
        component: NewLinkBehavior,
      } as MuiLinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: NewLinkBehavior,
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
