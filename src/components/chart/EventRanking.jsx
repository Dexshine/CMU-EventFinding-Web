import React from "react";
import { Bar } from "react-chartjs-2";
import _ from "lodash";

const EventRanking = ({ events }) => {
  const groupTitles = Object.values(_.groupBy(events, "title"));

  const toArray = groupTitles.map((gr) => {
    return {
      label: gr[0].title,
      value: gr.length,
    };
  });

  console.log("groupTitles", groupTitles);

  const sortArray = toArray.sort((a, b) => b.value - a.value);

  const labels = sortArray.map((tag) => tag.label).slice(0, 5);
  const datas = sortArray.map((tag) => tag.value).slice(0, 5);

  const eventsData = [
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
    labels: labels,
    datasets: [
      {
        label: "จำนวน",
        data: datas,
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
