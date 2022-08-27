import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Drawer, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { default as React, useContext } from "react";
import { storeContext } from "../../store";
import { AddDialog } from "../Dialogs";

import SidebarList from "./SidebarList";

function Sidebar(props) {
  const { width = 240 } = props;
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const store = useContext(storeContext);

  return (
    <Drawer
      sx={{
        width: width,
        position: "relative",

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <Button
        variant="contained"
        size="large"
        sx={{ my: 3, mx: 2 }}
        onClick={() => setOpenAddDialog(true)}
        startIcon={<AddIcon />}
      >
        <Typography fontWeight={700}>New Subject</Typography>
      </Button>
      <Divider />
      <SidebarList />
      <AddDialog
        open={openAddDialog}
        title={"Add a new Subject"}
        content={"Enter the name of the new subject: "}
        label={"Subject Name"}
        onClose={() => setOpenAddDialog(false)}
        onAdd={(name) => {
          store.addSubject(name);
        }}
      />
    </Drawer>
  );
}

export default observer(Sidebar);
