import React from "react";
import { Button, Modal } from "react-bootstrap";
import {useForm } from "react-hook-form";
import { patch } from "../HttpService/APIService";

export default function UpdateProduct(props) {
  const { register, handleSubmit, reset } = useForm();


 
  const onSubmit = (data) => {
    console.log(props);

    console.log(props.productId)
    patch(`/products/${props.productId}`,data)
    .then((response)=>{
      console.log(response);
      props.setUpdateProduct(false);
      props.setData(response.data)
    })
  };

  return (
    <div>
      <Modal show={props.updateProduct} centered onExit={()=>{reset()}}>
        <Modal.Header>
          <Modal.Title>Update Product details </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)} >
          <Modal.Body>
            <div className="d-flex flex-column w-50">
              <label> Product Name </label>
              <input
                type="text"
                placeholder="Enter product name"
                {...register("name")}
              />

              <label>Description</label>
              <input
                type="text"
                placeholder="Enter product name"
                {...register("description")}
              />

              <label>Price</label>
              <input
                type="number"
                placeholder="Enter updated price"
                {...register("price")}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => props.setUpdateProduct(false)}
            >
              close
            </Button>
            <Button variant="primary" type='submit'>Update Changes</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
