import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {securePost} from "../HttpService/APIService";

export default function ChangeCustomerPassword({
  changePassword,
  setChangePassword,
}) {

    const {register,handleSubmit } =useForm();

    const  changePass = (data)=>{
        
        delete data.confirmPassword;

        console.log(data);

        securePost('/customers/auth/change-password',data)
        .then ((response)=>{console.log(response);})

    }

  return (
    <div>
      <Modal show={changePassword} onHide={() => setChangePassword(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(changePass)}>
          <Modal.Body>
            <div>
                <input placeholder="enter old password"  {...register('old_password')}/>
                <input placeholder="enter new password"  {...register('new_password')}/>
                <input placeholder="enter confirm password"  {...register('confirmPassword')}/>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setChangePassword(false)}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              change password
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
