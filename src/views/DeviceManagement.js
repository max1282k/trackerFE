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
import { useGetEquipment } from "utils/equipment";
import { useCreateEquipment } from "utils/equipment";
import { useEditEquipment } from "utils/equipment";

const DeviceManagement = () => {
  // const organizationData = [];
  const navigate = useNavigate();
  const deleteDeviceMutation = useDeleteDevice();
  const columns = [
    "Serial Number",
    "Model Manufacturer",
    "Initial Maintenance",
    "Regular Maintenance",
    "Last Maintenance",
    "Maintenance Contract",
    "Smart Device",
    "Operational Hours",
    "Current Status",
    "Latitude",
    "Longitude",
    "IMEI",
    "Speed",
    "RPM Fuel Level",
    "Action",
  ];
  const [formData, setFormData] = useState({
    machineName: "",
    imei: "",
    client: "",
    serialNumber: "",
    machineModel: "",
    brand: "",
    category: "",
    SmartDeviceRunningStatus: "",
    states: "",
    department: "",
    interval: "",
    initialMaintenance: "",
    maintenanceAgreement: "",
    latitude: "",
    longitude: "",
    smartDevice: false,
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
  const itemsPerPage = 10;
  const { isLoading, data: organizationData, error } = useGetEquipment();
  const createEquipmentMutation = useCreateEquipment();
  const editEquipmentMutation = useEditEquipment();
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const addToggle = () => setAddModal(!addModal);
  const filterToggle = () => setFilterModal(!filterModal);
  const treeToggle = () => setTreeModal(!treeModal);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  console.log(formData.imei);

  const reArrageData = () => {
    let tempArr = [];

    organizationData?.forEach((item, idx) => {
      tempArr?.push({
        serialNumber: item?.serialNumber,
        modelManufacturer: item?.manufacturer,
        regularMaintenance: "30 hours",
        initialMaintenance: item?.initialMaintenance,
        lastMaintenance: item?.lastMaintenance,
        maintenanceContract: false ? "Yes" : "No",
        smartDevice: item?.smartDevice ? "Yes" : "No",
        operationalHours: 200,
        currentStatus: "active",
        latitude: item?.latitude,
        longitude: item?.longitude,

        imei: item?.imei,
        speed: item?.speed,
        rpm: item?.rpm,
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
            <Button
              size="sm"
              color="primary"
              onClick={() =>
                navigate("/admin/device-details", { state: item._id })
              }
            >
              <i className="fa-solid fa-eye"></i>
            </Button>
            <Button
              size="sm"
              color="info"
              onClick={() => {
                setFormData({
                  machineName: item?.machineName,
                  imei: item?.imei,
                  client: item?.client,
                  serialNumber: item?.serialNumber,
                  machineModel: item?.machineModel,
                  brand: item?.brand,
                  category: item?.category,
                  SmartDeviceRunningStatus: item?.SmartDeviceRunningStatus,
                  states: item?.states,
                  department: item?.department,
                  interval: item?.interval,
                  initialMaintenance: item?.initialMaintenance,
                  maintenanceAgreement: item?.maintenanceAgreement,
                  latitude: item?.latitude,
                  longitude: item?.longitude,
                  smartDevice: item?.smartDevice ? true : false,
                });
                treeToggle();
              }}
            >
              <i class="fa-regular fa-pen-to-square"></i>
            </Button>
          </>
        ),
      });
    });
    setRows(tempArr);
  };

  const validateForm = () => {
    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // if (!validateForm()) {
      //   return;
      // }
      await createEquipmentMutation.mutateAsync(formData);

      setFormData({
        machineName: "",
        imei: "",
        client: "",
        serialNumber: "",
        machineModel: "",
        brand: "",
        category: "",
        SmartDeviceRunningStatus: "",
        states: "",
        department: "",
        interval: "",
        initialMaintenance: "",
        maintenanceAgreement: "",
        smartDevice: "",
      });
      setAddModal(false);
      setValidationErrors({});
      toast.success("Equipment Added Successfully!");
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleEditSubmit = async () => {
    try {
      // if (!validateForm()) {
      //   return;
      // }

      await editEquipmentMutation.mutateAsync(formData);

      setFormData({
        machineName: "",
        imei: "",
        client: "",
        serialNumber: "",
        machineModel: "",
        brand: "",
        category: "",
        SmartDeviceRunningStatus: "",
        states: "",
        department: "",
        interval: "",
        initialMaintenance: "",
        maintenanceAgreement: "",
        smartDevice: "",
      });
      setTreeModal(false);
      setValidationErrors({});
      toast.success("Equipment Edited Successfully!");
    } catch (error) {
      toast.error(error?.message);
    }
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
                  <h3 className="mb-0">Equipment</h3>
                  <Button onClick={addToggle}>Add Device</Button>
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
                          class="previous fa fa-chevron-left"
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
          <ModalHeader className="pb-0">Delete Device</ModalHeader>
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
            <Row className="mt-4">Are you sure about deleting this device?</Row>
            <Button
              color="danger"
              onClick={async () => {
                try {
                  await deleteDeviceMutation.mutateAsync({
                    id: id,
                  });
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
        <Modal isOpen={filterModal} toggle={filterToggle}>
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
        </Modal>
        <Modal isOpen={treeModal} toggle={treeToggle}>
          <ModalHeader className="pb-0">Configure Device</ModalHeader>
          <ModalBody className="pb-0 d-flex flex-column justify-content-center align-items-center ">
            <Row className="w-100">
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Machine Name</Label>
                  <Input
                    value={formData.machineName}
                    onChange={(e) =>
                      setFormData({ ...formData, machineName: e.target.value })
                    }
                  />
                  {validationErrors.machineName && (
                    <span className="text-danger">
                      {validationErrors.machineName}
                    </span>
                  )}
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Client</Label>
                  <Input
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                  />
                  {validationErrors.client && (
                    <span className="text-danger">
                      {validationErrors.client}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Serial Number</Label>
                  <Input
                    value={formData.serialNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, serialNumber: e.target.value })
                    }
                  />
                  {validationErrors.serialNumber && (
                    <span className="text-danger">
                      {validationErrors.serialNumber}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Machine Model</Label>
                  <Input
                    value={formData.machineModel}
                    onChange={(e) =>
                      setFormData({ ...formData, machineModel: e.target.value })
                    }
                  />
                  {validationErrors.machineModel && (
                    <span className="text-danger">
                      {validationErrors.machineModel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Latitude</Label>
                  <Input
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                  />
                  {validationErrors.latitude && (
                    <span className="text-danger">
                      {validationErrors.latitude}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Longitude</Label>
                  <Input
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                  />
                  {validationErrors.longitude && (
                    <span className="text-danger">
                      {validationErrors.longitude}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Brand</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                  {validationErrors.brand && (
                    <span className="text-danger">
                      {validationErrors.brand}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Category</Label>
                  <Input
                    type="select"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option></option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.category && (
                    <span className="text-danger">
                      {validationErrors.category}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">States</Label>
                  <Input
                    type="select"
                    value={formData.states}
                    onChange={(e) =>
                      setFormData({ ...formData, states: e.target.value })
                    }
                  >
                    <option></option>

                    <option>Atlanida</option>
                    <option>Choluteca</option>
                    <option>Colon</option>
                    <option>Camayagua</option>
                    <option>Copan</option>
                    <option>Cortes</option>
                    <option>EL Paraiso</option>
                    <option>Francisco Morazan</option>
                    <option>Gracias A Dios</option>
                    <option>Intibuca</option>
                    <option>Islas De La Bahia</option>
                    <option>La Paz</option>
                    <option>Lempira</option>
                    <option>Ocotepeque</option>
                    <option>Olancho</option>
                    <option>Santa Barbara</option>
                    <option>Vaile</option>

                    {/* Add options for states dropdown */}
                  </Input>
                  {validationErrors.states && (
                    <span className="text-danger">
                      {validationErrors.states}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Department</Label>
                  <Input
                    type="select"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <option></option>

                    <option>Department 1</option>
                    <option>Department 2</option>
                    <option>Department 3</option>
                    <option>Department 4</option>
                    {/* Add options for department dropdown */}
                  </Input>
                  {validationErrors.department && (
                    <span className="text-danger">
                      {validationErrors.department}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Interval</Label>
                  <Input
                    value={formData.interval}
                    onChange={(e) =>
                      setFormData({ ...formData, interval: e.target.value })
                    }
                  />
                  {validationErrors.interval && (
                    <span className="text-danger">
                      {validationErrors.interval}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Last Maintenance</Label>
                  <Input
                    value={formData.lastMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastMaintenance: e.target.value,
                      })
                    }
                  />
                  {validationErrors.lastMaintenance && (
                    <span className="text-danger">
                      {validationErrors.lastMaintenance}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Initial Maintenance</Label>
                  <Input
                    value={formData.initialMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        initialMaintenance: e.target.value,
                      })
                    }
                  />
                  {validationErrors.initialMaintenance && (
                    <span className="text-danger">
                      {validationErrors.initialMaintenance}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Smart Device</Label>
                  <Input
                    type="select"
                    value={formData.smartDevice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        smartDevice: e.target.value === "Yes" ? true : false,
                      })
                    }
                  >
                    <option></option>

                    <option>Yes</option>
                    <option>No</option>
                    {/* Add options for maintenance agreement dropdown */}
                  </Input>
                  {validationErrors.smartDevice && (
                    <span className="text-danger">
                      {validationErrors.smartDevice}
                    </span>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              type="submit"
              onClick={handleEditSubmit}
              disabled={editEquipmentMutation.isLoading}
            >
              {editEquipmentMutation.isLoading ? <Spinner /> : "Add"}
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                treeToggle();
                setValidationErrors({});

                setFormData({
                  machineName: "",
                  client: "",
                  serialNumber: "",
                  machineModel: "",
                  brand: "",
                  category: "",
                  SmartDeviceRunningStatus: "",
                  states: "",
                  department: "",
                  interval: "",
                  initialMaintenance: "",
                  maintenanceAgreement: "",
                  smartDevice: false,
                });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={addModal} toggle={addToggle}>
          <ModalHeader className="pb-0">Add Device</ModalHeader>
          <ModalBody className="pb-0">
            <Row className="w-100">
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Machine Name</Label>
                  <Input
                    value={formData.machineName}
                    onChange={(e) =>
                      setFormData({ ...formData, machineName: e.target.value })
                    }
                  />
                  {validationErrors.machineName && (
                    <span className="text-danger">
                      {validationErrors.machineName}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">IMEI</Label>
                  <Input
                    value={formData.imei}
                    onChange={(e) =>
                      setFormData({ ...formData, imei: e.target.value })
                    }
                  />
                  {validationErrors.imei && (
                    <span className="text-danger">{validationErrors.imei}</span>
                  )}
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Client</Label>
                  <Input
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                  />
                  {validationErrors.client && (
                    <span className="text-danger">
                      {validationErrors.client}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Serial Number</Label>
                  <Input
                    value={formData.serialNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, serialNumber: e.target.value })
                    }
                  />
                  {validationErrors.serialNumber && (
                    <span className="text-danger">
                      {validationErrors.serialNumber}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Machine Model</Label>
                  <Input
                    value={formData.machineModel}
                    onChange={(e) =>
                      setFormData({ ...formData, machineModel: e.target.value })
                    }
                  />
                  {validationErrors.machineModel && (
                    <span className="text-danger">
                      {validationErrors.machineModel}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Latitude</Label>
                  <Input
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                  />
                  {validationErrors.latitude && (
                    <span className="text-danger">
                      {validationErrors.latitude}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Longitude</Label>
                  <Input
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                  />
                  {validationErrors.longitude && (
                    <span className="text-danger">
                      {validationErrors.longitude}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Brand</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                  {validationErrors.brand && (
                    <span className="text-danger">
                      {validationErrors.brand}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Category</Label>
                  <Input
                    type="select"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option></option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.category && (
                    <span className="text-danger">
                      {validationErrors.category}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">States</Label>
                  <Input
                    type="select"
                    value={formData.states}
                    onChange={(e) =>
                      setFormData({ ...formData, states: e.target.value })
                    }
                  >
                    <option></option>

                    <option>Atlanida</option>
                    <option>Choluteca</option>
                    <option>Colon</option>
                    <option>Camayagua</option>
                    <option>Copan</option>
                    <option>Cortes</option>
                    <option>EL Paraiso</option>
                    <option>Francisco Morazan</option>
                    <option>Gracias A Dios</option>
                    <option>Intibuca</option>
                    <option>Islas De La Bahia</option>
                    <option>La Paz</option>
                    <option>Lempira</option>
                    <option>Ocotepeque</option>
                    <option>Olancho</option>
                    <option>Santa Barbara</option>
                    <option>Vaile</option>

                    {/* Add options for states dropdown */}
                  </Input>
                  {validationErrors.states && (
                    <span className="text-danger">
                      {validationErrors.states}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Department</Label>
                  <Input
                    type="select"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <option></option>

                    <option>Department 1</option>
                    <option>Department 2</option>
                    <option>Department 3</option>
                    <option>Department 4</option>
                    {/* Add options for department dropdown */}
                  </Input>
                  {validationErrors.department && (
                    <span className="text-danger">
                      {validationErrors.department}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Interval</Label>
                  <Input
                    value={formData.interval}
                    onChange={(e) =>
                      setFormData({ ...formData, interval: e.target.value })
                    }
                  />
                  {validationErrors.interval && (
                    <span className="text-danger">
                      {validationErrors.interval}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Last Maintenance</Label>
                  <Input
                    value={formData.lastMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastMaintenance: e.target.value,
                      })
                    }
                  />
                  {validationErrors.lastMaintenance && (
                    <span className="text-danger">
                      {validationErrors.lastMaintenance}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Initial Maintenance</Label>
                  <Input
                    value={formData.initialMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        initialMaintenance: e.target.value,
                      })
                    }
                  />
                  {validationErrors.initialMaintenance && (
                    <span className="text-danger">
                      {validationErrors.initialMaintenance}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Smart Device</Label>
                  <Input
                    type="select"
                    value={formData.smartDevice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        smartDevice: e.target.value === "Yes" ? true : false,
                      })
                    }
                  >
                    <option></option>

                    <option>Yes</option>
                    <option>No</option>
                    {/* Add options for maintenance agreement dropdown */}
                  </Input>
                  {validationErrors.smartDevice && (
                    <span className="text-danger">
                      {validationErrors.smartDevice}
                    </span>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              type="submit"
              onClick={handleSubmit}
              disabled={createEquipmentMutation.isLoading}
            >
              {createEquipmentMutation.isLoading ? <Spinner /> : "Add"}
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                addToggle();
                setValidationErrors({});

                setFormData({
                  machineName: "",
                  client: "",
                  serialNumber: "",
                  machineModel: "",
                  brand: "",
                  category: "",
                  SmartDeviceRunningStatus: "",
                  states: "",
                  department: "",
                  interval: "",
                  initialMaintenance: "",
                  maintenanceAgreement: "",
                  smartDevice: false,
                });
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

export default DeviceManagement;
