import React from "react";
import ReactApexChart from "react-apexcharts";
import { Spinner } from "reactstrap";
import { useGetEquipmentCounts } from "utils/equipment";

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

  const { data, isLoading, isSuccess } = useGetEquipmentCounts();

  const chartSeries = isLoading
    ? [0, 0, 0]
    : [data?.normalCount, data?.faultyCount, data?.operationalCount];

  return (
    <div>
      {isLoading ? (
        <Spinner className="ml-3 my-3" />
      ) : isSuccess ? (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          width="400"
        />
      ) : (
        <p className="my-3 text-center">Data not available</p>
      )}
    </div>
  );
};

export default DeviceChart;
