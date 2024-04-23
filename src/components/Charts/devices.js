import React from "react";
import ReactApexChart from "react-apexcharts";

const DeviceChart = () => {
  const chartOptions = {
    labels: ["Normal", "Faulty", "Operational"],
    colors: [
      "#F5365C",
      "#FF847C", // Light red
      "#FFB997", // Light salmon
      "#FFDAC1", // Light peach
      "#9CFFCE", // Light aqua
      "#6EE7B7", // Aqua
      "#3B9979", // Dark aqua
    ],
    legend: {
      show: true,
      position: "right",
    },
  };

  const chartSeries = [2344, 402, 340]; // Static data for three data points types of faults

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        width="400"
      />
    </div>
  );
};

export default DeviceChart;
