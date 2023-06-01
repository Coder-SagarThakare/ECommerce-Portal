import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {securePost} from "../HttpService/APIService";

export default function UpdateCustomerProfilePhoto({
  setUpdatePhoto,
  updatePhoto,
}) {
  const { register, handleSubmit } = useForm();
  var images = [];
  const formData = new FormData();

  const onSubmit = (data) => {
    console.log(images);
    console.log("in data");

    formData.append("picture", images[0]);
    securePost("/customers/profile-picture", formData).then((response) => {
      console.log(response);

      setUpdatePhoto(false);
      toast.success("new profile photo uploaded successfully");
    });

  };

  const onExitCall = () => {
    setUpdatePhoto(false);
  };
  
  return (
    <div>
      <Modal
        show={updatePhoto}
        onExit={() => onExitCall}
        onHide={() => setUpdatePhoto(false)}
      >
        <Modal.Header closeButton style={{background:'#FAAB78'}}>
          <Modal.Title >Update profile photo </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div>
              <input
                type="file"
                onChange={(event) => {
                  images = event.target.files;
                }}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setUpdatePhoto(false)}>
              Close
            </Button>

            <Button
              variant="primary"
              type="submit"
              //   onClick={() => setUpdatePhoto(false)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
