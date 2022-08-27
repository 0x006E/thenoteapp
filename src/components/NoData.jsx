import { Box, Typography } from "@mui/material";
import React from "react";
import NoDataIMG from "../assets/empty-folder.png";

function NoData(props) {
  const { text = "No data" } = props;
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      sx={{ height: "100%", py: 10 }}
    >
      <img src={NoDataIMG} style={{ width: "25%", minWidth: 250 }} />
      <Typography fontWeight={700} fontSize={30}>
        {text}
      </Typography>{" "}
    </Box>
  );
}

export default NoData;
