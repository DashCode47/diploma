import React, { useState, useEffect } from "react";
import subjectApi from "../../api/modules/subjects.api";
import parse from "html-react-parser";
import { Box, Typography } from "@mui/material";

const ImportantNotes = ({ open }) => {
  const [subjects, setSubjects] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchSubjects = async () => {
    const { response, err } = await subjectApi.getUserSubjects(userId);
    if (response) {
      setSubjects(response.map((item) => item));

      console.log(
        response
          .map((item) => item.posts[0])
          .filter((item) => item !== undefined)
      );
    } else
      console.log({
        err,
      });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 5,
        height: "100%",
        padding: 3,
        width: "95%",
      }}
    >
      <Typography sx={{ color: "blue", fontWeight: "bold" }}>
        Important Feed
      </Typography>
      {subjects.map((item, index) => (
        <Box
          sx={{
            backgroundColor: "#eff4fb",
            borderRadius: 5,
            height: "auto",
            position: "relative",
            marginBottom: 1,
          }}
        >
          {item.posts[0] && index < 2 && (
            <>
              <Typography
                sx={{
                  position: "absolute",
                  top: 1,
                  left: 15,
                  fontSize: 12,
                  color: "gray",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  overflow: "hidden",
                }}
              >
                {parse(item.posts[0].replace(/"/g, ""))}
              </Typography>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ImportantNotes;
