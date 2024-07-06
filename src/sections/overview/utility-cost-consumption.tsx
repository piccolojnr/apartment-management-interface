import Chart, { Props } from "react-apexcharts";

const UtilityCostDistribution = () => {
  const options: Props["options"] = {
    labels: ["Water", "Electricity", "Maintenance"],
    title: {
      text: "Utility Cost Distribution",
      align: "left",
    },
  };

  const series = [45, 35, 20]; // Replace with actual cost data

  return <Chart options={options} series={series} type="pie" height={350} />;
};

export default UtilityCostDistribution;
