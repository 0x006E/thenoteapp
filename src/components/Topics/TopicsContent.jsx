import AddIcon from "@mui/icons-material/Add";
import { Box, Fab } from "@mui/material";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { storeContext } from "../../store";
import { AddDialog } from "../Dialogs";
import Error404 from "../Error404";
import Notes from "../Notes/Notes";

function TopicsContent() {
  const { subject: subjectId, topic: topicId } = useParams();
  const store = useContext(storeContext);
  const subject = store.subjects.find((subject) => subject.id === subjectId);
  const topic = subject
    ? subject.topics.find((topic) => topic.id === topicId)
    : null;

  const [open, setOpen] = useState(false);

  return topic ? (
    <Box
      sx={{
        position: "relative",
        height: "calc(100vh - 160px)",
        display: "block",
        overflow: "hidden",
      }}
    >
      <Notes topic={topic} />

      <Fab
        variant="extended"
        color="primary"
        sx={{ position: "absolute", right: 25, bottom: 25 }}
        size="large"
        onClick={() => setOpen(true)}
      >
        <AddIcon sx={{ mr: 1 }} />
        New Note
      </Fab>
      <AddDialog
        open={open}
        title={"Add a new Note"}
        content={"Enter the content of new note: "}
        label={"Note content"}
        multiline
        row={10}
        onClose={() => setOpen(false)}
        onAdd={(content) => {
          topic.addNote(content);
        }}
      />
    </Box>
  ) : (
    <Error404 text={"Can't find any topics like this!"} />
  );
}

export default observer(TopicsContent);
