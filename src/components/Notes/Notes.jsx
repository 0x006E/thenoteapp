import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import NoData from "../NoData";
import Note from "./Note";

function Notes(props) {
  const { topic } = props;

  return topic.notes.length > 0 ? (
    <Box
      display={"flex"}
      gap={2}
      flexWrap={"wrap"}
      sx={{ p: 3, overflowY: "scroll", maxHeight: "100%" }}
    >
      {topic.notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </Box>
  ) : (
    <NoData text={"You have not created any notes for this topic yet!"} />
  );
}

export default observer(Notes);
