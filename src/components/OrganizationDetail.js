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
import { useSuspendUser } from "utils/user.api";
import { useLocation, useNavigate } from "react-router-dom";

const OrganizationDetail = () => {
  const location = useLocation();
  const organizationName = location.state?.name;
  console.log(organizationName);
  const organizationData = [
    {
      name: "Type A",
      id: 1,
      userCount: 6,
    },
    {
      name: "Type B",
      id: 2,
      userCount: 7,
    },
    {
      name: "Type C",
      id: 3,
      userCount: 10,
    },
    // Add more objects as needed...
  ];
  const navigate = useNavigate();
  const suspenUserMutation = useSuspendUser();
  const columns = ["SR NO.", "id", "Device Type", "Supported Parameters", "Actions"];
  const [rows, setRows] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [treeModal, setTreeModal] = useState(false);
  const [userId, setUserId] = useState();
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const filterToggle = () => setFilterModal(!filterModal);
  const treeToggle = () => setTreeModal(!treeModal);

  const reArrageData = () => {
    let tempArr = [];

    organizationData.forEach((item, idx) => {
      tempArr?.push({
        idx: idx + 1,
        id: idx + 1,
        name: item?.name || "_",
        userCount: item?.userCount || "_",
        actions: (
          <>
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                deleteToggle();
                setUserId(item.id);
              }}
            >
               <i className="fas fa-user-times"></i>
            </Button>
            <Button size="sm" color="primary" onClick={treeToggle}>
              <i className="fa-solid fa-network-wired"></i>
            </Button>
          </>
        ),
      });
    });
    setRows(tempArr);
  };

  useEffect(() => {
    if (organizationData) {
      reArrageData();
    }
  });
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
                  <h3 className="mb-0">{organizationName} Details</h3>
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                  {/* <Label for="searchEntry" className="mr-2 mb-0">
                      Search
                    </Label>
                    <Input
                      id="searchEntry"
                      type="search"
                      onChange={(e) => {
                        // setSearchEntry(e.target.value);
                      }}
                    /> */}
                  <Button
                    className="px-1 px-md-3 py-2 text-sm"
                    color="danger"
                    onClick={filterToggle}
                  >
                    <i className="fa-solid fa-filter"></i> Filter by Device Type
                  </Button>
                </Col>
              </CardHeader>
              {false ? (
                <Spinner size="lg" className="my-5 mx-auto" />
              ) : (
                <CustomTable columns={columns} rows={rows} />
              )}
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        <Modal isOpen={deleteModal} toggle={deleteToggle}>
          <ModalHeader className="pb-0">Suspend Device</ModalHeader>
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
              Are you sure about suspending this Device?
            </Row>
            <Button
              color="danger"
              onClick={() => {
                deleteToggle();
                suspenUserMutation.mutateAsync({
                  userId: userId,
                  userStatus: 0,
                });
              }}
              className="w-100 mt-4"
            >
              Suspend
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
          <ModalHeader className="pb-0">Filter Users by Country</ModalHeader>
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
                  <option>Select Country</option>
                  <option>Country A</option>
                  <option>Country B</option>
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
          <ModalHeader className="pb-0">Update User's Tree Level</ModalHeader>
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
                  <option>Select Level</option>
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

export default OrganizationDetail;
