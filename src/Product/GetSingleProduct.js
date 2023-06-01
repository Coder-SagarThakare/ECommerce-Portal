import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { secureGet } from "../HttpService/APIService";
import Carousel from "react-bootstrap/Carousel";
import UpdateProduct from "./UpdateProduct";
import UpdatePhotos from "./UpdatePhotos";

export default function GetSingleProduct() {
    const [searchParams,] = useSearchParams();
    const [imagesArr, setImageArr] = useState([]);
    const [data, setData] = useState();
    const [updateProduct, setUpdateProduct] = useState();
    const [updatePhotos, setUpdatePhotos] = useState();

  useEffect(() => {

    secureGet(`products/${searchParams.get("productId")}`).then((response) => {
      console.log("Response ", response);
      setImageArr(response.data.images);
      setData(response.data);
    });
  },[updatePhotos]);

  return (
    <div className="d-flex justify-content-center bg-secondary align-items-center"
    style={{ height: "100vh",width: "100%"}}

    >
      <div
        className="d-flex border border-danger   align-items-center bg-light"
        style={{  width: "50%", borderTopRightRadius:'50px',borderBottomLeftRadius:'50px', boxSizing: 'border-box', padding: '2%'  }}
      >
        <div
          className="{border border-info*  d-flex justify-content-center bg-light "
          style={{ height: "50%", width: "50%",borderBottomLeftRadius:'100px',overflow: 'hidden' }}
        >
          <Carousel>
            {imagesArr &&
              imagesArr.map((element, index) => {
                return (
                  <Carousel.Item key={index}>
                    <div
                        className=" d-flex justify-content-center"
                        // className="border border-danger "
                      style={{ height: '100%', width: "100%",  }}
                    >

                      <img  
                        className="border"
                        src={element.url}
                        // src = {ImagesArr[0].url}
                        alt="First slide"
                        style={{
                          width: "80%",
                          height: "80%",
                          objectFit: "cover",
                          padding:'10%'
                        }}
                      />
                    </div>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </div>

              <div className="bg-light" style={{ height:'60vh', width: '2px', border: '0.5px solid #4D4D4D', boxSizing: 'border-box', margin: '0px 10px'}}>

              </div>
        <div
          className="d-flex flex-column justify-content-between "
          style={{ height: "50%", width: "50%",}}
        >
          <div className="d-flex flex-column justify-content-between ">
            <h5> {data?.name}</h5>
            <p style={{fontSize:'12px'}}><b>Desription :</b> {data?.description}</p>
            <h5>$ {data?.price}</h5>
          </div>

          <div className="d-flex justify-content-evenly">
            <button
            className=""
            style={{border :'none', borderRadius:'4px',color : 'white', boxSizing: 'border-box',backgroundColor:'#000000' , padding: '2% 4%'}}
              onClick={() => {
                setUpdateProduct(true);
              }}
            >
              Update Product
            </button>

            <button
            className="border-1"
            style={{ borderRadius:'4px', color : 'black',backgroundColor:'#ffffff'}}

            onClick={ ()=>setUpdatePhotos(true) }
            
            >Update photos</button>
          </div>

        </div>

      </div>

    {/* {productId ?  */}
      <UpdateProduct
        setUpdateProduct={setUpdateProduct}
        updateProduct={updateProduct}
        productId = {searchParams.get("productId")}
        setData = {setData}
        />
    {/* //   /> : <h1>productId undefined</h1>} */}
    <UpdatePhotos 
      setUpdatePhotos = {setUpdatePhotos}
      updatePhotos = {updatePhotos}
      imagesArr = {imagesArr}
      productId = {searchParams.get("productId")}
    />
    </div>
  );
}
