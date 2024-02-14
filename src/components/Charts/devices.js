import React from "react";
import ReactApexChart from "react-apexcharts";

const DeviceChart = () => {
  const chartOptions = {
    labels: ["Normal", "Faulty", "Operational"],
    colors: ["#008000", "#FF0000", "#FFFF00"],
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
