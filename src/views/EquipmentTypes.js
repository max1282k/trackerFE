// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Col,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Spinner,
  ModalFooter,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import CustomTable from "components/CustomTable";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllDevices } from "utils/device.api";
import { useDeleteDevice } from "utils/device.api";
import ReactPaginate from "react-paginate";

const EquipmentTypes = () => {
  // const organizationData = [];
  const navigate = useNavigate();
  const deleteDeviceMutation = useDeleteDevice();
  const columns = [
    "id",
    "Manufacturer",
    "Model",
    "Speed",
    "Rpm",
    "Fuel Level",
    "Odometer",
    "Hour Meter",
    "Hydraulic Pressure",
    "Track/Tire Tension",
    "Boom Angle",
    "Engine Temperature",
    "Brake Fluid Level",
    "Engine Oil Level",
    "Engine Oil Pressure",
    "Gear Oil Level",
    "Engine Warning PID",
    "Hydraulic Warning PID",
    "Electronics Warning PID",
    "Brake Warning PID",
    "Transmission Warning PID",
    "Actions",
  ];
  const [formData, setFormData] = useState({
    Manufacturer: "",
    Model: "",
    Speed: "",
    Rpm: "",
    FuelLevel: "",
    Odometer: "",
    HourMeter: "",
    HydraulicPressure: "",
    TrackTireTension: "",
    BoomAngle: "",
    EngineTemperature: "",
    BrakeFluidLevel: "",
    EngineOilLevel: "",
    EngineOilPressure: "",
    GearOilLevel: "",
    EngineWarningPID: "",
    HydraulicWarningPID: "",
    ElectronicsWarningPID: "",
    BrakeWarningPID: "",
    TransmissionWarningPID: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [rows, setRows] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [treeModal, setTreeModal] = useState(false);
  const [id, setId] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const itemsPerPage = 10;
  const {
    isLoading,
    data: organizationData,
    error,
  } = useGetAllDevices({
    limit: itemsPerPage,
    offset: currentPage * itemsPerPage,
  });
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const addToggle = () => setAddModal(!addModal);
  const filterToggle = () => setFilterModal(!filterModal);
  const treeToggle = () => setTreeModal(!treeModal);
  const editToggle = (item) => {
    setEditedItem(item);
    setEditModal(!editModal);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const reArrageData = () => {
    let tempArr = [];

    organizationData.results.forEach((item, idx) => {
      tempArr?.push({
        serialNumber: `000${idx + 1}`,
        Manufacturer: "Hyundai",
        Model: "TX 700",
        Speed: "00A5",
        Rpm: "00C7",
        FuelLevel: "12A6",
        Odometer: "A098",
        HourMeter: "B67D",
        HydraulicPressure: "F123",
        TrackTireTension: "D345",
        BoomAngle: "89A8",
        EngineTemperature: "AA09",
        BrakeFluidLevel: "AA11",
        EngineOilLevel: "DEBO",
        EngineOilPressure: "BB78",
        GearOilLevel: "CA18",
        EngineWarningPID: "2CEW",
        HydraulicWarningPID: "CG3A",
        ElectronicsWarningPID: "VD3A",
        BrakeWarningPID: "ADE2",
        TransmissionWarningPID: "00A9",
        actions: (
          <>
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                deleteToggle();
                setId(item._id);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </Button>

            <Button size="sm" color="info" onClick={() => editToggle(item)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </>
        ),
      });
    });
    setRows(tempArr);
  };

  const validateForm = () => {
    const errors = {};
    const regex = /^[A-Z0-9]{4}$/; // Regular expression to match 4 characters of A-Z or 0-9

    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      } else if (!regex.test(formData[key])) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } must be 4 characters long and contain only A-Z and 0-9`;
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    setFormData({
      Manufacturer: "",
      Model: "",
      Speed: "",
      Rpm: "",
      FuelLevel: "",
      Odometer: "",
      HourMeter: "",
      HydraulicPressure: "",
      TrackTireTension: "",
      BoomAngle: "",
      EngineTemperature: "",
      BrakeFluidLevel: "",
      EngineOilLevel: "",
      EngineOilPressure: "",
      GearOilLevel: "",
      EngineWarningPID: "",
      HydraulicWarningPID: "",
      ElectronicsWarningPID: "",
      BrakeWarningPID: "",
      TransmissionWarningPID: "",
    });
    setAddModal(false);
    setValidationErrors({});
    toast.success("Device Added Successfully!");
  };

  const handleEdit = () => {
    if (!validateForm()) {
      return;
    }

    setEditModal(false);
    setEditedItem(null);
    setValidationErrors({});
  };

  useEffect(() => {
    if (organizationData) {
      reArrageData();
      setTotalCount(organizationData?.totalCount);
    }
    if (error) {
      toast.error(error.message);
    }
  }, [organizationData, currentPage]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 px-0 px-md-2 d-flex align-items-center">
                <Row className="px-4 d-flex justify-content-between align-items-center  w-100">
                  <h3 className="mb-0">Equipment Types</h3>
                  <Button onClick={addToggle}>Add Equipment</Button>
                </Row>
                {/* <Col className="d-flex align-items-center justify-content-end">
              <Button
                className="px-1 px-md-3 py-2 text-sm"
                color="danger"
                onClick={filterToggle}
              >
                <i className="fa-solid fa-filter"></i> Filter by Type
              </Button>
            </Col> */}
              </CardHeader>
              {isLoading ? (
                <Spinner size="lg" className="my-5 mx-auto" />
              ) : (
                <CustomTable columns={columns} rows={rows} />
              )}
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                    // style={paginationContainerStyles}
                  >
                    <ReactPaginate
                      previousLabel={
                        <i
                          className="previous fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                      }
                      nextLabel={
                        <i
                          className="next fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      }
                      breakLabel={"..."}
                      pageCount={Math.ceil(totalCount / itemsPerPage)}
                      onPageChange={handlePageChange}
                      containerClassName={"pagination justify-content-end mb-0"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      activeClassName={"active"}
                      previousClassName={"page-item"}
                      nextClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextLinkClassName={"page-link"}
                    />
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        <Modal isOpen={deleteModal} toggle={deleteToggle}>
          <ModalHeader className="pb-0">Delete Equipment</ModalHeader>
          <ModalBody className="pb-0 d-flex flex-column justify-content-center align-items-center ">
            <Row>
              <i
                className="fa fa-times-circle fa-3x fa-primary"
                style={{
                  color: "#e8294a",
                }}
                aria-hidden="true"
              ></i>
            </Row>
            <Row className="mt-4">Are you sure about deleting this Entry?</Row>
            <Button
              color="danger"
              onClick={async () => {
                try {
                  toast.success("Device Deleted Succesfully!!!");
                } catch (error) {
                  toast.error("Error deleting the device");
                }
                deleteToggle();
              }}
              className="w-100 mt-4"
            >
              Delete
            </Button>{" "}
            <Button
              color="secondary"
              onClick={deleteToggle}
              className="w-100 mt-4 mb-4"
            >
              Cancel
            </Button>
          </ModalBody>
        </Modal>
        {/* <Modal isOpen={filterModal} toggle={filterToggle}>
          <ModalHeader className="pb-0">Filter Device by Type</ModalHeader>
          <ModalBody className="pb-0 d-flex flex-column justify-content-center align-items-center ">
            <Row>
              <i
                className="fa fa-filter fa-3x fa-primary"
                style={{
                  color: "#e8294a",
                }}
                aria-hidden="true"
              ></i>
            </Row>
            <Row className="mt-4 w-100">
              <FormGroup className="w-100">
                <Input type="select" className="p-2">
                  <option>Select Type</option>
                  <option>Type A</option>
                  <option>Type B</option>
                </Input>
              </FormGroup>
            </Row>
            <Button
              color="danger"
              onClick={filterToggle}
              className="w-100 mt-4"
            >
              Filter
            </Button>{" "}
            <Button
              color="secondary"
              onClick={filterToggle}
              className="w-100 mt-4 mb-4"
            >
              Cancel
            </Button>
          </ModalBody>
        </Modal> */}
        {/* <Modal isOpen={treeModal} toggle={treeToggle}>
          <ModalHeader className="pb-0">Configure Device</ModalHeader>
          <ModalBody className="pb-0 d-flex flex-column justify-content-center align-items-center ">
            <Row>
              <i
                className="fa-solid fa-network-wired fa-3x fa-primary"
                style={{
                  color: "#e8294a",
                }}
                aria-hidden="true"
              ></i>
            </Row>
            <Row className="mt-4 w-100">
              <FormGroup className="w-100">
                <Input type="select" className="p-2">
                  <option>Select Parameter</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Input>
              </FormGroup>
            </Row>
            <Button color="danger" onClick={treeToggle} className="w-100 mt-4">
              Update
            </Button>{" "}
            <Button
              color="secondary"
              onClick={treeToggle}
              className="w-100 mt-4 mb-4"
            >
              Cancel
            </Button>
          </ModalBody>
        </Modal> */}
        <Modal isOpen={addModal} toggle={addToggle}>
          <ModalHeader className="pb-0">Add Entry</ModalHeader>
          <ModalBody className="pb-0">
            <Row className="w-100">
              {/* <Col md="12">
                <FormGroup>
                  <Label className="m-0">Manufacturer</Label>
                  <Input
                    value={formData.Manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, Manufacturer: e.target.value })
                    }
                  />
                  {validationErrors.Manufacturer && (
                    <span className="text-danger">
                      {validationErrors.Manufacturer}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Model</Label>
                  <Input
                    value={formData.Model}
                    onChange={(e) =>
                      setFormData({ ...formData, Model: e.target.value })
                    }
                  />
                  {validationErrors.Model && (
                    <span className="text-danger">
                      {validationErrors.Model}
                    </span>
                  )}
                </FormGroup>
              </Col> */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Speed</Label>
                  <Input
                    value={formData.Speed}
                    onChange={(e) =>
                      setFormData({ ...formData, Speed: e.target.value })
                    }
                  />
                  {validationErrors.Speed && (
                    <span className="text-danger">
                      {validationErrors.Speed}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">RPM</Label>
                  <Input
                    value={formData.Rpm}
                    onChange={(e) =>
                      setFormData({ ...formData, Rpm: e.target.value })
                    }
                  />
                  {validationErrors.Rpm && (
                    <span className="text-danger">{validationErrors.Rpm}</span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Fuel Level</Label>
                  <Input
                    value={formData.FuelLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, FuelLevel: e.target.value })
                    }
                  />
                  {validationErrors.FuelLevel && (
                    <span className="text-danger">
                      {validationErrors.FuelLevel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Odometer</Label>
                  <Input
                    value={formData.Odometer}
                    onChange={(e) =>
                      setFormData({ ...formData, Odometer: e.target.value })
                    }
                  />

                  {validationErrors.Odometer && (
                    <span className="text-danger">
                      {validationErrors.Odometer}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Hour Meter</Label>
                  <Input
                    value={formData.HourMeter}
                    onChange={(e) =>
                      setFormData({ ...formData, HourMeter: e.target.value })
                    }
                  />

                  {validationErrors.HourMeter && (
                    <span className="text-danger">
                      {validationErrors.HourMeter}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Hydraulic Pressure</Label>
                  <Input
                    value={formData.HydraulicPressure}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        HydraulicPressure: e.target.value,
                      })
                    }
                  />

                  {validationErrors.HydraulicPressure && (
                    <span className="text-danger">
                      {validationErrors.HydraulicPressure}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Track Tire Tension</Label>
                  <Input
                    value={formData.TrackTireTension}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        TrackTireTension: e.target.value,
                      })
                    }
                  />
                  {validationErrors.TrackTireTension && (
                    <span className="text-danger">
                      {validationErrors.TrackTireTension}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Boom Angle</Label>
                  <Input
                    value={formData.BoomAngle}
                    onChange={(e) =>
                      setFormData({ ...formData, BoomAngle: e.target.value })
                    }
                  />
                  {validationErrors.BoomAngle && (
                    <span className="text-danger">
                      {validationErrors.BoomAngle}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Engine Temperature</Label>
                  <Input
                    value={formData.EngineTemperature}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        EngineTemperature: e.target.value,
                      })
                    }
                  />
                  {validationErrors.EngineTemperature && (
                    <span className="text-danger">
                      {validationErrors.EngineTemperature}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Brake Fluid Level</Label>
                  <Input
                    value={formData.BrakeFluidLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        BrakeFluidLevel: e.target.value,
                      })
                    }
                  />
                  {validationErrors.BrakeFluidLevel && (
                    <span className="text-danger">
                      {validationErrors.BrakeFluidLevel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Engine Oil Level</Label>
                  <Input
                    value={formData.EngineOilLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        EngineOilLevel: e.target.value,
                      })
                    }
                  />
                  {validationErrors.EngineOilLevel && (
                    <span className="text-danger">
                      {validationErrors.EngineOilLevel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Engine Oil Pressure</Label>
                  <Input
                    value={formData.EngineOilPressure}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        EngineOilPressure: e.target.value,
                      })
                    }
                  />
                  {validationErrors.EngineOilPressure && (
                    <span className="text-danger">
                      {validationErrors.EngineOilPressure}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Gear Oil Level</Label>
                  <Input
                    value={formData.GearOilLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, GearOilLevel: e.target.value })
                    }
                  />
                  {validationErrors.GearOilLevel && (
                    <span className="text-danger">
                      {validationErrors.GearOilLevel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Engine Warning PID</Label>
                  <Input
                    value={formData.EngineWarningPID}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        EngineWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.EngineWarningPID && (
                    <span className="text-danger">
                      {validationErrors.EngineWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Hydraulic Warning PID</Label>
                  <Input
                    value={formData.HydraulicWarningPID}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        HydraulicWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.HydraulicWarningPID && (
                    <span className="text-danger">
                      {validationErrors.HydraulicWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Electronics Warning PID</Label>
                  <Input
                    value={formData.ElectronicsWarningPID}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ElectronicsWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.ElectronicsWarningPID && (
                    <span className="text-danger">
                      {validationErrors.ElectronicsWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Brake Warning PID</Label>
                  <Input
                    value={formData.BrakeWarningPID}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        BrakeWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.BrakeWarningPID && (
                    <span className="text-danger">
                      {validationErrors.BrakeWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Transmission Warning PID</Label>
                  <Input
                    value={formData.TransmissionWarningPID}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        TransmissionWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.TransmissionWarningPID && (
                    <span className="text-danger">
                      {validationErrors.TransmissionWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleSubmit}>
              Add
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                addToggle();
                setValidationErrors({});

                setFormData({
                  Manufacturer: "",
                  Model: "",
                  Speed: "",
                  Rpm: "",
                  FuelLevel: "",
                  Odometer: "",
                  HourMeter: "",
                  HydraulicPressure: "",
                  TrackTireTension: "",
                  BoomAngle: "",
                  EngineTemperature: "",
                  BrakeFluidLevel: "",
                  EngineOilLevel: "",
                  EngineOilPressure: "",
                  GearOilLevel: "",
                  EngineWarningPID: "",
                  HydraulicWarningPID: "",
                  ElectronicsWarningPID: "",
                  BrakeWarningPID: "",
                  TransmissionWarningPID: "",
                });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={editModal} toggle={editToggle}>
          <ModalHeader className="pb-0">Edit Entry</ModalHeader>
          <ModalBody className="pb-0">
            <Row className="w-100">
              {/* <Col md="12">
                <FormGroup>
                  <Label className="m-0">Manufacturer</Label>
                  <Input
                    value={editedItem?.Manufacturer || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        Manufacturer: e.target.value,
                      })
                    }
                  />
                  {validationErrors.Manufacturer && (
                    <span className="text-danger">
                      {validationErrors.Manufacturer}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="12"> */}
              <FormGroup>
                <Label className="m-0">Model</Label>
                <Input
                  value={editedItem?.Model || ""}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      Model: e.target.value,
                    })
                  }
                />
                {validationErrors.Model && (
                  <span className="text-danger">{validationErrors.Model}</span>
                )}
              </FormGroup>
              {/* </Col> */}
              {/* Speed */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Speed</Label>
                  <Input
                    value={editedItem?.Speed || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        Speed: e.target.value,
                      })
                    }
                  />
                  {validationErrors.Speed && (
                    <span className="text-danger">
                      {validationErrors.Speed}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* RPM */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">RPM</Label>
                  <Input
                    value={editedItem?.Rpm || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        Rpm: e.target.value,
                      })
                    }
                  />
                  {validationErrors.Rpm && (
                    <span className="text-danger">{validationErrors.Rpm}</span>
                  )}
                </FormGroup>
              </Col>
              {/* Fuel Level */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Fuel Level</Label>
                  <Input
                    value={editedItem?.FuelLevel || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        FuelLevel: e.target.value,
                      })
                    }
                  />
                  {validationErrors.FuelLevel && (
                    <span className="text-danger">
                      {validationErrors.FuelLevel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Odometer */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Odometer</Label>
                  <Input
                    value={editedItem?.Odometer || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        Odometer: e.target.value,
                      })
                    }
                  />
                  {validationErrors.Odometer && (
                    <span className="text-danger">
                      {validationErrors.Odometer}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Hour Meter */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Hour Meter</Label>
                  <Input
                    value={editedItem?.HourMeter || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        HourMeter: e.target.value,
                      })
                    }
                  />
                  {validationErrors.HourMeter && (
                    <span className="text-danger">
                      {validationErrors.HourMeter}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Hydraulic Pressure */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Hydraulic Pressure</Label>
                  <Input
                    value={editedItem?.HydraulicPressure || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        HydraulicPressure: e.target.value,
                      })
                    }
                  />
                  {validationErrors.HydraulicPressure && (
                    <span className="text-danger">
                      {validationErrors.HydraulicPressure}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Track Tire Tension */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Track Tire Tension</Label>
                  <Input
                    value={editedItem?.TrackTireTension || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        TrackTireTension: e.target.value,
                      })
                    }
                  />
                  {validationErrors.TrackTireTension && (
                    <span className="text-danger">
                      {validationErrors.TrackTireTension}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Boom Angle */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Boom Angle</Label>
                  <Input
                    value={editedItem?.BoomAngle || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        BoomAngle: e.target.value,
                      })
                    }
                  />
                  {validationErrors.BoomAngle && (
                    <span className="text-danger">
                      {validationErrors.BoomAngle}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Engine Temperature */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Engine Temperature</Label>
                  <Input
                    value={editedItem?.EngineTemperature || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        EngineTemperature: e.target.value,
                      })
                    }
                  />
                  {validationErrors.EngineTemperature && (
                    <span className="text-danger">
                      {validationErrors.EngineTemperature}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Brake Fluid Level */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Brake Fluid Level</Label>
                  <Input
                    value={editedItem?.BrakeFluidLevel || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        BrakeFluidLevel: e.target.value,
                      })
                    }
                  />
                  {validationErrors.BrakeFluidLevel && (
                    <span className="text-danger">
                      {validationErrors.BrakeFluidLevel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Engine Oil Level */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Engine Oil Level</Label>
                  <Input
                    value={editedItem?.EngineOilLevel || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        EngineOilLevel: e.target.value,
                      })
                    }
                  />
                  {validationErrors.EngineOilLevel && (
                    <span className="text-danger">
                      {validationErrors.EngineOilLevel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Engine Oil Pressure */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Engine Oil Pressure</Label>
                  <Input
                    value={editedItem?.EngineOilPressure || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        EngineOilPressure: e.target.value,
                      })
                    }
                  />
                  {validationErrors.EngineOilPressure && (
                    <span className="text-danger">
                      {validationErrors.EngineOilPressure}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Gear Oil Level */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Gear Oil Level</Label>
                  <Input
                    value={editedItem?.GearOilLevel || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        GearOilLevel: e.target.value,
                      })
                    }
                  />
                  {validationErrors.GearOilLevel && (
                    <span className="text-danger">
                      {validationErrors.GearOilLevel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Engine Warning PID */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Engine Warning PID</Label>
                  <Input
                    value={editedItem?.EngineWarningPID || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        EngineWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.EngineWarningPID && (
                    <span className="text-danger">
                      {validationErrors.EngineWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Hydraulic Warning PID */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Hydraulic Warning PID</Label>
                  <Input
                    value={editedItem?.HydraulicWarningPID || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        HydraulicWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.HydraulicWarningPID && (
                    <span className="text-danger">
                      {validationErrors.HydraulicWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Electronics Warning PID */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Electronics Warning PID</Label>
                  <Input
                    value={editedItem?.ElectronicsWarningPID || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        ElectronicsWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.ElectronicsWarningPID && (
                    <span className="text-danger">
                      {validationErrors.ElectronicsWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Brake Warning PID */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Brake Warning PID</Label>
                  <Input
                    value={editedItem?.BrakeWarningPID || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        BrakeWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.BrakeWarningPID && (
                    <span className="text-danger">
                      {validationErrors.BrakeWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* Transmission Warning PID */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Transmission Warning PID</Label>
                  <Input
                    value={editedItem?.TransmissionWarningPID || ""}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        TransmissionWarningPID: e.target.value,
                      })
                    }
                  />
                  {validationErrors.TransmissionWarningPID && (
                    <span className="text-danger">
                      {validationErrors.TransmissionWarningPID}
                    </span>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleEdit}>
              Update
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                setEditModal(false);
                setEditedItem(null);
                setValidationErrors({});
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default EquipmentTypes;
