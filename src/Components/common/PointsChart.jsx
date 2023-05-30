import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";
import userApi from "../../api/modules/users.api";
import subjectApi from "../../api/modules/subjects.api";

ChartJS.register(ArcElement, Tooltip, Legend);

const PointsChart = () => {
  const [subjects, setSubjects] = useState([]);
  const [points, setPoints] = useState();
  const userId = localStorage.getItem("userId");

  const fetchSubjects = async () => {
    const { response, err } = await subjectApi.getUserSubjects(userId);
    if (response) {
      setSubjects(response.map((item) => item.name));
      setPoints(
        response
          .filter((subject) =>
            subject.assistances.some(
              (assistance) => assistance.user.id == userId
            )
          )
          .map(
            (subject) =>
              subject.assistances.find(
                (assistance) => assistance.user.id == userId
              ).assistanceNum
          )
      );
    } else
      console.log({
        err,
      });
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  const data = {
    labels: subjects,
    datasets: [
      {
        label: "Assistance",
        options: {
          maintainAspectRatio: false,
        },
        data: points,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "95%",
        backgroundColor: "white",
        borderRadius: 5,
      }}
    >
      <Doughnut
        data={data}
        style={{
          alignSelf: "center",
          flex: 1,
        }}
        options={{ maintainAspectRatio: false }}
      />
    </Box>
  );
};

export default PointsChart;
