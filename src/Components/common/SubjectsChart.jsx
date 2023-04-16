import { Grid, Typography, Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const SubjectsChart = () => {
  const courses = ["UX Design", "UI class", "Bases de Datos"];
  return (
    <Grid
      container
      spacing={1}
      direction={"column"}
      sx={{ backgroundColor: "white", borderRadius: 5, height: "100%" }}
    >
      <Grid item md={2}>
        <Stack
          direction={"row"}
          sx={{ flex: 1, justifyContent: "space-between" }}
          px={3}
        >
          <Typography sx={{ color: "blue", fontWeight: "bold" }}>
            Ongoing Courses
          </Typography>

          <Typography sx={{ color: "blue", fontWeight: "bold" }}>
            More
          </Typography>
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
        {courses.map((item, index) => (
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
                <Typography>{item}</Typography>
                <Typography>40%</Typography>
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
                    width: "40%",
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
