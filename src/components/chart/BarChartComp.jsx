import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Bar } from "react-chartjs-2";

const BarChartComp = ({
  title = "",
  data = [],
  color = "rgba(106, 90, 205, 0.3)",
}) => {
  const chartData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 2, width: 300 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" color="primary">
            {title}
          </Typography>
          <Box
            component="span"
            sx={{ fontSize: 24, color: "primary.main" }}
          ></Box>
        </Box>
        <Typography variant="h6" color="textPrimary" sx={{ marginY: 1 }}>
          {data.reduce((val, total) => val + total, 0)} ครั้ง
        </Typography>
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default BarChartComp;
