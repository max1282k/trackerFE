import React from "react";
import ReactApexChart from "react-apexcharts";

const SmartDevices = () => {
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Smart Devices", "Operational", "In Operational"],
    },
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
      position: "top",
    },
  };

  const chartSeries = [
    {
      name: "Total Amount",
      data: [100, 60, 41],
    },
  ];

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default SmartDevices;
