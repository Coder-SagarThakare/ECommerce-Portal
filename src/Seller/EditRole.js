import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";  
import toast from "react-hot-toast";
import Select from "react-select";
import { patch } from "../HttpService/APIService";

export default function EditRole({ operationsState, setOperationsState,id }) {


  const [role,setRole] = useState("");

  const newRole = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];


  const onSubmit = ()=>{
    console.log("role : ",role)
    console.log('id : ',id);

    patch(`/users/role/${id}`,{role:role})              // here we need to pass object not string
    .then( (response)=>{ console.log(response);
        toast.success("Role updated sucesfully")

        setOperationsState((prevData)=>{
           return( {...prevData,editRole:false} )
        })
    })
  }

  return (
    <div>
      <Modal
        show={operationsState.editRole}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>

          <Modal.Title>Select Role</Modal.Title>

        </Modal.Header>

          <Modal.Body>
            <Select
              options={newRole}
              onChange={(newRole) => {
                setRole(newRole.value)
              }}
            />

          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setOperationsState((prevData) => {
                  return {
                    ...prevData,
                    editRole: false,
                  };
                });
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={onSubmit}>submit</Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
}
