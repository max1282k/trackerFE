import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "reactstrap";

const TrafficChart = () => {
  const options = {
    series: [
      {
        name: 'Registered Units',
        type: 'column',
        data: [440, 505, 414, 671, 227, 413],
      },
      {
        name: 'Proportion(%)',
        type: 'line',
        data: [16.48, 18.90, 15.50, 25.14, 8.50, 15.47],
      },
    ],
    chart: {
      height: 250,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: 'Current registered machines by region',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
        'Albania', 'Belgium', 'Croatia', 'Denmark', 'Estonia',
        'Finland'
      ]
      ,
      colors: [
        "#F5365C",
        "#FF847C", // Light red
        "#FFB997", // Light salmon
        "#FFDAC1", // Light peach
        "#9CFFCE", // Light aqua
        "#6EE7B7", // Aqua
        "#3B9979", // Dark aqua
      ],
    xaxis: {
      type: 'text',
    },
    yaxis: [
      {
        title: {
          text: '',
        },
      },
      {
        opposite: true,
        title: {
          text: '',
        },
      },
    ],
  };

  return (
    <>
      {/* <Container fluid> */}
        <Card className="rounded shadow pt-3">
          <ReactApexChart
            options={options}
            series={options.series}
            type={options.chart.type}
          />
        </Card>
      {/* </Container> */}
    </>
  );
};

export default TrafficChart;
