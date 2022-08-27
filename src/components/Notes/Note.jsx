import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

function Note(props) {
  const { note } = props;
  const { content = "" } = note;
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(content);

  const handleSubmit = () => {
    note.edit(value);
    setEdit(false);
  };

  const handleDelete = () => {
    note.remove();
    setEdit(false);
  };

  useEffect(() => {
    if (edit) setValue(content);
  }, [edit]);

  return (
    <Card
      sx={{
        width: 250,
        height: 250,
        overflow: "hidden",
      }}
      elevation={2}
    >
      <CardContent sx={{ height: "79%" }}>
        {edit ? (
          <TextField
            multiline
            fullWidth
            rows={9}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size="small"
            InputProps={{ sx: { p: 1, fontSize: "0.875rem" } }}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineBreak: "anywhere" }}
          >
            {content}
          </Typography>
        )}{" "}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        {edit && (
          <IconButton aria-label="cancel" onClick={() => setEdit(false)}>
            <CancelIcon />
          </IconButton>
        )}
        <IconButton
          aria-label="edit"
          onClick={edit ? handleSubmit : () => setEdit(true)}
          disabled={edit && value.trim() === ""}
        >
          {edit ? <SaveIcon /> : <EditIcon />}
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default observer(Note);
