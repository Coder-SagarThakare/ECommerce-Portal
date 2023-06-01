import React from "react";
import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {securePost} from "../HttpService/APIService";

export default function CreateUser({operationsState,setOperationsState}) {

  const { register, handleSubmit,reset } = useForm();

  const onSubmit = (data) => {
    delete data.confirmPassword ;

    securePost ('/users',data)
    .then( (response)=>{
        console.log("response : ",response);
        toast.success("\tYippe...!!! \nUser added Succesfully ...")
        // props.setCreateUser(false); 
        setOperationsState ((prevData)=>{
            return (
               {...prevData,
                createUser : false
            })
        })
    })
  };

  return (
    <div>
      <Modal show={operationsState.createUser} animation={true} onExit={()=> {reset()}} centered>
        <Modal.Header >
          <Modal.Title>+ Create New User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="enter name" />
            <br /> <br />
            <input {...register("email")} placeholder="enter email-id" />
            <br /> <br />
            <input {...register("role")} placeholder="enter role" />
            <br /> <br />
            <input  {...register("password")} placeholder="Enter Password" type={"password"}/>
            <br /> <br />
            <input
              {...register("confirmPassword")}
              placeholder="Enter Confirm Password"
              type={"password"}
            />

            <NavDropdown.Divider />

            <Modal.Footer >
              <Button variant="secondary" onClick={() => {   setOperationsState((prevData)=>{ return({...prevData,createUser:false})}) }} > Close </Button>
              <Button variant="primary" type="submit" >Save Changes</Button>
            </Modal.Footer>
          </form>

        </Modal.Body>
      </Modal>
    </div>
  );
}
