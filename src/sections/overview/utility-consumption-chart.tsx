import React from "react";
import Chart from "react-apexcharts";

const UtilityConsumptionChart = () => {
  const options = {
    chart: {
      id: "utility-consumption-chart",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    title: {
      text: "Utility Consumption Over Time",
    },
  };

  const series = [
    {
      name: "Water",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 85, 95],
    },
    {
      name: "Electricity",
      data: [20, 30, 25, 40, 39, 50, 60, 81, 115, 100, 75, 85],
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default UtilityConsumptionChart;
