import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import NavBar from "../Components/common/NavBar";
import background from "../Assets/fondo.jpg";
import userApi from "../api/modules/users.api";
import { useEffect } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";

const ProfileScreen = () => {
  const userId = localStorage.getItem("userId");
  const [disabled, setDisabled] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const roles = ["USER", "ADMIN"];

  /* Save updated User */
  const saveUpdates = async () => {
    const { response, err } = await userApi.updateUser(userId, updatedData);
    if (response) {
      console.log(updatedData);

      toast.success("Updated Succesfully", {
        position: "bottom-left",
      });
      setDisabled(!disabled);
    } else
      toast.error(err.message, {
        position: "bottom-left",
      });
  };

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
    setUpdatedData({ role: userData.role }); // The role field cannot be empty or will get an error
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: 8,
        flex: 1,

        backgroundColor: "#eff4fb",
      }}
    >
      <NavBar />
      <Grid container direction={"column"} flex={1}>
        {/* Upper */}
        <Grid
          item
          sx={{
            position: "relative",
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 100,
            width: "100%",
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
        <Grid
          item
          sx={{ backgroundColor: "#eff4fb", paddingTop: 14, paddingBottom: 5 }}
        >
          <ToastContainer autoClose={1000} />
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
                label="name"
                defaultValue={userData.firstName}
                disabled={disabled}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, firstName: e.target.value })
                }
              />
              <TextField
                required
                id="outlined-required"
                label="LastName"
                defaultValue={userData.lastName}
                disabled={disabled}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, lastName: e.target.value })
                }
              />
              <TextField
                id="filled-select-currency"
                select
                label="Role"
                defaultValue={userData.role}
                variant="outlined"
                disabled={disabled}
                sx={{ width: 200 }}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, role: e.target.value })
                }
              >
                {roles.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                defaultValue={userData.email}
                disabled={disabled}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, email: e.target.value })
                }
              />

              <Stack direction={"row"} spacing={2}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<EditIcon />}
                  onClick={() => setDisabled(!disabled)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  onClick={() => saveUpdates()}
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileScreen;
