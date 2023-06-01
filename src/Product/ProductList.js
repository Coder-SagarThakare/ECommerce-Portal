import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import getToken from "../HttpService/LocalStorageService";
import AddProductModal from "./AddProductModal";
import { secureDelete } from "../HttpService/APIService";
import logo from "../components/images/onlineShopLogo.png";
import bgImg from "../components/images/bgImgForList.svg";

var totalPages = [];

export default function ProductList() {
  const [addProduct, setAddProduct] = useState(false);
  var [currentProductList, setCurrentProductList] = useState();

  const [prodPaginationObj, setProdPaginationObj] = useState({
    sortBy: " ",
    limit: 10,
    pageNo: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get(
        `https://shop-api.ngminds.com/products?sortBy=${prodPaginationObj.sortBy}&limit=${prodPaginationObj.limit}&page=${prodPaginationObj.pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${getToken("activeToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);

        setCurrentProductList(response.data.results);

        totalPages = Array(response.data?.totalPages)
          .fill()
          .map((_, index) => index + 1);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [prodPaginationObj]);

  var productList =
    currentProductList &&
    currentProductList.map((element, index) => {
      return (
        <div
          className=" d-flex flex-column  justify-content-between bg-light rounded-3 "
          style={{padding:'4% 4%', paddingBottom:'4%'}}
          key={index}
        >
          <h6
            className="text-truncate"
            style={{ textOverflow: "ellipsis", width: "100%", }}
          >
            {currentProductList[index].name}
          </h6>

          <div className="d-flex flex-column justify-content-center align-items-center  " style={{height:'50%'}}>
            <img
              src={currentProductList[index]?.images[0]?.url}
              alt="img problem"
              // height="auto"
              // width="200px"

                  // height="50%"
                width="50%"
            ></img>
            </div>

          <h6>${currentProductList[index].price}</h6>

          <p
            className="text-truncate"
            style={{ textOverflow: "ellipsis", width: "100%" }}
            >
            {" "}
            {currentProductList[index]?.description}
          </p>

          <div className="d-flex justify-content-evenly ">
            <button
              className=" border-0"
              style={{ color: "white", borderRadius: "4px", padding: "1% 6%",backgroundColor:'#000000' }}
              onClick={() =>
                navigate(
                  `/seller/product/getProduct?productId=${currentProductList[index]._id}`
                )
              }
            >
              details
            </button>

            <button
              className=" border-1"
              style={{ color: "black", borderRadius: "4px", padding: "1% 6%",backgroundColor:'#ffffff' }}
              onClick={() => {
                secureDelete(`/products/`, element._id).then((response) => {
                  axios
                    .get(
                      `https://shop-api.ngminds.com/products?sortBy=${prodPaginationObj.sortBy}&limit=${prodPaginationObj.limit}`,
                      {
                        headers: {
                          Authorization: `Bearer ${getToken("activeToken")}`,
                        },
                      }
                    )
                    .then((response) => {
                      console.log(response);

                      setCurrentProductList(response.data.results);
                      console.log(response);
                    });
                });
              }}
            >
              delete
            </button>
          </div>

        </div>
      );
    });


  var paginationButtons =
    totalPages &&
    totalPages.map((element, index) => {
      return (
        <button
          onClick={() => {
            setProdPaginationObj((prev) => {
              return {
                ...prev,
                pageNo: element,
              };
            });
          }}
          key={index}
          className={
            prodPaginationObj.pageNo === element
              ? "bg-primary border"
              : "border"
          }
        >
          {element}
        </button>
      );
    });


  return (
    <div>
      {/* ===============  ================================ Navbar container */}
      <Container className="">
        <Navbar
          expand="lg"
          variant="light"
          bg=""
          className="border bg-secondary rounded-3"
        >
          <Container>
            {/* <Navbar.Brand href="#"></Navbar.Brand> */}
            <img src={logo} style={{ width: "50px" }}></img>
            <div>
              <button
                className="transparent"
                style={{ border: "none", borderRadius: "10px" }}
                onClick={() => {
                  setAddProduct((prevData) => {
                    return {
                      ...prevData,
                      addProduct: true,
                    };
                  });
                }}
              >
                Add Product
              </button>
            </div>
          </Container>
        </Navbar>
      </Container>




      {/* =================================================    sort by , limit , page no */}
      <div className="border d-flex align-items-center justify-content-end">
        <div>
          <p style={{margin:'0'}}>SortBy : </p>

          <select
            onChange={(e) => {
              setProdPaginationObj((prev) => {
                return { ...prev, sortBy: e.target.value };
              });
            }}
          >
            <option value=' ' >default</option>
            <option value="name"> Name</option>
            <option value="price"> Price</option>
          </select>
        </div>

        <div>
          <p style={{margin:'0'}}>Enter limit</p>
          <input
            placeholder="Enter limit"
            type="number"
            defaultValue={prodPaginationObj.limit}
            onChange={(e) => {
              setProdPaginationObj((prev) => {
                return { ...prev, limit: e.target.value };
              });
            }}
          />
        </div>

        <div>
          <p style={{margin:'0'}}>Enter Page no</p>

          <input
            placeholder="page number"
            type="number"
            // defaultValue={prodPaginationObj.pageNo}
            value={prodPaginationObj.pageNo}
            onChange={(e) =>
              setProdPaginationObj((prev) => {
                return { ...prev, pageNo: Number(e.target.value) };
              })
            }
          />
        </div>
      </div>

      <AddProductModal addProduct={addProduct} setAddProduct={setAddProduct} />

      {/*==================================================  list of Products */}
      <div
        className="d-flex border border-danger justify-content-evenly "
        style={{
          height: "100vh",
          overflow: "scroll",
          backgroundColor: "#888888",
          backgroundImage: `url(${bgImg})`,
          // opacity:'1.5'
        }}
      >
        <div
          className="productList-div "
          style={{
            width: "75%",
            display: "grid",
            // gridTemplateRows: "repeat (4,100px)",
            gridTemplateColumns: "repeat(3 , 30%)",
            // columnCount:'3',
            gridGap: "5%",
            boxSizing: "border-box",
            margin: '2%'
          }}
        >
          {productList}
        </div>
      </div>

      {/* ================================================== pagination all buttons footer */}
      <div className="d-flex justify-content-center">
        <p>
          {" "}
          <u>
            page no {prodPaginationObj.pageNo} out of {totalPages.length}
          </u>
        </p>
      </div>

      <div className="d-flex justify-content-center w-100 align-items-center gap-5 mt-3">
        {prodPaginationObj.pageNo !== 1 ? (
          <button
            onClick={() => {
              setProdPaginationObj((prev) => {
                return {
                  ...prev,
                  pageNo: --prodPaginationObj.pageNo,
                };
              });
              console.log("prev button clicked");
              console.log(prodPaginationObj.pageNo);
            }}
          >
            prev
          </button>
        ) : (
          ""
        )}
        {paginationButtons} {/* all pegination buttons will display here */}
        {prodPaginationObj.pageNo === totalPages.length ? (
          ""
        ) : (
          <button
            onClick={() => {
              setProdPaginationObj((prev) => {
                return {
                  ...prev,
                  pageNo: ++prodPaginationObj.pageNo,
                };
              });
              console.log("next");
              console.log(prodPaginationObj.pageNo);
            }}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
}
