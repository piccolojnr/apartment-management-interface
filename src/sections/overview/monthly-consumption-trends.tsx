import Chart, { Props } from "react-apexcharts";

const MonthlyConsumptionTrends = () => {
  const options: Props["options"] = {
    chart: {
      id: "monthly-consumption-trends",
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
      text: "Monthly Utility Consumption Trends",
      align: "left",
    },
  };

  const series = [
    {
      name: "Water (L)",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 85, 95],
    },
    {
      name: "Electricity (kWh)",
      data: [20, 30, 25, 40, 39, 50, 60, 81, 115, 100, 75, 85],
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default MonthlyConsumptionTrends;
