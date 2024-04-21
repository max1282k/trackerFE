import { useState } from "react";
import { toast } from "react-toastify";
import { Button, FormGroup, Input, Col, Spinner, Label, Row } from "reactstrap";
import logo from "../../assets/img/brand/logo.png";
import { useEditEquipment } from "utils/equipment";

const ConfigureDevice = () => {
  const id = sessionStorage.getItem("deviceId");
  const [imei, setImei] = useState();
  const editEquipmentMutation = useEditEquipment();

  return (
    <Row
      className="align-items-center px-4 bg-danger"
      style={{ height: "99.99vh", overflow: "hidden", maxWidth: "100%" }}
    >
      <Col
        style={{ maxWidth: "500px" }}
        className="bg-white mx-auto py-5 rounded-lg shadow-md"
      >
        <img src={logo} alt="" width={"150px"} className="mx-auto d-block mb-3" />
        <FormGroup>
          <Label className="mb-2">Imei</Label>
          <Input
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            placeholder="Enter imei"
          />
        </FormGroup>
        <Button
          color="danger"
          className="w-100"
          disabled={editEquipmentMutation.isPending}
          onClick={async () => {
            console.log(imei);
            try {
                await editEquipmentMutation.mutateAsync({ formData: { imei: imei }, id: id });
                toast.success("IMEI added successfully");
                setTimeout(() => {
                    window.close();
                }, 3000);
            } catch (error) {
                toast.error(error.message);
            }
        }}
        
        >
          {editEquipmentMutation.isPending? <Spinner />:"Add" }
        </Button>
      </Col>
    </Row>
  );
};

export default ConfigureDevice;
