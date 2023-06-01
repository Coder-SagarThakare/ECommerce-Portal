import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import getToken from "../HttpService/LocalStorageService";

export default function UpdatePhotos({
  updatePhotos,
  setUpdatePhotos,
  imagesArr,
  productId,
}) {
  const { handleSubmit } = useForm();
  var formData = new FormData();
  const [deletedImg, setDeletedImg] = useState([]);

  var newImageArr = [];

  const deletePrevImg = (images) => {
    console.log("images public id : ", images.public_id);
    setDeletedImg((prev)=>[...prev , images.public_id])
  };
  console.log('deleted img array ',deletedImg); 



  const printAllImg =
    imagesArr &&
    imagesArr.map((images, index) => {
      return (
        <div
          key={index}
          className="d-flex justify-content-start align-items-start"
        >
          <img className="border" src={images?.url} style={{ width: "100px" }} alt="..." />
          <button
            className="border-0 bg-danger "
            style={{
              padding:'0 4%',

              borderRadius: '100px'
            }}
            type="button"
            onClick={() => deletePrevImg(images)}
          >
            X
          </button>{" "}
          {/* delete button */}
        </div>
      );
    });

  const onSubmit = () => {
    console.log("clicked");

    for (let i = 0; i < newImageArr.length; i++)
      formData.append("new_images", newImageArr[i]);

    for(let i=0; i<deletedImg.length; i++)
      formData.append("delete",deletedImg[i])


    axios
      .patch(
        `https://shop-api.ngminds.com/products/images/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken("activeToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("photos updated");
        setUpdatePhotos(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* <img src={imagesArr[0]?.url}/> */}
      <Modal show={updatePhotos} centered>
        <Modal.Header>
          <Modal.Title>Update Photos</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>  
          <Modal.Body className="border border-primary">
            <p>previous photos</p>
            <div
              className="w-100 border border-danger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,33.333%)",
                overflow: "scroll", 
                height : '150px'
              }}
            >
              {/* <img className="" src={imagesArr[0]?.url} style={{width:'100px'}}/>  */}
              {printAllImg}
            </div>

            <p>Add new PHotos</p>
            <input
              type="file"
              multiple
              
              onChange={(event) => {
                newImageArr = event.target.files;
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setUpdatePhotos(false)}>
              close
            </Button>
            <Button variant="primary" type="submit">
               update changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
