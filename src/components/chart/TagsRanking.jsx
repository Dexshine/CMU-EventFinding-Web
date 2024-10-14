import React from "react";
import { Bar } from "react-chartjs-2";
import _ from "lodash";

const TagsRanking = ({ events }) => {
  const tagsGroup = Object.values(
    _.groupBy(
      events.flatMap((ev) => ev.tags),
      (tag) => tag
    )
  );

  const tagsArray = tagsGroup.map((tag) => {
    return {
      tag: tag[0],
      qty: tag.length,
    };
  });

  const sortTags = tagsArray.sort((a, b) => b.qty - a.qty);

  const tags = sortTags.map((tag) => tag.tag).slice(0, 5);
  const tagDatas = sortTags.map((tag) => tag.qty).slice(0, 5);

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
        data: tagDatas,
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
