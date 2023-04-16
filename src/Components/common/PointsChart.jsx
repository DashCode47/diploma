import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";
import userApi from "../../api/modules/users.api";

ChartJS.register(ArcElement, Tooltip, Legend);

const PointsChart = () => {
  const [subjects, setSubjects] = useState([]);
  const userId = localStorage.getItem("userId");
  const fetchSubjects = async () => {
    const { response, err } = await userApi.getSubects(userId);
    if (response) {
      setSubjects(response.map((item) => item.name));
      console.log(response);
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
        label: "# of Votes",
        options: {
          maintainAspectRatio: false,
        },
        data: [12, 19, 3, 5, 2, 3],
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
