import React from "react";
import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale
// );

const TagsRanking = () => {
  const tags = [
    "วิชาการ",
    "วิชาชีพ",
    "กิจการนักศึกษา",
    "เพิ่มทักษะ",
    "เทคโนโลยี",
    // "บันเทิง",
    // "ศิลปะ",
    // "การแสดง",
    // "ศาสนา",
    // "เทศกาล",
    // "สุขภาพ",
    // "กีฬา",
    // "เข้าสังคม",
    // "จิตอาสา",
    // "ท่องเที่ยว",
  ];

  const sampleValues = [
    15, 20, 10, 25, 18, 12, 8, 5, 6, 7, 11, 9, 4, 3, 2,
  ].sort((a, b) => b - a);

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

  const data = {
    labels: tags,
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
          text: "แท็ก",
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
        text: "แท็กยอดนิยม",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TagsRanking;
