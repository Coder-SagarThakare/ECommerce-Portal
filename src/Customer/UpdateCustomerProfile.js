import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { patch } from "../HttpService/APIService";

export default function UpdateCustomerProfile({
  setUpdateProfile,
  updateProfile,
  userName,userMail
}) {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    patch("/customers/update-profile", data).then((response) => {
      console.log(response);
      toast.success("profile uploaded succesfully");
      setUpdateProfile(false);
    });
  };

  return (
    <div>
      <Modal show={true} onHide={() => setUpdateProfile(false)}>
        <Modal.Header closeButton style={{background:'#FAAB78'}}>
          <Modal.Title>Update profile info</Modal.Title>
        </Modal.Header>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div>
              <input placeholder="enter name" {...register("name")} />
              <input placeholder="enter email" {...register("email")} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setUpdateProfile(false);
              }}
            >
              Close
            </Button>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form> */}

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter name</Form.Label>
              <Form.Control
                defaultValue={userName}

                type="text"
                placeholder="enter name"
                {...register("name")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                defaultValue={userMail}
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setUpdateProfile(false);
                }}
              >
                Close
              </Button>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
