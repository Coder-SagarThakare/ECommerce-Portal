import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  buyProducts,
  decNumber,
  deleteFromCart,
  incNumber,
  makeCartEmpty,
} from "../Redux/Actions/action";
import { BiRupee } from "react-icons/bi";
import { secureGet } from "../HttpService/APIService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import getToken from "../HttpService/LocalStorageService";
import Swal from "sweetalert2";
import CustomerLoginModal from "./CustomerLoginModal";

export default function CustomerCart() {
  // const cartArr = useSelector((state) =>{ console.log(state);});
  const cartArr = useSelector((state) => state.dataAddedToCart);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var total_Amount = 0;

  const createPayload = (products = cartArr) => {
    let payload = {};
    let amount = 0;

    payload.items = products.map((item) => {
      amount += item.totalPrice;

      return {
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
        subTotal: item.totalPrice,
        images: item.images,
      };
    });

    payload.deliveryFee = 0;
    payload.total = amount;

    dispatch(buyProducts(payload));
    navigate("/order");
  };

  const currentCartData =
    cartArr &&
    cartArr.map((element, index) => {
      {
        total_Amount += element.totalPrice;
      }
      {
        console.log(element);
      }
      return (
        <div className="d-flex rounded-1 my-2 bg-light" key={index}>
          <div
            className="d-flex justify-content-between w-100 p-2  rounded-3"
            style={{ boxShadow: "5px 5px 5px #929292" }}
          >
            {/* {console.log(element)} */}

            <div className="d-flex w-100">
              {/* cart images  */}
              <div
                className=" d-flex justify-content-center w-50"
                style={{ width: "250px", height: "250px" }}
              >
                <Carousel className=" h-100 w-100 d-flex justify-content-center align-items-center overflow-hidden">
                  {element.images.map((items, i) => {
                    return (
                      <Carousel.Item key={i} className="">
                        <img className=" h-75 w-75 " src={items.url} alt="" />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>

              {/* cart description */}
              <div className="p-2 d-flex flex-column justify-content-between w-100  border">
                <h5>
                  <u>{element.name}</u>
                </h5>
                <p style={{ lineClamp:'1'}}>
                  <b>Description : </b>
                  {element.description}
                </p>

                <div className="d-flex w-100  align-items-center justify-content-start gap-2">
                  {/* add quantity butoons */}
                  <Button
                    className="btn btn-sm"
                    onClick={() => {
                      dispatch(decNumber(element._id));
                    }}
                  >
                    -
                  </Button>
                  <p className="m-0">{element.quantity} </p>

                  {/* decrease quantity butoons */}
                  <Button
                    className="btn btn-sm"
                    onClick={() => dispatch(incNumber(element))}
                  >
                    {"  "}+{"  "}
                  </Button>

                  {/* delete  from cartbutton */}
                  <Button
                    className="btn btn-sm"
                    variant="outline-danger"
                    onClick={() => dispatch(deleteFromCart(element._id))}
                  >
                    delete from cart
                  </Button>
                </div>
              </div>
            </div>
            {/* cart product price */}
            <div className="p-2 d-flex flex-column justify-content-between">
              <p>
                <b>
                  <u>
                    <BiRupee size={20} />
                    {element.price}.00
                  </u>
                </b>
              </p>
              <div>
                <p className="m-0">total : </p>
                <p className="m-0 ">
                  <b className="d-flex">
                    <BiRupee size={20} />
                    {element.totalPrice}.00
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });

  function isCustomerLogin() {
    if (getToken("activeCustomerToken")) {
      createPayload();
    } else {
      Swal.fire({
        title: "You need to login first !!! ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        denyButtonText: `Don't save `,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setShowLoginModal(true);
        } else {
        }
      });
    }
  }

  return (
    <div>
      {/* shopping cart/ order history div */}
      <div className="d-flex justify-content-between bg-secondary mt-3 px-3 align-items-center">
        <h3>Shopping Cart</h3>
        {getToken("activeCustomerToken") ? (
          <h6
            className=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              // isCustomerLogin();
              navigate("/orderHistory");
            }}
          >
            <u>order history</u>
          </h6>
        ) : (
          ""
        )}
      </div>

      {/* customer cart */}
      {cartArr.length === 0 ? (
        <div >
          <h2 className="text-center p-3">cart is empty now</h2>{" "}
        </div>
      ) : (
        <div className="border border-primary">
          <div className="d-flex justify-content-center py-3">
            {cartArr.length === 0 ? <h3>Cart is Empty</h3> : ""}
          </div>

          <div className="d-flex ">
            {/* current card data  */}
            <div
              className="w-75 d-flex flex-column gap-3  px-5 pt-3 "
              style={{
                overflow: "scroll",
                height: "80vh",
                background: "#e0e0e0",
              }}
            >
              {currentCartData}
            </div>

            {/* price details */}

            <div
              className="w-25 h-25 border py-4 px-3 border border-dark mx-2"
              style={{ background: "#fff053" }}
            >
              <marquee>
                <span>
                  <b className="text-primary">
                    <u>* NEW YEAR OFFER *</u>
                  </b>
                </span>
              </marquee>
              <p>
                <u>price details</u>
              </p>
              {/* {cartArr} */}
              <p>
                <b>Total products : {cartArr.length}</b>{" "}
              </p>
              <p>
                Amount : <BiRupee size={20} />
                {total_Amount}.00
              </p>
              <p>
                Discount :{" "}
                <span className="text-success">
                  <b>
                    <u>
                      <BiRupee size={20} />
                      {(total_Amount * 10) / 100}
                    </u>{" "}
                  </b>
                </span>
              </p>
              <p>
                shipping charges : <b>free</b>
              </p>
              <p>
                <b>
                  Total amount :<BiRupee size={20} />
                  {total_Amount - (total_Amount * 10) / 100}
                </b>{" "}
              </p>

              <div className="d-flex gap-1 flex-column align-items-center justify-content-center">
                <div className="bg-dark">
                  <span className="text-light border-2 px-2">
                    get 10% discount on your order
                  </span>
                </div>
                <Button
                  variant="success"
                  onClick={() => {
                    // isCustomerLogin() ? createPayload() : navigate('/order');

                    isCustomerLogin();
                  }}
                >
                  Buy Now
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoginModal ? (
        <CustomerLoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />
      ) : (
        ""
      )}
    </div>
  );
}
