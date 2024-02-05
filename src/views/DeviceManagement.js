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

const DeviceManagement = () => {
  // const organizationData = [];
  const navigate = useNavigate();
  const deleteDeviceMutation = useDeleteDevice();
  const columns = [
    "id",
    "Device Type",
    "Equipment Type",
    "Supported Parameters",
    "Actions",
  ];
  const [rows, setRows] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [treeModal, setTreeModal] = useState(false);
  const [id, setId] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const { isLoading, data:organizationData, error } = useGetAllDevices({limit: itemsPerPage,offset: (currentPage * itemsPerPage)});
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const filterToggle = () => setFilterModal(!filterModal);
  const treeToggle = () => setTreeModal(!treeModal);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const reArrageData = () => {
    let tempArr = [];

    organizationData.results.forEach((item, idx) => {
      tempArr?.push({
        id: item?._id,
        deviceType: item?.deviceType?.name,
        equipmentType: item?.equipmentType?.name,
        supportedParameters: Object.keys(item?.status)?.length -1,
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
            <Button size="sm" color="primary" onClick={treeToggle}>
              <i className="fa-solid fa-network-wired"></i>
            </Button>
            {/* <Button size="sm" color="info" onClick={treeToggle}>
            <i class="fa-regular fa-pen-to-square"></i>
            </Button> */}
          </>
        ),
      });
    });
    setRows(tempArr);
  };

  useEffect(() => {
    if (organizationData) {
      reArrageData();
      setTotalCount(organizationData?.totalCount);
    }
    if (error) {
      toast.error(error.message)
    }
  },[organizationData, currentPage]);
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
                <Col xs="auto">
                  <h3 className="mb-0">Devices</h3>
                </Col>
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
            <Row className="mt-4">
              Are you sure about deleting this device?
            </Row>
            <Button
              color="danger"
              onClick={async () => {
                try {
                  await deleteDeviceMutation.mutateAsync({
                    id: id,
                  });
                  toast.success('Device Deleted Succesfully!!!')
                  
                } catch (error) {
                  toast.error('Error deleting the device')
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
        </Modal>
      </Container>
    </>
  );
};

export default DeviceManagement;
