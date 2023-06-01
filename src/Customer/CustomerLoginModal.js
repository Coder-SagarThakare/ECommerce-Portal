import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {securePost} from "../HttpService/APIService";
import { setToken } from "../HttpService/LocalStorageService";

export default function CustomerLoginModal({
  showLoginModal,
  setShowLoginModal,
}) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    securePost("/shop/auth/login", data).then((response) => {
      console.log(response.data);
      setToken("activeCustomerToken", response.data.token);
      toast.success("user logged in succesfully");
      setShowLoginModal(false)
    //   navigate(`/`)

    //   setLoggedInUser(response.data)


    });
  };

  return (
    <div>
      <Modal
        show={showLoginModal}
        onHide={() => {
          setShowLoginModal(false);
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}> 
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" {...register("password")}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
