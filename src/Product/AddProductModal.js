import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import getToken from "../HttpService/LocalStorageService";
import { securePost } from "../HttpService/APIService";
import DragDropComponent from "../DragAndDrop/DragDropComponent";
import { useState } from "react";

export default function AddProductModal(props) {
  const { register, handleSubmit, reset } = useForm();
  const [dragFiles, setDragFiles] = useState([]);

  const formData = new FormData();
  // var images = [];
  console.log(dragFiles);

  const onSubmit = (data) => {
    console.log(data);

    for (let i = 0; i < dragFiles.length; i++) {
      formData.append("images", dragFiles[i]);
      console.log(dragFiles[i]);
    }

    // formData.append('images',)
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);

    console.log(getToken("activeToken"));

    securePost("/products", formData)
      .then((response) => {
        console.log(response);
        toast.success("product upload successfully");
        props.setAddProduct(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal show={props.addProduct} onExit={() => reset()}>
        <Modal.Header>
          <Modal.Title>+Add new Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body
            style={{ boxShadow: "5px 5px 10px black", borderRadius: "20px" }}
          >
            <div className="d-flex flex-column ">
              <label htmlFor="name">Enter Name</label>
              <input
                id="name"
                placeholder="Enter Product name"
                style={{ width: "50%" }}
                type="text"
                {...register("name")}
              />
              <label>Enter Desription</label>

              <textarea
                placeholder="Enter Product Desription"
                type="text"
                {...register("description")}
              ></textarea>

              <label>Price</label>
              <input
                placeholder="product price"
                type="number"
                {...register("price")}
              />

              <label>Select photos</label>
              {/* <input type='file'   multiple  required 
                    onChange={(event)=>{
                        images = event.target.files;
                    }}
                /> */}

              <DragDropComponent setDragFiles={setDragFiles} />

              <div>
                {dragFiles?.length > 0
                  ?
                   dragFiles.map((element, index) => {
                    return (
                      <div key={index}>
                        <p className="m-0">{index+1} - {element.path}</p>
                      </div>
                    )})
                  : "no files selected"}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer
            style={{ boxShadow: "5px 5px 10px black", borderRadius: "50px" }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                props.setAddProduct(false);
              }}
            >
              Close
            </Button>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
