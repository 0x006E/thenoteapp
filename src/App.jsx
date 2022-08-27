import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import hello from "./api/subject";
import ContentContainer from "./components/ContentContainer";
import Notifier from "./components/Notifier";
import RouterPaths from "./components/RouterPaths";
import Sidebar from "./components/Sidebar";

function App() {
  hello();
  const theme = createTheme({
    typography: {
      fontFamily: "Open Sans, sans-serif",
    },
  });
  return (
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
        <ContentContainer sidebarWidth={240}>
          <Sidebar />
          <RouterPaths />
        </ContentContainer>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
