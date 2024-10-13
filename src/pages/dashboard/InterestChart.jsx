import _ from "lodash";
import React from "react";
import BarChartComp from "../../components/chart/BarChartComp";

const InterestChart = ({ events }) => {
  const groupedEvents = _.groupBy(events, (event) => {
    return event.createdAt.split("T")[0];
  });

  return <BarChartComp title="การกดสนใจกิจกรรม" data={[2, 4, 5]} />;
};

export default InterestChart;
