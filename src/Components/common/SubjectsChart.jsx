import { Grid, Typography, Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import userApi from "../../api/modules/users.api";
import subjectApi from "../../api/modules/subjects.api";
import { useNavigate } from "react-router-dom";
const SubjectsChart = () => {
  const [subjects, setSubjects] = useState([]);
  const [assistance, setAssistance] = useState();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchSubjects = async () => {
    const { response, err } = await subjectApi.getUserSubjects(userId);
    if (response) {
      setSubjects(response.map((item) => item));

      console.log(response);
    } else
      console.log({
        err,
      });
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <Grid
      container
      spacing={1}
      direction={"column"}
      sx={{ backgroundColor: "white", borderRadius: 5 }}
    >
      <Grid item md={2}>
        <Stack
          direction={"row"}
          sx={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
          px={3}
        >
          <Box>
            <Typography sx={{ color: "blue", fontWeight: "bold" }}>
              Ongoing Courses
            </Typography>
          </Box>

          <Box>
            <Button
              onClick={() => navigate("/Classes")}
              sx={{ color: "blue", fontWeight: "bold" }}
            >
              More
            </Button>
          </Box>
        </Stack>
      </Grid>

      <Grid
        direction={"column"}
        item
        container
        md={10}
        xs={10}
        sx={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "baseline",
          height: "100%",
          width: "100%",
          paddingY: 3,
        }}
      >
        {subjects.slice(0, 3).map((item, index) => (
          <Stack
            key={index}
            direction={"row"}
            sx={{ alignItems: "center", width: "100%" }}
            spacing={2}
          >
            <Box
              sx={{ backgroundColor: "skyBlue", width: 35, borderRadius: 2 }}
            >
              e
            </Box>
            <Stack sx={{ width: "85%" }}>
              <Stack
                direction={"row"}
                sx={{ flex: 1, justifyContent: "space-between" }}
                px={2}
              >
                <Typography>{item.name}</Typography>
                <Typography>
                  {item.assistances
                    .filter((subItem) => subItem.user.id == userId)
                    .map((subItem) => subItem.assistanceNum) * 5}
                  %
                </Typography>
              </Stack>
              <Box
                sx={{
                  height: 10,
                  width: "100%",
                  backgroundColor: "#eff4fb",
                  borderRadius: 5,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    height: 10,
                    width: `${item.assistances
                      .filter((subItem) => subItem.user.id == userId)
                      .map((subItem) => subItem.assistanceNum)}%`,
                    backgroundColor: "blue",
                    borderRadius: 5,
                    position: "absolute",
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        ))}
      </Grid>
    </Grid>
  );
};

export default SubjectsChart;
