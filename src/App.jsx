import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { storeContext } from "./store";

// const List = observer((props) => (
//   <ul>
//     {props.store.map((subject) => (
//       <div key={subject.id}>
//         <li>{subject.name}</li>
//         <button onClick={() => subject.remove()}>Delete</button>
//         <button onClick={() => subject.edit("bye bye")}>Edit</button>
//       </div>
//     ))}
//   </ul>
// ));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default observer(() => {
  const store = useContext(storeContext);
  const [state, setState] = React.useState();
  const [state1, setState1] = React.useState();
  const [state2, setState2] = React.useState();
  console.log(store);
  const drawerWidth = 240;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Drawer
        sx={{
          width: drawerWidth,
          position: "relative",

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            px: 2,
            py: 2,
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <Button variant="outlined" size="large" sx={{ my: 3 }}>
          <Typography fontWeight={700}>Add new Subject</Typography>
        </Button>
        <Divider sx={{ mx: -2 }} />
        <List>
          {store.subjects.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <ListItemText primary={text} color="primary" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ ml: `${drawerWidth}px`, pt: 5 }}>
        <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
      {/* <List store={store.subjects} />
      <input type="text" onChange={(e) => setState(e.target.value)} />
      <button onClick={() => store.addSubject(state)}>add</button>
      {store.subjects.length > 0 && store.subjects[0].topics && (
        <>
        <List store={store.subjects[0].topics} />
          <input type="text" onChange={(e) => setState1(e.target.value)} />
          <select value={state2} onChange={(e) => setState2(e.target.value)}>
          <option value="">Select Subject</option>
          {store.subjects.map((subject) => (
              <option value={subject.id}>{subject.name}</option>
            ))}
          </select>

          <button
            onClick={() =>
              store.subjects[
                store.subjects.findIndex((i) => i.id === state2)
              ].addTopic(state1)
            }
          >
            add
          </button>
        </>
      )}
      {store.subjects.length > 0 &&
        store.subjects[store.subjects.findIndex((i) => i.id === state2)]?.topics
          .length > 0 && (
          <>
            <List
              store={
                store.subjects[store.subjects.findIndex((i) => i.id === state2)]
                  .topics
              }
            />
            <input type="text" onChange={(e) => setState1(e.target.value)} />
            <select value={state2} onChange={(e) => setState2(e.target.value)}>
              <option value="">Select Subject</option>
              {store.subjects.map((subject) => (
                <option value={subject.id}>{subject.name}</option>
              ))}
            </select>

            <button
              onClick={() =>
                store.subjects[
                  store.subjects.findIndex((i) => i.id === state2)
                ].addTopic(state1)
              }
            >
              add
            </button>
          </>
        )} */}
    </div>
  );
});
