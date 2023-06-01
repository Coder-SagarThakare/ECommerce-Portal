import axios from "axios";
import React from "react";
import { Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import creditCardImg from "../components/images/creditCard.jpg";
import getToken from "../HttpService/LocalStorageService";

export default function CustomerConfirmOrder() {
  const location = useLocation();
  console.log("data passed throught navigate() : ", location.state);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    axios
      .put(
        `https://shop-api.ngminds.com/shop/orders/confirm/${location.state.orderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken("activeCustomerToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        navigate("/cart");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="d-flex justify-content-center w-100 ">
      {/* <h1>customer confirm order</h1> */}

      <div
        className="w-50 vh-100"
        // style={{backgroundImage:`url(${creditCardImg})`, WebkitFilter:'blur(1px)'}}
      >
        {/* <div
          className="w-50 "
          // style={{filter:'blur(10px)', zIndex:'-1',  position:'absolute'}}
          style={{
            zIndex: "-1",
            position: "absolute",
            filter: "blur(5px)",
            height: "50vh",
          }}
        >
          <img
            src={creditCardImg}
            className="w-100 h-100"
            // style={{objectFit:'cover'}}
          />
        </div> */}

        <div
          className="w-100 px-2 py-3 my-2 border border-primary rounded-3"
          style={{ height: "50vh" }}
        >
         
          <form
            className=" d-flex flex-column px-5 py-3 align-items-center gap-3 w-100 h-100 justify-content-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="border-1 border-top-0 border-start-0 border-end-0   w-100 bg-transparent  "
              placeholder="name on card"
              type="text"
              {...register("nameOnCard")}
            />
            <input
              className="border-1 border-top-0 border-start-0 border-end-0 rounded-1 w-100 bg-transparent"
              placeholder="card number"
              type="text"
              {...register("cardNumber")}
            />
            <div className="d-flex gap-2  w-100  justify-content-between">
              <input
                className="border-1 border-top-0 border-start-0 border-end-0 rounded-1 bg-transparent"
                placeholder="mm/yyyy"
                type="text"
                {...register("expiry")}
              />
              <input
                className="border-1 border-top-0 border-start-0 border-end-0 rounded-1 bg-transparent"
                placeholder="cvv"
                type="text"
                {...register("cvv")}
              />
            </div>
            <button className="border-0 rounded-1 px-4 py-1 bg-dark text-light" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
