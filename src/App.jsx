import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import ContentContainer from "./components/ContentContainer";
import { store } from "./store";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Open Sans, sans-serif",
    },
  });

  useEffect(() => {
    store.fetchData();
    console.log("hello");
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider autoHideDuration={4000} preventDuplicate maxSnack={8}>
          <CssBaseline />
          <ContentContainer />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
