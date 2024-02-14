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
    colors: ["#008000", "#FF0000", "#FFFF00"],
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
