import React from "react";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/common/NavBar";

const LogOutScreen = () => {
  const navigate = useNavigate();
  const handleOut = async () => {
    try {
      /*      const { data } = await userApi.logout; */
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.error(error.response || error);
    }
  };

  return (
    <Container sx={{ marginTop: 15 }}>
      <NavBar />
      <Button variant="contained" onClick={() => handleOut()}>
        Log Out
      </Button>
    </Container>
  );
};

export default LogOutScreen;
