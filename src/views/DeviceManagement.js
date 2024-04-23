// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  Container,
  Row,
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
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useGetEquipment } from "utils/equipment";
import { useCreateEquipment } from "utils/equipment";
import { useEditEquipment } from "utils/equipment";
import { useDeleteEquipment } from "utils/equipment";

const DeviceManagement = () => {
  // const organizationData = [];
  const navigate = useNavigate();
  const deleteDeviceMutation = useDeleteEquipment();
  const columns = [
    "Serial Number",
    "Model",
    "Manufacturer",
    "Initial Maintenance",
    "Regular Maintenance",
    "Last Maintenance",
    "Maintenance Contract",
    "Smart Device",
    // "Operational Hours",
    // "Current Status",
    // "Latitude",
    // "Longitude",
    // "IMEI",
    // "Speed",
    // "RPM Fuel Level",
    "Action",
  ];
  const [formData, setFormData] = useState({
    // machineName: "",
    // imei: "",
    organization: "",
    serialNumber: "",
    machineModel: "",
    manufacturer: "",
    category: "",
    SmartDeviceRunningStatus: "",
    states: "",
    otherState: "",
    // department: "",
    maintainanceInterval: "",
    initialMaintenance: "",
    maintenanceAgreement: "",
    // latitude: "",
    // longitude: "",
    smartDevice: "",
    maintenanceContract: "",

  });
  const [validationErrors, setValidationErrors] = useState({});
  const [rows, setRows] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [treeModal, setTreeModal] = useState(false);
  const [id, setId] = useState();
  const [userId, setUserId] = useState();
  // const [imei, setImei] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const { isLoading, data: organizationData, error } = useGetEquipment();
  const createEquipmentMutation = useCreateEquipment();
  const editEquipmentMutation = useEditEquipment();
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const addUserToggle = () => setAddUserModal(!addUserModal);
  const addToggle = () => setAddModal(!addModal);
  const filterToggle = () => setFilterModal(!filterModal);
  const treeToggle = () => setTreeModal(!treeModal);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // console.log(formData.imei);

  const reArrageData = () => {
    let tempArr = [];

    organizationData?.forEach((item, idx) => {
      tempArr?.push({
        serialNumber: item?.serialNumber,
        model: item?.machineModel,
        manufacturer: item?.manufacturer,
        initialMaintenance: item?.initialMaintenance,
        regularMaintenance: item?.maintainanceInterval,
        lastMaintenance: item?.lastMaintenance,
        maintenanceContract: item?.maintenanceContract,
        smartDevice: item?.smartDevice,
        // operationalHours: 200,
        // currentStatus: "active",
        // latitude: item?.latitude,
        // longitude: item?.longitude,
        // imei: item?.imei,
        // speed: item?.speed,
        // rpm: item?.rpm,
        actions: (
          <>
            <Button
              size="sm"
              color="secondary"
              onClick={() => {
                sessionStorage.setItem("deviceId", item._id);
                window.open(`/configure-device`);
              }}
            >
              <i className="fa-solid fa-circle-plus"></i>
            </Button>
            <Button
              size="sm"
              color="secondary"
              onClick={() => {
                // deleteToggle();
                addUserToggle();
                setId(item._id);
              }}
            >
              <i className="fa-solid fa-user-plus"></i>
            </Button>
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
                setId(item?._id);
                setFormData({
                  // machineName: item?.machineName,
                  // imei: item?.imei,
                  organization: item?.organization,
                  serialNumber: item?.serialNumber,
                  machineModel: item?.machineModel,
                  manufacturer: item?.manufacturer,
                  // brand: item?.brand,
                  category: item?.category,
                  // SmartDeviceRunningStatus: item?.SmartDeviceRunningStatus,
                  states: item?.states,
                  // department: item?.department,
                  maintainanceInterval: item?.maintainanceInterval,
                  initialMaintenance: item?.initialMaintenance,
                  lastMaintenance: item?.lastMaintenance,
                  maintenanceAgreement: item?.maintenanceAgreement,
                  // latitude: item?.latitude,
                  // longitude: item?.longitude,
                  smartDevice: item?.smartDevice,
                  maintenanceContract: item?.maintenanceContract
                });
                treeToggle();
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </>
        ),
      });
    });
    setRows(tempArr);
  };

  // const validateForm = () => {
  //   const errors = {};
  //   for (const key in formData) {
  //     if (!formData[key]) {
  //       errors[key] = `${
  //         key.charAt(0).toUpperCase() + key.slice(1)
  //       } is required`;
  //     }
  //   }
  //   setValidationErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // if (!validateForm()) {
      //   return;
      // }
      await createEquipmentMutation.mutateAsync(formData);
      resetFormData();
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

      await editEquipmentMutation.mutateAsync({
        formData: formData,
        id: id,
      });

      resetFormData();
      setTreeModal(false);
      setValidationErrors({});
      toast.success("Equipment Edited Successfully!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const resetFormData = () => {
    setFormData({
      // machineName: "",
      // imei: "",
      organization: "",
      serialNumber: "",
      machineModel: "",
      manufacturer: "",
      category: "",
      SmartDeviceRunningStatus: "",
      states: "",
      otherState: "",
      // department: "",
      maintainanceInterval: "",
      initialMaintenance: "",
      maintenanceAgreement: "",
      // latitude: "",
      // longitude: "",
      smartDevice: "",
      maintenanceContract: "",
      user: "",
    });
  };

  useEffect(() => {
    if (organizationData) {
      reArrageData();
      setTotalCount(organizationData?.totalCount);
    }
    if (error) {
      toast.error(error.message);
    }
    // eslint-disable-next-line
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
        <Modal isOpen={treeModal} toggle={treeToggle} size="lg">
          <ModalHeader className="pb-0">Edit Device</ModalHeader>
          <ModalBody className="pb-0">
            <Row className="w-100">
              {/* <Col md="12">
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
              </Col> */}
              {/* <Col md="12">
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
              </Col> */}
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Organization</Label>
                  <Input
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                  />
                  {validationErrors.organization && (
                    <span className="text-danger">
                      {validationErrors.organization}
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
                    // type="select"
                    value={formData.machineModel}
                    onChange={(e) =>
                      setFormData({ ...formData, machineModel: e.target.value })
                    }
                  >
                    <option disabled selected value="">
                      Select a model
                    </option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.category && (
                    <span className="text-danger">
                      {validationErrors.category}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* <Col md="6">
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
              </Col> */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Manufacturer</Label>
                  <Input
                    // type="select"
                    value={formData.manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, manufacturer: e.target.value })
                    }
                  >
                    <option disabled selected value="">
                      Select a manufacturer
                    </option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.manufacturer && (
                    <span className="text-danger">
                      {validationErrors.manufacturer}
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
                      setFormData({ ...formData, smartDevice: e.target.value })
                    }
                  >
                    <option disabled selected value="">
                      Select an option
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.smartDevice && (
                    <span className="text-danger">
                      {validationErrors.smartDevice}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Maintenance Contract</Label>
                  <Input
                    type="select"
                    value={formData.maintenanceContract}
                    onChange={(e) =>
                      setFormData({ ...formData, maintenanceContract: e.target.value })
                    }
                  >
                    <option disabled selected value="">
                      Select an option
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.maintenanceContract && (
                    <span className="text-danger">
                      {validationErrors.maintenanceContract}
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
                    <option disabled selected value="">
                      Select a category
                    </option>
                    <option>Mini excavator</option>
                    <option>Small excavator</option>
                    <option>Medium excavator</option>
                    <option>Large excavator</option>
                    <option>Header Machine</option>
                    <option>Dump Truck</option>
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
                    disabled={formData?.otherState !== ""}
                  >
                    <option disabled selected value="">
                      Select a state
                    </option>
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
                    <option value="Other">Other</option>
                    {/* Add options for states dropdown */}
                  </Input>
                  {validationErrors.states && (
                    <span className="text-danger">
                      {validationErrors.states}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {formData?.states === "Other" && (
                <Col md="6">
                  <FormGroup>
                    <Label className="m-0">Other State</Label>
                    <Input
                      type="text"
                      value={formData.otherState}
                      onChange={(e) =>
                        setFormData({ ...formData, otherState: e.target.value })
                      }
                    />
                    {validationErrors.otherState && (
                      <span className="text-danger">
                        {validationErrors.otherState}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              )}
              {/* <Col md="6">
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
                  </Input>
                  {validationErrors.department && (
                    <span className="text-danger">
                      {validationErrors.department}
                    </span>
                  )}
                </FormGroup>
              </Col> */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">
                    Maintenance Interval Regular (hours)
                  </Label>
                  <Input
                    value={formData.maintainanceInterval}
                    type="number"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maintainanceInterval: e.target.value,
                      })
                    }
                  />
                  {validationErrors.maintainanceInterval && (
                    <span className="text-danger">
                      {validationErrors.maintainanceInterval}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Last Maintenance (hours)</Label>
                  <Input
                    value={formData.lastMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastMaintenance: e.target.value,
                      })
                    }
                    type="number"
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
                  <Label className="m-0">
                    Maintenance Interval Initial (hours)
                  </Label>
                  <Input
                    value={formData.initialMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        initialMaintenance: e.target.value,
                      })
                    }
                    type="number"
                  />
                  {validationErrors.initialMaintenance && (
                    <span className="text-danger">
                      {validationErrors.initialMaintenance}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* <Col md="6">
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
                  </Input>
                  {validationErrors.smartDevice && (
                    <span className="text-danger">
                      {validationErrors.smartDevice}
                    </span>
                  )}
                </FormGroup>
              </Col> */}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              type="submit"
              onClick={handleEditSubmit}
              disabled={editEquipmentMutation.isLoading}
            >
              {editEquipmentMutation.isLoading ? <Spinner /> : "Save"}
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                treeToggle();
                setValidationErrors({});
                resetFormData();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={addModal} toggle={addToggle} size="lg">
          <ModalHeader className="pb-0">Add Device</ModalHeader>
          <ModalBody className="pb-0">
            <Row className="w-100">
              {/* <Col md="12">
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
              </Col> */}
              {/* <Col md="12">
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
              </Col> */}
              <Col md="12">
                <FormGroup>
                  <Label className="m-0">Organization</Label>
                  <Input
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                  />
                  {validationErrors.organization && (
                    <span className="text-danger">
                      {validationErrors.organization}
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
                  <Label className="m-0">Macine Model</Label>
                  <Input
                    type="select"
                    value={formData.machineModel}
                    onChange={(e) =>
                      setFormData({ ...formData, machineModel: e.target.value })
                    }
                  >
                    <option disabled selected value="">
                      Select a model
                    </option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.category && (
                    <span className="text-danger">
                      {validationErrors.category}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* <Col md="6">
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
              </Col> */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Manufacturer</Label>
                  <Input
                    // type="select"
                    value={formData.manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, manufacturer: e.target.value })
                    }
                  >
                    <option disabled selected value="">
                      Select a manufacturer
                    </option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.manufacturer && (
                    <span className="text-danger">
                      {validationErrors.manufacturer}
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
                      setFormData({ ...formData, smartDevice: e.target.value })
                    }
                  >
                    <option disabled selected value="">
                      Select an option
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.smartDevice && (
                    <span className="text-danger">
                      {validationErrors.smartDevice}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Maintenance Contract</Label>
                  <Input
                    type="select"
                    value={formData.maintenanceContract}
                    onChange={(e) =>
                      setFormData({ ...formData, maintenanceContract: e.target.value })
                    }
                  >
                    <option disabled selected value="">
                      Select an option
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                    {/* Add options for category dropdown */}
                  </Input>
                  {validationErrors.maintenanceContract && (
                    <span className="text-danger">
                      {validationErrors.maintenanceContract}
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
                    <option disabled selected value="">
                      Select a category
                    </option>
                    <option>Mini excavator</option>
                    <option>Small excavator</option>
                    <option>Medium excavator</option>
                    <option>Large excavator</option>
                    <option>Header Machine</option>
                    <option>Dump Truck</option>
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
                    disabled={formData?.otherState !== ""}
                  >
                    <option disabled selected value="">
                      Select a state
                    </option>
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
                    <option value="Other">Other</option>
                    {/* Add options for states dropdown */}
                  </Input>
                  {validationErrors.states && (
                    <span className="text-danger">
                      {validationErrors.states}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {formData?.states === "Other" && (
                <Col md="6">
                  <FormGroup>
                    <Label className="m-0">Other State</Label>
                    <Input
                      type="text"
                      value={formData.otherState}
                      onChange={(e) =>
                        setFormData({ ...formData, otherState: e.target.value })
                      }
                    />
                    {validationErrors.otherState && (
                      <span className="text-danger">
                        {validationErrors.otherState}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              )}
              {/* <Col md="6">
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
                  </Input>
                  {validationErrors.department && (
                    <span className="text-danger">
                      {validationErrors.department}
                    </span>
                  )}
                </FormGroup>
              </Col> */}
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">
                    Maintenance Interval Regular (hours)
                  </Label>
                  <Input
                    value={formData.maintainanceInterval}
                    type="number"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maintainanceInterval: e.target.value,
                      })
                    }
                  />
                  {validationErrors.maintainanceInterval && (
                    <span className="text-danger">
                      {validationErrors.maintainanceInterval}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="m-0">Last Maintenance (hours)</Label>
                  <Input
                    value={formData.lastMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastMaintenance: e.target.value,
                      })
                    }
                    type="number"
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
                  <Label className="m-0">
                    Maintenance Interval Initial (hours)
                  </Label>
                  <Input
                    value={formData.initialMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        initialMaintenance: e.target.value,
                      })
                    }
                    type="number"
                  />
                  {validationErrors.initialMaintenance && (
                    <span className="text-danger">
                      {validationErrors.initialMaintenance}
                    </span>
                  )}
                </FormGroup>
              </Col>
              {/* <Col md="6">
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
                  </Input>
                  {validationErrors.smartDevice && (
                    <span className="text-danger">
                      {validationErrors.smartDevice}
                    </span>
                  )}
                </FormGroup>
              </Col> */}
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
                resetFormData();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={addUserModal} toggle={addUserToggle}>
          <ModalHeader className="pb-0">Add User</ModalHeader>
          <ModalBody className="pb-0">
            <Row className="w-100">
              <Col>
                <FormGroup>
                  <Label className="m-0">User ID</Label>
                  <Input
                    value={userId}
                    placeholder="user id e.g 87544678987654"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  {validationErrors.user && (
                    <span className="text-danger">{validationErrors.user}</span>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              type="submit"
              onClick={async () => {
                try {
                  await editEquipmentMutation.mutateAsync({
                    id: id,
                    formData: { user: userId },
                  });
                  toast.success("User added successfully");
                  addUserToggle();
                  setUserId("");
                } catch (error) {
                  toast.error(error?.message);
                }
              }}
              disabled={editEquipmentMutation.isLoading}
            >
              {editEquipmentMutation.isLoading ? <Spinner /> : "Add"}
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                addUserToggle();
                setValidationErrors({});
                resetFormData();
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
