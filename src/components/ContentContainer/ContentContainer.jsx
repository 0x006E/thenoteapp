import { Box } from "@mui/material";
import React from "react";

function ContentContainer(props) {
  const { children, sidebarWidth } = props;
  return <Box sx={{ ml: `${sidebarWidth}px` }}>{children}</Box>;
}

export default ContentContainer;
