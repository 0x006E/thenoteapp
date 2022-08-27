import { List } from "@mui/material";
import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { storeContext } from "../../store";
import useRouteMatch from "../../util/useRouteMatch";
import { ModifyDialog } from "../Dialogs";
import SidebarItem from "./SidebarItem";

function SidebarList() {
  const [open, setOpen] = useState(false);
  const [subjectSelected, setSubjectSelected] = useState(null);
  const store = useContext(storeContext);

  const routeMatch = useRouteMatch(store.subjects.map((subject) => subject.id));
  const currentTab = routeMatch?.pattern?.path;

  const handleOptionsClick = (subject) => {
    setSubjectSelected(subject);
    setOpen(true);
  };

  return !currentTab && routeMatch === "/" ? (
    <Navigate to={store.subjects.length > 0 ? store.subjects[0].id : "/"} />
  ) : (
    <List sx={{ p: 0 }}>
      {store.subjects.map((subject) => (
        <SidebarItem
          text={subject.name}
          key={subject.name}
          to={subject.id}
          onOptionsClick={() => handleOptionsClick(subject)}
          selected={currentTab === subject.id}
        />
      ))}
      <ModifyDialog
        open={open}
        item={subjectSelected}
        title={"Modify Subject"}
        content={"Edit the name of the subject: "}
        label={"Subject Name"}
        onClose={() => {
          setSubjectSelected(null);
          setOpen(false);
        }}
      />
    </List>
  );
}

export default observer(SidebarList);
