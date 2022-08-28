import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import ContentContainer from "./components/ContentContainer";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Open Sans, sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider autoHideDuration={1000} preventDuplicate maxSnack={4}>
          <CssBaseline />
          <ContentContainer />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
