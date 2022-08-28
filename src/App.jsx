import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import ContentContainer from "./components/ContentContainer";
import Notifier from "./components/Notifier";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Open Sans, sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          maxSnack={3}
        >
          <Notifier />
          <CssBaseline />
          <ContentContainer />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
