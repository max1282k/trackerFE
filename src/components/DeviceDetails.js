import React, { useEffect, useState } from "react";
import Header from "./Headers/Header";
import {
  Button,
  Card,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { DeviceMap } from "./Map";
import { useLocation } from "react-router-dom";
import { useGetEquipmentById } from "utils/equipment";
import { REGISTRATION } from "db";

const DeviceDetails = () => {
  const location = useLocation();
  const id = location.state;
  const { data } = useGetEquipmentById(id);

  const [addModal, setAddModal] = useState(false);

  const addToggle = () => setAddModal(!addModal);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

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
                  {data && (
                    <DeviceMap
                      latitude={data.latitude}
                      longitude={data.longitude}
                      imei={data.imei}
                    />
                  )}
                </Col>
                <Col className="p-4">
                  <Row className="pr-4 justify-content-end">
                    <Button
                      className="d-flex justify-content-center align-items-center gap-4 border-1 bg-primary rounded p-2 mx-1"
                      onClick={addToggle}
                    >
                      {/* <img /> */}
                      <p className="p-0 m-0 text-white">Update Maintenance</p>
                    </Button>
                  </Row>
                  <Row className="d-flex flex-column border-bottom w-100 pr-4 mt-4">
                    <h2 className="m-0 p-0 mb-1">Registration</h2>
                  </Row>
                  <Row>
                    {REGISTRATION.map(({ title, endPoint }) => (
                      <Col key={endPoint} className="p-0 mt-2" xs="6" md="4">
                        <h5 className="m-0">{title}</h5>
                        <p className="text-dark text-sm">
                          {data?.[endPoint] || "No value"}
                        </p>
                      </Col>
                    ))}
                  </Row>
                  <Row className="d-flex flex-column border-bottom w-100 pr-4 mt-4">
                    <h2 className="m-0 p-0 mb-1">Status</h2>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Latitude</h5>
                      <p className="text-dark text-sm">
                        {data?.latitude || "-"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Longitude</h5>
                      <p className="text-dark text-sm">
                        {data?.longitude || "-"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Speed</h5>
                      <p className="text-dark text-sm">{data?.speed}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">RPM</h5>
                      <p className="text-dark text-sm">{data?.rpm}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Engine Temprature</h5>
                      <p className="text-dark text-sm">
                        {data?.engineTemperature}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Odometer</h5>
                      <p className="text-dark text-sm">{data?.odometer}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Hours of Operation</h5>
                      <p className="text-dark text-sm">
                        {data?.hoursOfOperation}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Fuel Level</h5>
                      <p className="text-dark text-sm">
                        {`${data?.fuelLevel}%` || "0%"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Engine Oil Level</h5>
                      <p className="text-dark text-sm">{data?.enginOilLevel}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Battery Voltage</h5>
                      <p className="text-dark text-sm">
                        {data?.batteryVoltage}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">DI1</h5>
                      <p className="text-dark text-sm">{data?.DI1}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">DI2</h5>
                      <p className="text-dark text-sm">{data?.DI2}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">DO1</h5>
                      <p className="text-dark text-sm">{data?.DO1}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">DO2</h5>
                      <p className="text-dark text-sm">{data?.DO2}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">AI1</h5>
                      <p className="text-dark text-sm">{`${(
                        (data?.AI1 * 32) /
                        4095
                      )?.toFixed(1)} V (raw: ${data?.AI1}) `}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">AI2</h5>
                      <p className="text-dark text-sm">{`${(
                        data?.AI2 / 4095
                      )?.toFixed(1)} V (raw: ${data?.AI2}) `}</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Last Updated</h5>
                      <p className="text-dark text-sm">
                        {data?.updatedAt
                          ? currentTime - new Date(data.updatedAt) < 60000
                            ? "just now"
                            : currentTime - new Date(data.updatedAt) < 3600000
                            ? `${Math.floor(
                                (currentTime - new Date(data.updatedAt)) / 60000
                              )} minute${
                                Math.floor(
                                  (currentTime - new Date(data.updatedAt)) /
                                    60000
                                ) !== 1
                                  ? "s"
                                  : ""
                              } ago`
                            : currentTime - new Date(data.updatedAt) < 86400000
                            ? `${Math.floor(
                                (currentTime - new Date(data.updatedAt)) /
                                  3600000
                              )} hour${
                                Math.floor(
                                  (currentTime - new Date(data.updatedAt)) /
                                    3600000
                                ) !== 1
                                  ? "s"
                                  : ""
                              } ago`
                            : currentTime - new Date(data.updatedAt) <
                              2592000000
                            ? `${Math.floor(
                                (currentTime - new Date(data.updatedAt)) /
                                  86400000
                              )} day${
                                Math.floor(
                                  (currentTime - new Date(data.updatedAt)) /
                                    86400000
                                ) !== 1
                                  ? "s"
                                  : ""
                              } ago`
                            : `${Math.floor(
                                (currentTime - new Date(data.updatedAt)) /
                                  2592000000
                              )} month${
                                Math.floor(
                                  (currentTime - new Date(data.updatedAt)) /
                                    2592000000
                                ) !== 1
                                  ? "s"
                                  : ""
                              } ago`
                          : "N/A"}
                      </p>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column border-bottom w-100 pr-4 mt-4">
                    <h2 className="m-0 p-0 mb-1">Failure</h2>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">State:</h5>
                      <p className="text-dark text-sm">
                        {data?.state || "Operational"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">Parameter Group:</h5>
                      <p className="text-dark text-sm">
                        {data?.parameterGroup || "Without folia"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">Suspect Parameter:</h5>
                      <p className="text-dark text-sm">
                        {data?.suspectParameter || "No fuss"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">Date:</h5>
                      <p className="text-dark text-sm">
                        {data?.date || "May 07, 2023"}
                      </p>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column border-bottom w-100 pr-4 mt-4">
                    <h2 className="m-0 p-0 mb-1">Maintenance</h2>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="4">
                      <h5 className="m-0">Hour meter:</h5>
                      <p className="text-dark text-sm">
                        {data?.hourMeter || "1600"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="4">
                      <h5 className="m-0">Made By:</h5>
                      <p className="text-dark text-sm">
                        {data?.madeBy || "N / A"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="4">
                      <h5 className="m-0">Date:</h5>
                      <p className="text-dark text-sm">
                        {data?.date || "July 12, 2023"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="4">
                      <h5 className="m-0">Hours Since Last Maintainace:</h5>
                      <p className="text-dark text-sm">
                        {"30h"}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </div>
        </Row>
        <Modal isOpen={addModal} toggle={addToggle}>
          <ModalHeader className="pb-0">Edit Maintenance</ModalHeader>
          <ModalBody className="pb-0">
            <Row className="w-100">
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Date</Label>
                  <Input placeholder="date" type="datetime-local" />
                </FormGroup>
              </Col>
            </Row>
            <Row className="w-100">
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Made By</Label>
                  <Input placeholder="made by" />
                </FormGroup>
              </Col>
            </Row>
            <Row className="w-100">
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Hour Meter Reading (init)</Label>
                  <Input placeholder="Hour Meter Reading (init)" />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger">Edit</Button>{" "}
            <Button color="secondary" onClick={addToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default DeviceDetails;
