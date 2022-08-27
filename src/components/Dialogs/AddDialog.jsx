import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

function AddDialog(props) {
  const {
    open = false,
    onClose,
    title,
    content,
    onAdd,
    label,
    multiline = false,
    rows = 1,
  } = props;
  const [state, setState] = useState("");

  const handleSubmit = () => {
    onAdd(state);
    onClose();
  };

  useEffect(() => {
    if (open) setState("");
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={label}
          type="text"
          fullWidth
          variant="standard"
          multiline={multiline}
          rows={rows}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
