import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import DeviceMap from "components/Map";
import { toast } from "react-toastify";
import { useGetLogedInUser } from "utils/auth.api";
import { useNavigate } from "react-router-dom";
import OrderStats from "components/Charts/orders";
import TrafficChart from "components/Charts/traficChart";
import CustomTable from "components/CustomTable";

const Index = () => {
  const columns = [
    "id",
    "Device Type",
    "Equipment Type",
    "Supported Parameters",
  ];
  const rows = [
    {
      id: '888998',
      deviceType: 'A',
      eqiuipmentType: 'X',
      supportedParams: '2'
    },
    {
      id: '4567876',
      deviceType: 'B',
      eqiuipmentType: 'Y',
      supportedParams: '3'
    },
    {
      id: '4567876',
      deviceType: 'C',
      eqiuipmentType: 'Z',
      supportedParams: '7'
    }
  ]
  const navigate = useNavigate();
  const { data: user } = useGetLogedInUser();
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 px-0 px-md-2 d-flex align-items-center">
                <Col xs="auto">
                  <h3 className="mb-0">Live Devices</h3>
                </Col>
                {user?.role === "SUPER_ADMIN" && (
                  <Col className="d-flex align-items-center justify-content-end">
                    <Button
                      className="px-1 px-md-3 py-2 text-sm"
                      color="danger"
                      onClick={() => navigate("/detailed-map")}
                    >
                      <i className="fa-solid fa-filter"></i> View Detailed Map
                    </Button>
                  </Col>
                )}
              </CardHeader>
              <Row className="mb-4 px-2">
                <Col xs='12' xl='6'>
                  <TrafficChart />
                  {/* <Container fluid> */}
                    <Card className="rounded shadow mt-3">
                      <CardHeader>Statistics in 24h</CardHeader>
                      <CardBody>
                        <Row className="mb-2">
                          <Col className="text-center border mx-1 shadow rounded">
                            <h5 className="mt-4">Working hours</h5>
                            <p>220</p>
                          </Col>
                          <Col className="text-center border mx-1 shadow rounded">
                            <h5 className="mt-4">Total engine hours</h5>
                            <p>120</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center border mx-1 shadow rounded">
                            <h5 className="mt-4">Engine hours per unit</h5>
                            <p>2</p>
                          </Col>
                          <Col className="text-center border mx-1 shadow rounded">
                            <h5 className="mt-4">Working hours per unit</h5>
                            <p>1.2</p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  {/* </Container> */}
                </Col>
                <Col xs='12' xl='6'>
                  {/* <Container fluid> */}
                  <DeviceMap />
                  <Card className="rounded shadow mt-3">
                    <CardHeader>Latets Registrations</CardHeader>
                    <CardBody>
                      <CustomTable columns={columns} rows={rows} />
                    </CardBody>
                  </Card>
                  {/* </Container> */}
                </Col>
              </Row>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Index;
