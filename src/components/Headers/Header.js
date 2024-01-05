import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useGetAllUsers } from "utils/auth.api";
import { useGetLogedInUser } from "utils/auth.api";
import { useGetStats } from "utils/stats.api";

const Header = () => {
  const {data: user} = useGetLogedInUser()
  const { data } = useGetStats();
  const {data: users} = useGetAllUsers({limit:1000, offset:0})

  return (
    <>
      <div className="header bg-danger pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {user?.role === "SUPER_ADMIN" && (
                <Col lg="6" xl="3" className="py-2">
                  <Card className="card-stats mb-4 mb-xl-0 h-100">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Organizations
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{data?.totalStats?.totalOrganizations}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="ni ni-money-coins" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              )}
              <Col lg="6" xl="3" className="py-2">
                <Card className="card-stats mb-4 mb-xl-0 h-100">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Devices
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data?.totalStats?.totalDevices}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-tablet-button" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              {user?.role!=='USER' && <Col lg="6" xl="3" className="py-2">
                <Card className="card-stats mb-4 mb-xl-0 h-100">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{users?.users?.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
