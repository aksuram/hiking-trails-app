import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, Theme, ThemeProvider } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
    },
  },
  shape: {
    borderRadius: 16,
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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);
