import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { secureGet } from "../HttpService/APIService";

export default function OrderDetailsModal({
  orderId,
  setShowOrderDetails,
  showOrderDetails,
}) {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    secureGet(`/shop/orders/${orderId}`).then((response) => {
      console.log(response);
      setOrderData(response.data);
    });
  }, []);

  console.log(orderData);

  const productDetails =
    orderData?.items &&
    orderData?.items.map((element, index) => {
      return (
        <div key={index} className="border px-2">
          <p>
            {index + 1} . {element?.name}
          </p>
          <div className="d-flex justify-content-between px-3">
            <p>price : {element?.price}</p>
            <p>qty : {element?.qty}</p>
            <p>
              <b>subTotal : {element?.subTotal}</b>
            </p>
          </div>
        </div>
      );
    });

  return (
    <div>
      <Modal
        className=""
        show={showOrderDetails}
        onHide={() => setShowOrderDetails(false)}
        size="lg"
      >
        <Modal.Header closeButton style={{backgroundColor:'#F7A76C'}}>
          <Modal.Title>Order Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-10 mx-auto">
            {/* header section of order detail */}
            <div
              className="border d-flex justify-content-between p-2 rounded-2 "
              style={{ backgroundColor: "#F3E0B5" }}
            >
              <p className="m-0"> delivery fee : <b>{orderData?.deliveryFee}</b></p>
              <p className="m-0">payment Status : {orderData?.paymentStatus}</p>
              <p className="m-0">total price : <b>{orderData?.total}</b></p>
            </div>

            <div className="overflow-scroll " style={{ height: "40vh",scrollbarWidth:'0px', backgroundColor:'#FFF7E9' }}>
              {productDetails}
            </div>
            <div>
              <div className="border">
                <b>
                  <u>Address </u>{" "}
                </b>
                <div className=" border border-start-0 border-end-0 border-bottom-0">
                  <p className="m-0 p-2">
                    street : {orderData?.address?.street}
                  </p>
                </div>
                <div className=" border border-start-0 border-end-0 border-bottom-0">
                  <p className="m-0 p-2">
                    addressLine2 : {orderData?.address?.addressLine2}
                  </p>
                </div>

                <div className="d-flex justify-content-between border border-start-0 border-end-0 border-bottom-0">
                  <p className="m-0 p-2  border border-start-0 border-top-0 border-bottom-0 d-flex justify-content-start" style={{width:'33%'}}>
                    city : {orderData?.address?.city}
                  </p>
                  <p className="m-0 p-2 border border-start-0 border-top-0 border-bottom-0 d-flex justify-content-start align-items-start" style={{width:'33%'}}>
                    state : {orderData?.address?.state}
                  </p>
                  <p className="m-0 p-2 border border-start-0 border-top-0 border-bottom-0" style={{width:'33%'}}>pin : {orderData?.address?.pin}</p>
                </div>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowOrderDetails(false)}
          >
            Close
          </Button>
          {/* <Button variant="primary" onClick={()=>setShowOrderDetails(false)}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
