import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ModifyDialog(props) {
  const {
    open = false,
    key = "name",
    item = { [`${key}`]: "" },
    onClose,
    title,
    content,
    label,
  } = props;
  const itemKeyValue = item?.[`${key}`] ? item[`${key}`] : "";
  const [state, setState] = useState(itemKeyValue);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEdit = () => {
    item?.id && item.edit(state);
    onClose();
  };
  const handleDelete = () => {
    const isNote = item?.content;
    item?.id && item.remove();
    //console.log(location.pathname);
    if (!isNote && location.pathname !== "/") {
      //      navigate(-1);
    }
    onClose();
  };

  useEffect(() => {
    if (open) setState(itemKeyValue);
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
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleEdit} startIcon={<EditIcon />}>
          Edit
        </Button>
        <Button startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModifyDialog;
