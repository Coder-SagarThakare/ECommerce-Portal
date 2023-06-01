import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { secureGet } from "../HttpService/APIService";
import {TbCurrencyRupee} from 'react-icons/tb'

export default function OrderDetails() {
  const navigateProps = useLocation().state;

  const [orderDetails, setOrderDetails] = useState();
  const [productList, setProductList] = useState([]);

  console.log(orderDetails);

  useEffect(() => {
    secureGet(`/orders/${navigateProps.orderId}`).then((response) => {
      setOrderDetails(response.data[0]);
      setProductList(response.data[0].items);
    });
  }, []);

  const allProductList =
    productList &&
    productList.map((elements, index) => {
      return <tr key={index}>
        <td>{index+1}</td>
        <td>{elements.name}</td>
        <td>{elements.productId}</td>
        <td>{elements.qty}</td>
        <td>{elements.price}</td>
        <td>{elements.subTotal}</td>

      </tr>;
    });

  return (
    <div className="w-75 mx-auto border p-4">
      <div className="p-3" style={{ background: "#e6e6e6" }}>
        <div className="d-flex justify-content-between">
          <span>
            seller-Id : <b>{orderDetails?.sellerId}</b>{" "}
          </span>
          <span>
            transaction No -<b>{orderDetails?.transactionNo}</b>{" "}
          </span>
        </div>
        <hr />

        <div className="d-flex justify-content-between">
          <div>
            <p className="m-0">
              <b>Billing address</b>
            </p>
            <p className="m-0">{orderDetails?.address?.street}</p>
            <p className="m-0">{orderDetails?.address?.addressLine2}</p>
            <p className="m-0">{orderDetails?.address?.city}</p>
            <p className="m-0">{orderDetails?.address?.state}</p>
            <p className="m-0">{orderDetails?.address?.pin}</p>
          </div>
          <p>
            delivery Fee : <b>{orderDetails?.deliveryFee}</b>{" "}
          </p>
          <p>
            Total : <b>{orderDetails?.total}</b>
          </p>
        </div>
      </div>

      <div className="border border-dark p-2">
        <Table striped bordered hover size="sm" >
          <thead>
            <tr>
              <th>#</th>
              <th>Product name</th>
              <th>productId</th>
              <th>qty</th>
              <th>price</th>
              <th>subTotal</th>

            </tr>
          </thead>
          <tbody>{allProductList}</tbody>

        </Table>
          <div className="d-flex justify-content-end align-items-center w-100 px-2">
            Total : <TbCurrencyRupee size={20}/> <b>{orderDetails?.total}</b>
          </div>
      </div>
    </div>
  );
}
