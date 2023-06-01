// import React from 'react'
// import { Toast } from "bootstrap";
import React from "react";
import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { patch } from "../HttpService/APIService";

export default function UpdateCompanyInfo({
  operationsState,
  setOperationsState,
  setData,
  data,
  dummy,
  setDummy
}) {
  // console.log("props : ", props);
  const { handleSubmit, register, reset } = useForm();

  const handleClose = () =>  setOperationsState((prev)=>{
    return {...prev,show:false}
  });
  // const handleShow = () => props.setShow(true);

  function onSubmit(data) {
    console.log(data);

    patch("/users/org", data)
      .then((res) => {
        // props.setShow(false);
        setOperationsState((prev)=>{
          return {...prev,show:false}
        })
        toast.success("sucess fully updated data");

        setDummy(!dummy); // myProfile render zal pahijel company name update kelyavr mhnun he dummy ghetlay
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message);
      });
  }
  const onExitFun = () => {
    reset(); // resets the all data of input field
  };

  return (
    <>
      <Modal show={operationsState.show} onHide={handleClose} onExit={onExitFun}>
        {" "}
        {/* // when modal closes then auto call goes to onExit function */}
        <Modal.Header closeButton>
          <Modal.Title>Update company Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="enter company name" />

            <input {...register("email")} placeholder="enter mail id" />

            <NavDropdown.Divider />

            <div className="d-flex justify-content-between">
              <Button variant="primary" type={"submit"}>
                Save Changes
              </Button>

              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
