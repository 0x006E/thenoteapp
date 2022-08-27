import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import a11yProps from "../../util/a11yProps";
import useRouteMatch from "../../util/useRouteMatch";
import { ModifyDialog } from "../Dialogs";

function TopicsHeader({ subject, topics = [] }) {
  const routeMatch = useRouteMatch(
    topics.map((topic) => `/${subject.id}/${topic.id}/`)
  );
  const currentTab = routeMatch?.pattern?.path;
  const [open, setOpen] = useState(false);
  const [topicSelected, setTopicSelected] = useState(null);

  const handleOptionsClick = (e, topic) => {
    e.preventDefault();
    e.stopPropagation();
    setTopicSelected(topic);
    setOpen(true);
  };

  const handleClose = () => {
    setTopicSelected(null);

    setOpen(false);
  };
  return !currentTab ? (
    <Navigate to={topics[0] ? topics[0].id : "/"} />
  ) : (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={currentTab}
        aria-label="Topics"
        variant="scrollable"
        scrollButtons={"auto"}
      >
        {topics.map((topic) => (
          <Tab
            label={
              <Box display="flex" justifyContent={"space-between"} width="100%">
                <Typography>{topic.name}</Typography>
                <IconButton
                  title="options"
                  sx={{ p: 0, ml: 1, mr: 0 }}
                  onClick={(e) => handleOptionsClick(e, topic)}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            }
            key={topic.id}
            value={`/${subject.id}/${topic.id}/`}
            to={topic.id}
            component={Link}
            {...a11yProps(0)}
            sx={{ p: 0, px: 1, br: 1, borderColor: "divider" }}
          />
        ))}
      </Tabs>
      <ModifyDialog
        open={open}
        item={topicSelected}
        title={"Modify Topic"}
        content={"Edit the name of the topic: "}
        label={"Topic Name"}
        onClose={handleClose}
      />
    </Box>
  );
}

export default observer(TopicsHeader);
