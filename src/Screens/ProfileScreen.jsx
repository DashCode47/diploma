import { Box, Grid, Input, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import NavBar from "../Components/common/NavBar";
import background from "../Assets/fondo.jpg";
import userApi from "../api/modules/users.api";
import { useEffect } from "react";
import { useState } from "react";

const ProfileScreen = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  /* fetch userData */
  const getUser = async () => {
    const { response, err } = await userApi.getUser(userId);

    if (response) {
      setUserData(response);
      console.log(response);
    } else console.log({ err });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: 8,

        flex: 1,
        minHeight: "100vh",
        backgroundColor: "#eff4fb",
      }}
    >
      <NavBar />
      <Grid container direction={"column"} flex={1}>
        {/* Upper */}
        <Grid
          item
          sx={{
            flex: 0.3,
            position: "relative",
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: -105,
              left: "43%",
              height: 170,
              width: 170,
              borderRadius: 25,
              backgroundColor: "whitesmoke",
              borderWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
            }}
          >
            <img src={require("../Assets/logo.png")} height={100} />
          </Box>
        </Grid>

        {/* Lower */}
        <Grid item sx={{ backgroundColor: "#eff4fb", flex: 1, paddingTop: 14 }}>
          <Typography variant="h6" component={"h8"}>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            Software Engeniering
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12, paddingBottom: 2 }}>
            4th Course
          </Typography>
          {userData.firstName.length > 0 && (
            <Stack
              direction={"column"}
              sx={{ justifyContent: "center", alignItems: "center" }}
              spacing={3}
            >
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue={userData.firstName}
              />
              <TextField
                id="outlined-basic"
                label="Role"
                variant="outlined"
                defaultValue={userData.role}
              />
              <TextField
                id="outlined-basic"
                label="Role"
                variant="outlined"
                defaultValue={userData.email}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileScreen;
