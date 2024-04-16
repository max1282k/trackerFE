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
                    <h2 className="m-0 p-0 mb-1">Last Failure</h2>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">State:</h5>
                      <p className="text-dark text-sm">
                        {data?.state || "Operational"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">Type:</h5>
                      <p className="text-dark text-sm">
                        {data?.type || "Without folia"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-2" xs="6" md="3">
                      <h5 className="m-0">Description:</h5>
                      <p className="text-dark text-sm">
                        {data?.description || "No fuss"}
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
                    <h2 className="m-0 p-0 mb-1">Last Maintenance</h2>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Hour meter:</h5>
                      <p className="text-dark text-sm">
                        {data?.hourMeter || "1600"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Made By:</h5>
                      <p className="text-dark text-sm">
                        {data?.madeBy || "N / A"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Date:</h5>
                      <p className="text-dark text-sm">
                        {data?.date || "July 12, 2023"}
                      </p>
                    </Col>

                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Vehicles/Equipment:</h5>
                      <p className="text-dark text-sm">
                        {data?.vehicle || "car"}
                      </p>
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
                      <p className="text-dark text-sm">
                        {data?.country || "Houndurus"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Department:</h5>
                      <p className="text-dark text-sm">
                        {data?.department || "Copan"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Category</h5>
                      <p className="text-dark text-sm">
                        {data?.category || "Dump Trucks"}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Hour meter:</h5>
                      <p className="text-dark text-sm">
                        {data?.hourMeter || "1600"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Brand</h5>
                      <p className="text-dark text-sm">
                        {data?.brand || "SANY"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Model</h5>
                      <p className="text-dark text-sm">
                        {data?.model || "SY2130C-BR"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Status</h5>
                      <p className="text-dark text-sm">
                        {data?.status || "Active"}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Mileage</h5>
                      <p className="text-dark text-sm">
                        {data?.mileage || "0"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Latitude</h5>
                      <p className="text-dark text-sm">
                        {data?.latitude || "14.6536"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">longitude</h5>
                      <p className="text-dark text-sm">
                        {data?.longitude || "88.8345"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Fuel Level</h5>
                      <p className="text-dark text-sm">
                        {data?.fuelLevel || "44%"}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Total Consumption</h5>
                      <p className="text-dark text-sm">
                        {data?.totalConsumption || "0/-"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Average Consumption</h5>
                      <p className="text-dark text-sm">
                        {data?.averageConsumption || "0"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Actual Consumption</h5>
                      <p className="text-dark text-sm">
                        {data?.actualConsumption || "0"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Registered Date</h5>
                      <p className="text-dark text-sm">
                        {data?.registeredDate || "July 12, 2023"}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Smart Device Operative</h5>
                      <p className="text-dark text-sm">
                        {data?.smartDevice ? "Yes" : "No" || "Yes"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Ult Operation</h5>
                      <p className="text-dark text-sm">
                        {data?.ultOperation || "Status On"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Ult Update</h5>
                      <p className="text-dark text-sm">July 12, 2023</p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Maintenance Performed</h5>
                      <p className="text-dark text-sm">
                        {data?.maintenancePerformed || "No"}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Maintenance Interval</h5>
                      <p className="text-dark text-sm">
                        {data?.maintenanceInterval || "400 hours"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Maintenance Start</h5>
                      <p className="text-dark text-sm">
                        {data?.maintenanceStart || "1200"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Team With Smart Device</h5>
                      <p className="text-dark text-sm">
                        {data?.teamWithSmartDevice || "Yes"}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Maintenance Agreement:</h5>
                      <p className="text-dark text-sm">
                        {data?.maintenanceAgreement || "Yes"}
                      </p>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column border-bottom w-100 pr-4 mt-4"></Row>
                  <Row>
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
                      <h5 className="m-0">Engine Oil Level</h5>
                      <p className="text-dark text-sm">
                        {data?.enginOilLevel}
                      </p>
                    </Col>
                    <Col className="p-0 mt-1" xs="6" md="3">
                      <h5 className="m-0">Battery Voltage</h5>
                      <p className="text-dark text-sm">
                        {data?.batteryVoltage}
                      </p>
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
                  <Label className="m-0">Condition</Label>
                  <Input placeholder="condition" />
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
