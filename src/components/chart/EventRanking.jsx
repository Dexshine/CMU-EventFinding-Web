import React from "react";
import { Bar } from "react-chartjs-2";

const EventRanking = () => {
  const events = [
    "กิจกรรมเตะฟุตบอล",
    "กิจกรรมปลูกป่า",
    "กิจกรรมทำความสะอาด",
    "กิจกรรมป้องกันภัย",
    "กิจกรรมอาสาสมัคร",
  ];

  const pastelColors = [
    "#FFB3BA",
    "#FFDFBA",
    "#FFFFBA",
    "#BAFFC9",
    "#BAE1FF",
    "#D4A5A5",
    "#D4C4A5",
    "#D4D4A5",
    "#A5D4A5",
    "#A5D4D4",
    "#A5A5D4",
    "#C4A5D4",
    "#D4A5C4",
    "#D4A5A5",
    "#A5A5A5",
  ];

  const sampleValues = [
    15, 20, 10, 25, 18, 12, 8, 5, 6, 7, 11, 9, 4, 3, 2,
  ].sort((a, b) => b - a);

  const data = {
    labels: events,
    datasets: [
      {
        label: "จำนวน",
        data: sampleValues,
        backgroundColor: pastelColors,
      },
    ],
  };

  const options = {
    indexAxis: "y", // This makes the chart horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "กิจกรรม",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "กิจกรรมยอดนิยม",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EventRanking;
