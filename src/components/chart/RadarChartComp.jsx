import React from "react";

import { Radar } from "react-chartjs-2";

const data = {
  labels: [
    "วิชาการ",
    "วิชาชีพ",
    "กิจการนักศึกษา",
    "เพิ่มทักษะ",
    "เทคโนโลยี",
    "บันเทิง",
    "ศิลปะ",
    "การแสดง",
    "ศาสนา",
    "เทศกาล",
    "สุขภาพ",
    "กีฬา",
    "เข้าสังคม",
    "จิตอาสา",
    "ท่องเที่ยว",
  ],
  datasets: [
    {
      label: "ทักษะ",
      data: [65, 59, 90, 81, 56, 55, 40, 45, 60, 70, 80, 50, 75, 85, 95],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const RadarChartComp = () => {
  return <Radar data={data} />;
};

export default RadarChartComp;
