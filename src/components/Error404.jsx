import { Box, Typography } from "@mui/material";
import React from "react";
import error404 from "../assets/404.jpg";

function Error404(props) {
  const { text = "Page not found" } = props;
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      sx={{ height: "100%", py: 10 }}
    >
      <img src={error404} style={{ width: "25%", minWidth: 250 }} />
      <Typography fontWeight={700} fontSize={30}>
        {text}
      </Typography>
    </Box>
  );
}

export default Error404;
