import React from "react";
import Header from "./Headers/Header";
import { Card, Col, Container, Row } from "reactstrap";
import DeviceMap from "./Map";

const DeviceDetails = () => {
  return (
    <div>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <Row>
                <Col xs="12" md="4" className="p-4">
                  <DeviceMap />
                </Col>
                <Col className="p-4">
                  <Row className=" pr-4">
                    <Col className="d-flex justify-content-center align-items-center gap-4 border-1 bg-danger rounded p-1 mx-1">
                      <img />
                      <p className="p-0 m-0 text-dark">Failed</p>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center gap-4 border-1 bg-primary rounded p-1 mx-1">
                      <img />
                      <p className="p-0 m-0 text-dark">Maintenance</p>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center gap-4 border-1 bg-success rounded p-1 mx-1">
                      <img />
                      <p className="p-0 m-0 text-dark">Syn HR</p>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column border-bottom w-100 pr-4 mt-4">
                    <h2 className="m-0 p-0 mb-1">Last Failure</h2>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">State:</h5>
                      <p className="text-dark text-sm">Operational</p>
                    </Col>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">Type:</h5>
                      <p className="text-dark text-sm">Without folia</p>
                    </Col>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">Description:</h5>
                      <p className="text-dark text-sm">No fuss</p>
                    </Col>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">Date:</h5>
                      <p className="text-dark text-sm">May 07, 2023</p>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column border-bottom w-100 pr-4 mt-4">
                    <h2 className="m-0 p-0 mb-1">Last Maintenance</h2>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Hour meter:</h5>
                      <p className="text-dark text-sm">1600</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Made By:</h5>
                      <p className="text-dark text-sm">N/A</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Date:</h5>
                      <p className="text-dark text-sm">July 12, 2023</p>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column border-bottom w-100 pr-4 mt-4"></Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Team Name Ivon</h5>
                      <p className="text-dark text-sm">Polanco HIZDSN44HF6</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Country</h5>
                      <p className="text-dark text-sm">Houndurus</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Department:</h5>
                      <p className="text-dark text-sm">Copan</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Category</h5>
                      <p className="text-dark text-sm">Dump Trucks</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Hour meter:</h5>
                      <p className="text-dark text-sm">1600</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Brand</h5>
                      <p className="text-dark text-sm">SANY</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Model</h5>
                      <p className="text-dark text-sm">SY2130C-BR</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Status</h5>
                      <p className="text-dark text-sm">Active</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Mileage</h5>
                      <p className="text-dark text-sm">0</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Latitude</h5>
                      <p className="text-dark text-sm">14.6536</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Length</h5>
                      <p className="text-dark text-sm">88.8345</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Fuel Level</h5>
                      <p className="text-dark text-sm">44%</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Total Consumption</h5>
                      <p className="text-dark text-sm">0/-</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Average Consumption</h5>
                      <p className="text-dark text-sm">0</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Actual Consumption</h5>
                      <p className="text-dark text-sm">0</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Registered Date</h5>
                      <p className="text-dark text-sm">July 12, 2023</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Root Cloud Operative</h5>
                      <p className="text-dark text-sm">Yes</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Ult Operation</h5>
                      <p className="text-dark text-sm">Status On</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Ult Update</h5>
                      <p className="text-dark text-sm">July 12, 2023</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Maintenance Performed</h5>
                      <p className="text-dark text-sm">No</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Maintenance Interval</h5>
                      <p className="text-dark text-sm">400 hours</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Maintenance Start</h5>
                      <p className="text-dark text-sm">1200</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Team WithRoot Cloud</h5>
                      <p className="text-dark text-sm">Yes</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Maintenance Agreement:</h5>
                      <p className="text-dark text-sm">Yes</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default DeviceDetails;