import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion, Button, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { secureGet } from "../HttpService/APIService";
import { TbCurrencyRupee } from "react-icons/tb";
import { patch } from "../HttpService/APIService";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const [paginationObj, setPaginationObj] = useState({
    limit: 5,
    pageNo: 1,
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (
      paginationObj?.limit > 0 &&
      paginationObj?.limit !== "" &&
      paginationObj?.pageNo <= totalPages &&
      paginationObj?.pageNo !== ""
    ) {
      secureGet(
        `/orders?page=${paginationObj.pageNo}&limit=${paginationObj.limit}`
      ).then((response) => {
        //   console.log(response);
        console.log(response);
        setOrders(response.data.results);
        setTotalPages(response.data.totalPages);

        //   setProductList(response.data.results.items)
      });
    }

    console.log(productList);
  }, [paginationObj]);

  const customerProductList =
    productList &&
    productList.map((element, index) => {
      return (
        <tr key={index}>
          <td className="m-1 border">{index + 1}</td>
          <td>{element.name}</td>
          {/* <td className="border">{element.qty}</td>
          <td className="border">{element.price}</td>
          <td className="border">{element.subTotal}</td> */}
        </tr>
      );
    });

  function cancelOrder(productId) {
    patch(`/orders/cancel/${productId}`).then((response) => {
      console.log(response);
    });
  }

  function dispatchOrder(productId) {
    patch(`/orders/dispatch/${productId}`).then((response) => {
      console.log(response);
    });
  }

  function deliverOrder() {
    patch(`/orders/deliver/${productId}`).then((response) => {
      console.log(response);
    });
  }

  const ordersList =
    orders &&
    orders.map((element, index) => {
      return (
        <div key={index} className="w-75 mx-auto">
          <Accordion.Item eventKey={index}>
            <Accordion.Header onClick={() => setProductList(element.items)}>
              <div className="d-flex justify-content-between w-100 gap-2 px-2">
                <div>
                  <span>
                    <b>
                      {index + 1} {".  "}
                    </b>
                  </span>
                  <span>order id :{element._id}</span>
                </div>
                <span>
                  order status :{" "}
                  {element.paymentStatus === "Refunded"
                    ? "Refunded"
                    : element.status}
                </span>
              </div>
            </Accordion.Header>

            <Accordion.Body>
              <div
                className="d-flex p-2 w-100 border border-dark justify-content-between"
                style={{ background: "#f2f2f2" }}
              >
                <div className="w-75">
                  <div className="d-flex justify-content-between">
                    <p>
                      Transaction No :- <b>{element.transactionNo}</b>
                    </p>
                    <p>
                      Seller Id :- <b>{element.sellerId}</b>
                    </p>
                  </div>

                  <div className=" p-2 w-100 border ">
                    <h6>products</h6>

                    <Table striped="columns">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                        </tr>
                      </thead>
                      <tbody>{customerProductList}</tbody>
                    </Table>
                    <div className="d-flex justify-content-end align-items-center">
                      price :<TbCurrencyRupee size={20} />{" "}
                      <b>{element.total}</b>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2  justify-content-end">
                  {/* {element.status !=== "Cancelled" ?   */}
                  {element.status === "Cancelled" ? (
                    ""
                  ) : element.status === "Confirmed" ? (
                    <Button
                      className="btn btn-sm "
                      variant="outline-success"
                      onClick={() => {
                        dispatchOrder(element._id);
                      }}
                    >
                      Dispatch{" "}
                    </Button>
                  ) : element.status === "Delivered" ? (
                    ""
                  ) : (
                    <Button className="btn btn-sm" variant="outline-success">
                      Deliver{" "}
                    </Button>
                  )}

                  <Button
                    className="btn btn-sm "
                    variant="outline-info"
                    onClick={() => {
                      navigate("/seller/product/orderDetails", {
                        state: {
                          orderId: element._id,
                        },
                      });
                    }}
                  >
                    Details{" "}
                  </Button>

                  {element.status !== "Cancelled" ? (
                    <Button
                      className="btn btn-sm w-100"
                      variant="outline-warning"
                      onClick={() => {
                        cancelOrder(element._id);
                      }}
                    >
                      Cancel Order
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </div>
      );
    });
  return (
    <div className="vh-100" style={{ background: "#dedede" }}>
      <Navbar />

      {/* Accordian */}
      {/* ================= search sort by, limit, page no*/}
      <div
        className="w-100 d-flex justify-content-between p-2 align-items-center"
        style={{ background: "#dedede" }}
      >
        <div>
          <p>
            page <b>{paginationObj?.pageNo}</b> out of <b>{totalPages}</b>
          </p>
        </div>

        <div className="d-flex justify-content-end align-items-center w-25">
          {/*==== limit of products */}
          <div>
            <span> limit </span>
            <input
              className="bg-transparent"
              style={{ width: "20%" }}
              placeholder="limit"
              type="number"
              defaultValue={paginationObj.limit}
              onChange={(event) => {
                setPaginationObj((prev) => {
                  return {
                    ...prev,
                    limit: event.target.value,
                  };
                });
              }}
            />
          </div>

          {/*  page no */}
          <div className="">
            <div className="d-flex justify-content-start " >
              <span className=" ">page no </span>
            </div>
          <input
            className="bg-transparent w-50 "
            // style={{ width: "20%" }}
            placeholder="enter page no"
            defaultValue={paginationObj.pageNo}
            onChange={(event) => {
              setPaginationObj((prev) => {
                return { ...prev, pageNo: event.target.value };
              });
              console.log(event.log.value);
            }}
          />
          </div>

        </div>
      </div>

      <Accordion>{ordersList}</Accordion>

      {/* pagination  */}
      <div className=" pt-3 d-flex justify-content-center">
        <Pagination className="">
          {paginationObj.pageNo === 1 ? (
            ""
          ) : (
            <Pagination.Prev
              onClick={() => {
                setPaginationObj((prev) => {
                  return { ...prev, pageNo: Number(paginationObj.pageNo) - 1 };
                });
              }}
            />
          )}
          <Pagination.Item active>{paginationObj?.pageNo}</Pagination.Item>

          {paginationObj.pageNo === totalPages ? (
            ""
          ) : (
            <Pagination.Next
              onClick={() => {
                setPaginationObj((prev) => {
                  return { ...prev, pageNo: Number(paginationObj.pageNo) + 1 };
                });
              }}
            />
          )}
        </Pagination>
      </div>
    </div>
  );
}
