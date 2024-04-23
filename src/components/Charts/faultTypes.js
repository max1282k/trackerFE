import React from "react";
import ReactApexChart from "react-apexcharts";

const FaultyTypesChart = () => {
  const chartOptions = {
    labels: [
      "Type 1",
      "Type 2",
      "Type 3",
      "Type 4",
      "Type 5",
      "Type 6",
      "Type 7",
      "Type 8",
      "Type 9",
    ],
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

  const chartSeries = [2344, 402, 340, 100, 200, 150, 350, 500, 800]; // Static data for nine data points

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

export default FaultyTypesChart;
