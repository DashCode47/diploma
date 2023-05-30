import {
  Box,
  Typography,
  Grid,
  Modal,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import ImportantNotes from "../Components/common/ImportantNotes";
import NavBar from "../Components/common/NavBar";
import PointsChart from "../Components/common/PointsChart";
import SubjectsChart from "../Components/common/SubjectsChart";
import Demo from "../Components/Demo";
import subjectApi from "../api/modules/subjects.api";
import { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const HomeScreen = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchSubjects = async () => {
    const { response, err } = await subjectApi.getUserSubjects(userId);
    if (response) {
      setFetch(response);
      setLoading(false);
      console.log(response);
    } else
      console.log({
        err,
      });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const goTo = () => {
    navigate("/Classes");
  };

  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: 10,
        paddingX: 6,
        flex: 1,
        minHeight: "100vh",
        backgroundColor: "#eff4fb",
      }}
    >
      <NavBar />

      {!loading && fetch.length < 1 && (
        <Stack
          direction={"column"}
          sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Typography variant="h4" component={"h4"}>
            It looks empty in here, try adding some subjects
          </Typography>
          <IconButton onClick={() => goTo()}>
            <ArrowCircleRightIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_WpDG3calyJ.json"
            background="transparent"
            speed="1"
            style={{ width: "500px", height: "500px" }}
            loop
            autoplay
          ></lottie-player>
        </Stack>
      )}
      {/* LEFT SIDE */}
      {fetch.length > 0 && (
        <Grid container spacing={2}>
          <Grid container item md={6} xs={12} direction={"column"}>
            <Grid item md={7}>
              <PointsChart />
            </Grid>
            <Grid item md={5}>
              <ImportantNotes />
            </Grid>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid container item md={6} xs={12} spacing={2} direction={"column"}>
            {/* <Schedule /> */}
            <Grid item md={7}>
              <Stack
                direction={"column-reverse"}
                sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              >
                <Button onClick={handleOpen}>Schedule</Button>
                <img
                  src={require("../Assets/schedule3.png")}
                  width={"50%"}
                  height={"100%"}
                />
              </Stack>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Demo />
                </Box>
              </Modal>
            </Grid>
            {/* On going */}
            <Grid item md={5}>
              <SubjectsChart />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default HomeScreen;
