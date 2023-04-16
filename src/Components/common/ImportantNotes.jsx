import React from "react";
import { Box, Typography } from "@mui/material";

const ImportantNotes = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 5,
        height: "100%",
        padding: 3,
      }}
    >
      <Typography sx={{ color: "blue", fontWeight: "bold" }}>
        Important Feed
      </Typography>
      <Box sx={{ backgroundColor: "#eff4fb", borderRadius: 5, height: "90%" }}>
        Important note goes here
      </Box>
    </Box>
  );
};

export default ImportantNotes;
