import React from "react";
import Chart from "react-apexcharts";

const UtilityDistributionChart = () => {
  const options = {
    labels: ["Water", "Electricity", "Maintenance"],
    title: {
      text: "Utility Type Distribution",
    },
  };

  const series = [45, 35, 20];

  return <Chart options={options} series={series} type="pie" height={350} />;
};

export default UtilityDistributionChart;
