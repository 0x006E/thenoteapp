import { Backdrop, Box, CircularProgress } from "@mui/material";
import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { storeContext } from "../../store";
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
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar />
      <RouterPaths />
    </Box>
  );
}

export default observer(ContentContainer);
