import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { storeContext } from "../../store";
import Notifier from "../Notifier";
import RouterPaths from "../RouterPaths";
import Sidebar from "../Sidebar";

function ContentContainer() {
  const store = useContext(storeContext);

  useEffect(() => {
    store.fetchData();
  }, []);

  return (
    <Box sx={{ ml: "240px" }}>
      <Backdrop
        sx={{
          color: "primary.main",
          opacity: 1,
          bgcolor: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={store.loading}
      >
        {!store.online ? (
          <Typography variant="h4" fontWeight={700} textAlign={"center"}>
            You are not connected to the internet
          </Typography>
        ) : (
          <CircularProgress color="inherit" />
        )}
      </Backdrop>
      <Notifier />
      <Sidebar />
      <RouterPaths />
    </Box>
  );
}

export default observer(ContentContainer);
