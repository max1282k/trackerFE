import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Container } from "reactstrap";

const OrderStats = () => {
  // Sample data for active, completed, and total orders
  const orderData = {
    activeOrders: [10, 15, 0, 25, 30],
    completedOrders: [5, 10, 5, 20, 25],
    totalOrders: [15, 25, 35, 45, 55],
  };

  const options = {
    chart: {
      type: "line",
      height: '100px',
      background: "#F6F8FA",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"], // Months
    },
    yaxis: {
      title: {
        text: "Number of Orders",
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
  };

  return (
    <>
      <Container fluid>
        <Card className="rounded shadow">
          <ReactApexChart
            options={options}
            series={[
              {
                name: "Active Orders",
                data: orderData.activeOrders,
              },
              {
                name: "Completed Orders",
                data: orderData.completedOrders,
              },
              {
                name: "Total Orders",
                data: orderData.totalOrders,
              },
            ]}
            type="line"
            // width={500}
          />
        </Card>
      </Container>
    </>
  );
};

export default OrderStats;