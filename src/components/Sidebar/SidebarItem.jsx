import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function SidebarItem(props) {
  const { text, to, onOptionsClick, selected = false } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" aria-label="options" onClick={onOptionsClick}>
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton component={renderLink} selected={selected}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export default SidebarItem;
