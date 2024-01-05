import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Logo from "../assets/img/brand/argon-react.png";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useVerifyAdmin } from "utils/admin.api";
import { useCreateAdmin } from "utils/admin.api";
import { useAdminRegisteration } from "utils/auth.api";

const AdminInvite = () => {
  // const onSuccessCallback = () => {
  //   navigate("/admin/index");
  // };
  const verifyAdminMutation = useVerifyAdmin();
  const adminRegistrationMutation = useAdminRegisteration();
  const navigate = useNavigate();
  const [isQuery, setIsQuery] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //   console.log(verifyAdminMutation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const verifiedAdmin = await verifyAdminMutation.mutateAsync(formData);
      await adminRegistrationMutation.mutateAsync({
        admin_name: verifiedAdmin?.name,
        admin_email: verifiedAdmin?.email,
        password: formData?.password,
        organization: verifiedAdmin?.organization,
        role: "ADMIN",
      });
      toast.success("Admin verified successfully!!! Login to continue!");
      setFormData({
        ...formData,
        password: "",
      });
      navigate("/auth/login", {
        state: {
          admin_name: verifiedAdmin?.name,
          admin_email: verifiedAdmin?.email,
          password: formData?.password,
          organization: verifiedAdmin?.organization,
          role:'ADMIN'
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const otp = urlParams.get("otp");
    if (email || otp) {
      setIsQuery(true);
    }
    setFormData({
      ...formData,
      otp: otp || "",
      email: email || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="py-5  px-2 bg-danger"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="mt-5 pt-5">
        <div className="header-body text-center mb-5">
          <div className="d-flex justify-content-center">
            <Col lg="5" md="6">
              <img src={Logo} width="200px" alt="Lifti" />
              <p className="text-lead text-dark mt-2">
                Welcome to Plantino Motors Admin
              </p>
            </Col>
          </div>
        </div>
        <Row
          className="justify-content-center mt-5 bg-secondary py-5 px-3 w-fit-content mx-auto rounded"
          style={{ maxWidth: "500px", margin: "30px 0px" }}
        >
          <Col>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="otp">Otp</Label>
                <Input
                  type="text"
                  name="otp"
                  id="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  placeholder="Enter your otp"
                  disabled={isQuery}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  disabled={isQuery}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  required
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />
              </FormGroup>
              <Button color="primary">Submit</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminInvite;
