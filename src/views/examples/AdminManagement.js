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
  Form,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import CustomTable from "components/CustomTable";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetAllAdmins } from "utils/auth.api";
import { useGetAllOrganizations } from "utils/organization.api";
import { useCreateAdmin } from "utils/admin.api";
import { useDeleteAdmin } from "utils/admin.api";
import { useDeleteAdminRegisteration } from "utils/auth.api";
import { useGetAdminsByOrganization } from "utils/auth.api";
import ReactPaginate from "react-paginate";

const AdminManagement = () => {
  const navigate = useNavigate();
  const createAdminMutation = useCreateAdmin();
  const deleteAdminMutation = useDeleteAdmin();
  const deleteAdminRegistrationMutation = useDeleteAdminRegisteration();
  const columns = ["id", "Name", "Email", "Organization", "Actions"];
  const [rows, setRows] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [filterOrg, setFilterOrg] = useState();
  const [filteredAdmins, setFilteredAdmins] = useState();
  const [addAdminFormData, setAddAdminFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "ADMIN",
  });
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const { isLoading, data, error } = useGetAllAdmins({
    limit: itemsPerPage,
    offset: currentPage * itemsPerPage,
  });
  const getAdminsByOrganizationMutation = useGetAdminsByOrganization({
    limit: itemsPerPage,
    offset: currentPage * itemsPerPage,
  });

  const { data: organizationData } = useGetAllOrganizations({
    limit: 1000,
    offset: 0,
  });
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const addToggle = () => setAddModal(!addModal);
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const filterToggle = () => setFilterModal(!filterModal);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddAdminFormData({ ...addAdminFormData, [name]: value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", addAdminFormData);
    try {
      createAdminMutation.mutateAsync(addAdminFormData);
      toast.success("Invitation Email Sent to Admin");
      addToggle();

      setAddAdminFormData({
        name: "",
        email: "",
        organization: "",
        role: "ADMIN",
      });
    } catch (error) {
      toast.error("Error Sending Email");
    }
  };

  const handleFilterSubmit = async () => {
    try {
      const admins = await getAdminsByOrganizationMutation.mutateAsync({
        organization: filterOrg,
      });
      setFilteredAdmins(admins);
      setFilterOrg("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const reArrageData = (e) => {
    let tempArr = [];

    e?.admins?.forEach((item, idx) => {
      if (item?.role === "ADMIN") {
        tempArr?.push({
          id: item.id,
          name: item?.admin_name,
          email: item?.admin_email,
          organization: item?.organization,
          actions: (
            <>
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  deleteToggle();
                  setUserEmail(item?.admin_email);
                }}
              >
                <i className="fas fa-user-times"></i>
              </Button>
            </>
          ),
        });
      }
    });
    setRows(tempArr);
  };

  useEffect(() => {
    if (data) {
      reArrageData(data);
      setTotalCount(data.totalCount);
    }

    if (filteredAdmins?.admins?.length > 0) {
      reArrageData(filteredAdmins);
      setTotalCount(filteredAdmins.totalCount);
    }

    if (error) {
      toast.error(error.message);
    }
  }, [data, filteredAdmins, currentPage]);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Button
              className="d-block ml-auto mb-2"
              color="secondary"
              onClick={() => {
                addToggle();
              }}
            >
              Add Admin
            </Button>

            <Card className="shadow">
              <CardHeader className="border-0 px-0 px-md-2 d-flex align-items-center">
                <Col xs="auto">
                  <h3 className="mb-0">Admins</h3>
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                  <Button
                    className="px-1 px-md-3 py-2 text-sm"
                    color="danger"
                    onClick={filterToggle}
                  >
                    <i className="fa-solid fa-filter"></i> Filter by
                    Organization
                  </Button>
                </Col>
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
        <Modal isOpen={addModal} toggle={addToggle}>
          <ModalHeader className="pb-0">Add Admin</ModalHeader>
          <ModalBody className="pb-0 d-flex flex-column justify-content-center align-items-center">
            <Form onSubmit={handleAddSubmit}>
              <Row className="mt-4 w-100">
                <FormGroup className="w-100">
                  <Label>Name</Label>
                  <Input
                    placeholder="Enter admin's name"
                    name="name"
                    required
                    value={addAdminFormData.name}
                    onChange={handleAddInputChange}
                  />
                </FormGroup>
                <FormGroup className="w-100">
                  <Label>Email</Label>
                  <Input
                    placeholder="Enter admin's email"
                    type="email"
                    name="email"
                    required
                    value={addAdminFormData.email}
                    onChange={handleAddInputChange}
                  />
                </FormGroup>
                <FormGroup className="w-100">
                  <Label>Organization</Label>
                  <Input
                    type="select"
                    className="p-2"
                    name="organization"
                    required
                    placeholder="Select Organization"
                    value={addAdminFormData.organization}
                    onChange={handleAddInputChange}
                  >
                    <option>Select Organization</option>
                    {organizationData?.results?.map((org, index) => (
                      <option key={index}>{org?.name}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Row>
              <Button color="danger" type="submit" className="w-100 mt-4">
                Add
              </Button>{" "}
              <Button
                color="secondary"
                onClick={addToggle}
                className="w-100 mt-4 mb-4"
              >
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={deleteModal} toggle={deleteToggle}>
          <ModalHeader className="pb-0">Delete Admin Profile</ModalHeader>
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
              Are you sure about deleting this Profile?
            </Row>
            <Button
              color="danger"
              onClick={async () => {
                try {
                  await deleteAdminMutation.mutateAsync({
                    email: userEmail,
                  });
                  await deleteAdminRegistrationMutation.mutateAsync({
                    email: userEmail,
                  });
                  toast.success("Profile deleted successfully!!!");
                } catch (error) {
                  toast.error("Error deleting admin!!!");
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
          <ModalHeader className="pb-0">
            Filter Admins by Organization
          </ModalHeader>
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
                <Input
                  type="select"
                  className="p-2"
                  onChange={(e) => setFilterOrg(e.target.value)}
                >
                  <option>Select Organization</option>
                  {organizationData?.results?.map((org, index) => (
                    <option key={index}>{org?.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Row>
            <Button
              color="danger"
              onClick={() => {
                handleFilterSubmit();
                filterToggle();
              }}
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
      </Container>
    </>
  );
};

export default AdminManagement;
