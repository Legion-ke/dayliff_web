/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

import { ThemeProvider as MThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F3B4D",
    },
    success: {
      main: "#83BCAE",
      light: "#7cbdab1a",
    },
    secondary: {
      main: "#909094",
      dark: "#2F3033",
      light: "#e3e2e6",
    },
  },
});

export default function ThemeProvider({ children }) {
  return <MThemeProvider theme={theme}>{children}</MThemeProvider>;
}
