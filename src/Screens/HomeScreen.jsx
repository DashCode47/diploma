import { Box, Typography, Grid, Container, Modal, Button } from "@mui/material";
import React from "react";
import ImportantNotes from "../Components/common/ImportantNotes";
import NavBar from "../Components/common/NavBar";
import PointsChart from "../Components/common/PointsChart";
import Schedule from "../Components/common/Schedule";
import SubjectsChart from "../Components/common/SubjectsChart";
import Demo from "../Components/Demo";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      {/* LEFT SIDE */}
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
          <Grid item md={7}>
            <Button onClick={handleOpen}>Schedule</Button>
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
            {/* <Schedule /> */}
          </Grid>
          {/* On going */}
          <Grid item md={5}>
            <SubjectsChart />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
