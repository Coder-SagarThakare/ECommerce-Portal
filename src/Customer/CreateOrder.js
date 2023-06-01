import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { securePost, secureGet } from "../HttpService/APIService";
import { makeCartEmpty } from "../Redux/Actions/action";

export default function CreateOrder() {
  const storeData = useSelector((state) => state);
  var [allAddresses, setAllAddresses] = useState([]);
  var [selectedAddress, setSelectedAddress] = useState();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("storeData : ", storeData);

  const buyProductsArr =
    storeData.buyProducts.items &&
    storeData.buyProducts.items.map((element, index) => {
      // console.log(element)
      return (
        <div className="border border-dark rounded" key={index}>
          <div className="d-flex ">
            <div
              className="p-1 d-flex justify-content-center align-items-center"
              style={{ height: "150px", width: "150px" }}
            >
              <img className="w-100 h-75" src={element.images[0].url} />
            </div>

            <div className="d-flex flex-column justify-content-between w-100 p-3">
              <div className="d-flex justify-content-between border border-top-0 border-end-0 border-start-0">
                <span>product :</span>
                <span> {element.name}</span>
              </div>

              <div className="d-flex justify-content-between border border-top-0 border-end-0 border-start-0">
                <span>price :</span>
                <span> {element.price}</span>
              </div>

              <div className="d-flex justify-content-between border border-top-0 border-end-0 border-start-0">
                <span>quantity :</span>
                <span> {element.qty}</span>
              </div>
              <div className="d-flex justify-content-between border border-top-0 border-end-0 border-start-0">
                <span>total :</span>
                <span> {element.subTotal}</span>
              </div>
            </div>
            {/* <p>{element.subTotal}</p> */}
          </div>
        </div>
      );
    });

  useEffect(() => {
    secureGet("/customers/address").then((response) => {
      // console.log(response)
      setAllAddresses(response.data);
    });
  }, []);

  // get all addresses from api
  allAddresses =
    allAddresses &&
    allAddresses.map((element, index) => {
      return (
        <div
          className=" d-flex gap-1 align-items-start"
          key={index}
          onClick={() => {
            setSelectedAddress(element);
          }}
        >
          <input type="radio" />

          <div style={{ background: "#e2e2e7" }}>
            <p className="m-1 ">
              street :<b>{element.street}</b>{" "}
            </p>
            <p className="m-1">
              addressLine2 :<b>{element.addressLine2}</b>{" "}
            </p>
            <p className="m-1">
              state :<b>{element.state}</b>{" "}
            </p>
            <p className="m-1">
              city :<b>{element.city}</b>{" "}
            </p>
            <p className="m-1">
              pin :<b>{element.pin}</b>{" "}
            </p>
          </div>
        </div>
      );
    });

  const address = (
    <div className="w-100 " style={{ background: "#c4c4c4" }}>
      <p className="m-1 ">
        street :<b>{selectedAddress?.street}</b>{" "}
      </p>
      <p className="m-1">
        addressLine2 :<b>{selectedAddress?.addressLine2}</b>{" "}
      </p>
      <p className="m-1">
        state :<b>{selectedAddress?.state}</b>{" "}
      </p>
      <p className="m-1">
        city :<b>{selectedAddress?.city}</b>{" "}
      </p>
      <p className="m-1">
        pin :<b>{selectedAddress?.pin}</b>{" "}
      </p>
    </div>
  );

  const onSubmit = () => {
    console.log(storeData);
    var data = {};
    // console.log(storeData.buyProducts.items );

    // data.items = [storeData.buyProducts.items];
    data.items = storeData.buyProducts.items;
    data.deliveryFee = storeData.buyProducts.deliveryFee;
    data.total = storeData.buyProducts.total;
    data.address = selectedAddress;
    console.log(data);

    securePost("/shop/orders", data).then((response) => {
      console.log(response);
      
      dispatch(makeCartEmpty());

      navigate("/confirmOrder", {
        state: { orderId: response.data.order._id },
      });
    });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center ">
      <p></p>

      <div
        className="border w-50 mt-3 overflow-scroll"
        style={{ height: "85vh" }}
      >
        <p>{}</p>
        {buyProductsArr}

        <p className="p-4">
          <b>Select address</b>
        </p>
        <div className="d-flex gap-5">
          {selectedAddress ? address : allAddresses}
        </div>

        <div className="d-flex justify-content-end gap-2 p-2 border w-100">
          <button
            onClick={() => {
              navigate("/cart");
            }}
            className="btn btn-secondary"
          >
            cancel
          </button>
          <button
            onClick={() => {
              onSubmit();
            }}
            className="btn btn-success"
          >
            buy
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between  w-50 px-2">
        <h6>total products : {storeData.buyProducts.items.length}</h6>
        <h6>
          Total price :<BiRupee size={20} /> {storeData.buyProducts.total}
        </h6>
      </div>
    </div>
  );
}
