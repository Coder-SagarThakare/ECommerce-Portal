import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { patch } from "../HttpService/APIService";

export default function UpdateUserInfo({
  operationsState,
  setOperationsState,
  id
}) {
  const { register,handleSubmit ,reset} = useForm();

  const onSubmit = (data)=>{
    console.log(data)

    if(data.password !== data.confirmPassword){
        toast.error ("enter same password")
    } else {

        delete data.confirmPassword;

        patch(`/users/${id}`,data)
        .then((response )=>{
            toast.success("wohoooo!!! \nData changed succesfully")

        setOperationsState((prevData)=>{
            return ({
                ...prevData,
                updateUserInfo : false
            })
        })
        })
        
        
    }
  }

  return (
    <div>
      <Modal
        show={operationsState.updateUserInfo}
        backdrop="static"
        keyboard={false}
        onExit={()=>reset()}
      >
        <Modal.Header>
          <Modal.Title> Update User Info</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Modal.Body>
            <input {...register ("name")} placeholder="enter name "  defaultValue='SAGAR'/>  <br />  <br />
            <input {...register ("email")} placeholder="enter mail " />  <br />  <br />
            <input {...register ("password")}  placeholder="enter password " type='password'/>  <br />  <br />
            <input {...register ("confirmPassword")} placeholder="enter confirm password " type='password'/>  <br />  <br />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setOperationsState((prevData) => {
                  return {
                    ...prevData,
                    updateUserInfo: false,
                  };
                });
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">submit</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
