import { IndeterminateCheckBoxTwoTone } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Schedule = () => {
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const hours = ["8:00", "9:40", "11:50", "13:30", "15:40", "17:20"];
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        paddingY: 3,
        paddingX: 2,
        width: "100%",
        height: "97%",
      }}
    >
      <Grid
        container
        direction={"column"}
        sx={{ flex: 1, width: "100%", height: "100%" }}
      >
        <Grid item container md={1} xs={1}>
          <Grid item md={3} xs={3}>
            <Typography sx={{ color: "blue", fontWeight: "bold" }}>
              Schedule
            </Typography>
          </Grid>
        </Grid>
        <Grid item container md={1} xs={1} sx={{ height: "100%" }}>
          <Grid item md={3} xs={3} />

          <Grid item md={9} xs={9}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              {hours.map((item, index) => (
                <Typography key={index}>{item}</Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Grid
          item
          container
          md={9}
          xs={9}
          sx={{
            height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          {days.map((item, index) => (
            <Grid container key={index}>
              <Grid item md={3} xs={3}>
                <Typography>{item}</Typography>
              </Grid>

              <Grid
                item
                md={9}
                xs={9}
                sx={{
                  backgroundColor: "#eff4fb",
                  borderRadius: 5,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    backgroundColor: "blue",
                    width: 130,
                    height: "100%",
                    right: 55,
                    borderRadius: 5,
                  }}
                >
                  dsd
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Schedule;
