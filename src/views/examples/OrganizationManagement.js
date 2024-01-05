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
import { useNavigate } from "react-router-dom";
import { useGetAllOrganizations } from "utils/organization.api";
import { useCreateOrganization } from "utils/organization.api";
import { useDeleteOrganization } from "utils/organization.api";
import ReactPaginate from "react-paginate";

const OrganizationManagement = () => {
  const createOrganizationMutation = useCreateOrganization();
  const navigate = useNavigate();
  const deleteOrganizationMutation = useDeleteOrganization();
  const columns = ["SR NO.", "id", "Name", "user count", "Actions"];
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const { isLoading, data: organizationData, error } = useGetAllOrganizations({limit: itemsPerPage,offset: (currentPage * itemsPerPage)});
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [id, setId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    usersCount: "", // Assuming this corresponds to the number of users
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const addToggle = () => setAddModal(!addModal);
  const deleteToggle = () => setDeleteModal(!deleteModal);

  const reArrageData = () => {
    let tempArr = [];

    organizationData?.results?.forEach((item, idx) => {
      tempArr?.push({
        idx: idx + 1,
        id: item._id,
        name: item?.name || "_",
        usersCount: item?.usersCount || "_",
        actions: (
          <>
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                setId(item._id);
                deleteToggle()
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </>
        ),
      });
    });
    setRows(tempArr);
  };

  console.log(currentPage ,organizationData)


  useEffect(() => {
    if (organizationData) {
      reArrageData();
      setTotalCount(organizationData?.totalCount);
    }
    if (error) {
      toast.error(error.message)
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
            <Button className="d-block ml-auto mb-2" color='secondary' onClick={addToggle}>
              Add Organization
            </Button>

            <Card className="shadow">
              <CardHeader className="border-0 px-0 px-md-2 d-flex align-items-center">
                <Col xs="auto">
                  <h3 className="mb-0">Organizations</h3>
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
        <Modal isOpen={addModal} toggle={addToggle}>
          <ModalHeader className="pb-0">Add Organization</ModalHeader>
          <ModalBody className="pb-0 d-flex flex-column justify-content-center align-items-center ">
            <Row className="mt-4 w-100">
              <FormGroup className="w-100">
                <Label>Name</Label>
                <Input
                  placeholder="Enter organization's name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup className="w-100">
                <Label>User Count</Label>
                <Input
                  placeholder="Enter number of organization's users"
                  type="text"
                  name="usersCount"
                  value={formData.usersCount}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Row>
            <Button
              color="danger"
              onClick={async () => {
                addToggle();
                try {
                  await createOrganizationMutation.mutateAsync(formData);
                  setFormData({ name: "", usersCount: "" });
                  toast.success('Organization added successfully!!!')
                } catch (error) {
                  toast.error(error.message)
                }               
              }}
              className="w-100 mt-4"
            >
              Add
            </Button>{" "}
            <Button
              color="secondary"
              onClick={addToggle}
              className="w-100 mt-4 mb-4"
            >
              Cancel
            </Button>
          </ModalBody>
        </Modal>
        <Modal isOpen={deleteModal} toggle={deleteToggle}>
          <ModalHeader className="pb-0">Delete Organization</ModalHeader>
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
              Are you sure about deletiing this organization?
            </Row>
            <Button
              color="danger"
              onClick={async () => {
                try {
                  await deleteOrganizationMutation.mutateAsync({
                    id: id,
                  });
                  deleteToggle();
                  toast.success('Organization Deleted Successfully!!!')
                  
                } catch (error) {
                  toast.error('Error deleting the organization')
                }
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
      </Container>
    </>
  );
};

export default OrganizationManagement;
