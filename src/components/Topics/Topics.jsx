import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Divider, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { storeContext } from "../../store";
import { AddDialog } from "../Dialogs";
import Error404 from "../Error404";
import NoData from "../NoData";
import TopicsHeader from "./TopicsHeader";

function Topics({ initial = false }) {
  const { subject: subjectId } = useParams();
  const store = useContext(storeContext);
  const subject = store.subjects.find((subject) => subject.id === subjectId);
  const [open, setOpen] = useState(false);

  return subject ? (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"end"}
        sx={{ width: "100%", px: 2, gap: 1 }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{ my: 3 }}
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
        >
          <Typography fontWeight={700}>New Topic</Typography>
        </Button>
        <AddDialog
          open={open}
          title={"Add a new Topic"}
          content={"Enter the name of the new topic: "}
          label={"Topic Name"}
          onClose={() => setOpen(false)}
          onAdd={(name) => {
            subject.addTopic(name);
          }}
        />
      </Box>
      <Divider />
      {subject.topics.length > 0 ? (
        <Box>
          <TopicsHeader subject={subject} topics={subject.topics} />
          <Outlet />
        </Box>
      ) : (
        <NoData text={"You have not created any topics for this subject"} />
      )}
    </Box>
  ) : initial ? (
    <NoData text={"You have not selected any subjects yet!"} />
  ) : (
    <Error404 />
  );
}

export default observer(Topics);
