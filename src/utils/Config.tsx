import { createTheme, Theme } from "@mui/material";

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

//THEMING
export const theme: Theme = createTheme({
  palette: {
    background: {
      default: "#FAFAFA",
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
