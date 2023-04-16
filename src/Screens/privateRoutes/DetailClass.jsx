import {
  Tabs,
  Box,
  Tab,
  Typography,
  Divider,
  Button,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../Components/common/NavBar";
import { useLocation } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import subjectApi from "../../api/modules/subjects.api";
import { ToastContainer, toast } from "react-toastify";
import PostTab from "../../Components/common/PostTab";
import FilesTab from "../../Components/common/FilesTab";

const DetailClass = () => {
  const { state } = useLocation();
  const { name, description, id } = state.item;
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = useState([]);
  const [ids, setIds] = useState([]);

  const handleToggle = (value) => () => {
    console.log(state.item);
    const currentIndex = checked.indexOf(value);
    console.log(checked.indexOf(value));
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setChecked(newChecked);
  };

  const handleAssistance = async () => {
    const data = checked;
    const { response, err } = await subjectApi.addAssistance(id, data);
    if (response) {
      console.log(response);
      toast.success("Marked", {
        position: "bottom-left",
      });
    } else console.log(err);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <NavBar />
      <ToastContainer autoClose={1000} />
      <TabContext value={value}>
        <Box
          sx={{
            width: "100%",
            marginTop: 10,
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            textColor="secondary"
            indicatorColor="secondary"
            centered
          >
            <Tab value="1" label="Posts" />

            <Tab value="2" label="Files" />
            <Tab value="3" label="List" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Container>
            <PostTab />
          </Container>
        </TabPanel>

        <TabPanel value="2">
          <FilesTab />
        </TabPanel>

        <TabPanel
          value="3"
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",

            paddingLeft: { md: "36%", sm: "28%" },
          }}
        >
          <List
            dense
            sx={{
              maxWidth: 360,
            }}
          >
            {state.item.assistances.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <>
                  <ListItem
                    key={value}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value.id)}
                        checked={checked.indexOf(value.id) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={value.user.firstName}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleAssistance}
              sx={{ marginTop: 3 }}
            >
              Add assistance
            </Button>
          </List>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DetailClass;
