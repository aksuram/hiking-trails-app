import "moment/locale/lt";
import "./index.css";

import * as moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";

import App from "./Components/Main/App";
import UserProvider from "./Components/Main/UserProvider";
import { theme } from "./Utilities/theme";

moment.locale("lt");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);
