import { useEffect, useState } from "react";

import { Button, Card, CardHeader, Container, Row, Col } from "reactstrap";

import Header from "components/Headers/Header.js";
import DeviceMap from "components/Map";
import { toast } from "react-toastify";
import { useGetLogedInUser } from "utils/auth.api";
import { useNavigate } from "react-router-dom";

const Index = () => {
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
                      onClick={()=> navigate('/detailed-map') }
                    >
                      <i className="fa-solid fa-filter"></i> View Detailed Map
                    </Button>
                  </Col>
                )}
              </CardHeader>
              <DeviceMap />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Index;
