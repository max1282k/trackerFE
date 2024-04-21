import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Spinner,
  Label,
} from "reactstrap";
import { useAdminLogin } from "../../utils/auth.api";
import logo from "../../assets/img/brand/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    admin_email: "",
    password: "",
  });
  const loginMutation = useAdminLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.admin_email || !loginData.password) {
      return;
    }

    try {
      const admin = await loginMutation.mutateAsync(loginData);
      if (admin) {
        navigate("/admin/index");
        setLoginData({
          admin_email: "",
          password: "",
        });
        toast.success("Logged in successfully!!!");
      } else {
        toast.warn(
          "Please check with support, Either your account is suspended or deleted"
        );
        localStorage.clear();
      }
    } catch (e) {
      toast.error(e?.message);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <img
              width={"150px"}
              src={logo}
              className="mx-auto d-block mb-4"
              alt=""
            />
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="admin_email"
                    autoComplete="new-email"
                    value={loginData?.admin_email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={loginData?.password}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup check >
                <Label check style={{ cursor: "pointer" }}>
                  <Input type="checkbox" /> Remember me
                </Label>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="danger"
                  disabled={
                    loginMutation?.isLoading ||
                    !(loginData?.admin_email && loginData?.password)
                  }
                  // type="button"
                  // onClick={() => navigate("/admin/index")}
                >
                  {loginMutation?.isLoading ? (
                    <Spinner size={"sm"} />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
