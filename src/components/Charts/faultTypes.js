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
      "#008000",
      "#FF0000",
      "#FFFF00",
      "#FFA500",
      "#00FFFF",
      "#FFC0CB",
      "#800080",
      "#FFD700",
      "#0000FF",
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
