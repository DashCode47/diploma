import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/common/NavBar";

const LogOutScreen = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    try {
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.error(error.response || error);
    }
  };

  return (
    <Container sx={{ marginTop: 15 }}>
      <NavBar />
      <Button variant="contained" onClick={handleOpen}>
        Log Out
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogOut}>Log Out</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LogOutScreen;
